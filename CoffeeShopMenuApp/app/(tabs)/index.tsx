import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// ─── Coffee Menu Data ────────────────────────────────────────────────────────
const menuItems = [
  {id: '1', category: 'Coffee', name: 'Mocha', price: 'Php 100.00', desc: 'Espresso with steamed milk and sweet chocolate.'},
  {id: '2', category: 'Coffee', name: 'Cappuccino', price: 'Php 100.00', desc: 'Equal parts espresso, steamed milk and thick layer of foam.'},
  {id: '3', category: 'Coffee', name: 'Affogato', price: 'Php 110.00', desc: 'Espresso with vanilla ice cream.'},
  {id: '4', category: 'Coffee', name: 'Café au Lait', price: 'Php 120.00', desc: 'Brewed coffee with steamed milk.'},
  {id: '5', category: 'Coffee', name: 'Caramel Macchiato', price: 'Php 125.00', desc: 'Espresso with steamed milk, vanilla syrup and caramel drizzle.'}
];

// ─── Stack Navigator Setup ───────────────────────────────────────────────────
// createStackNavigator() creates a "stack" of screens.
// Think of it like a stack of cards — you push a card when you go forward,
// and pop it off when you press Back.
const Stack = createStackNavigator();

// ─── Home Screen (Coffee Menu) ───────────────────────────────────────────────
function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>☕ Kapine - Menu</Text>

      {/* FlatList renders the menuItems array as a scrollable list */}
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            activeOpacity={0.75}
            onPress={() => navigation.navigate('Detail', { coffee: item })}
          >
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// ─── Detail Screen ───────────────────────────────────────────────────────────
function DetailScreen({ route, navigation }: any) {

  // route.params contains the data we passed when calling navigation.navigate()
  const { coffee } = route.params;

  return (
    <View style={styles.detailContainer}>
      <Text style={styles.detailCategory}>{coffee.category}</Text>
      <Text style={styles.detailName}>{coffee.name}</Text>
      <Text style={styles.detailPrice}>{coffee.price}</Text>
      <Text style={styles.detailDesc}>{coffee.desc}</Text>

      {/* navigation.goBack() pops this screen off and returns to HomeScreen */}
      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── App (Navigation Container) ─────────────────────────────────────────────
// NavigationIndependentTree is needed because Expo Router already has its own
// navigator running. This tells React Navigation to treat our Stack as
// a separate, independent navigation tree so they don't conflict.
export default function App() {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#3E1F00' },
          headerTintColor: '#F5E6D3',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Register our two screens with the Stack */}
        <Stack.Screen name="Menu"   component={HomeScreen}   options={{ title: '☕ Coffee Shop'}} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Coffee Details', headerLeft: () => null }} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({

  // Home Screen
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FDF6EE',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#3E1F00',
  },
  item: {
    backgroundColor: '#FFF8F2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#C1440E',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  category: {
    fontSize: 12,
    color: '#888',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3E1F00',
  },
  price: {
    fontSize: 14,
    color: '#C1440E',
    marginTop: 4,
  },

  // Detail Screen
  detailContainer: {
    flex: 1,
    padding: 28,
    backgroundColor: '#FDF6EE',
    justifyContent: 'center',
  },
  detailCategory: {
    fontSize: 13,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  detailName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3E1F00',
    marginBottom: 8,
  },
  detailPrice: {
    fontSize: 22,
    color: '#C1440E',
    fontWeight: '600',
    marginBottom: 20,
  },
  detailDesc: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 40,
  },
  backButton: {
    backgroundColor: '#3E1F00',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FDF6EE',
    fontSize: 16,
    fontWeight: '600',
  },

});
