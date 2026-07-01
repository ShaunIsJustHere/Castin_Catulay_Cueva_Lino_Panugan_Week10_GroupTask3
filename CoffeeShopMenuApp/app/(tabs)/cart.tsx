import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

// ─── Stack Navigator Setup ───────────────────────────────────────────────────
// This is a SECOND independent stack — separate from the one in index.tsx.
// Each tab has its own stack, and NavigationIndependentTree keeps them isolated.
const Stack = createStackNavigator();

// ─── Cart Screen ─────────────────────────────────────────────────────────────
function CartScreen({ navigation }: any) {

  // ─── Stated Variables [7/1/2026] ───────────────────────────────────────────────────── 
  const [note, setNote] = useState('');
  const [savedOrder, setSavedOrder] = useState<any>(null);

  useEffect(() => {
    loadOrder();
  }, []);
  // ─────────────────────────────────────────────────────────────────────────────────────

  // ─── Added Functions to Save and Load Data [7/1/2026] ─────────────────────────────────────────────────────
  async function saveOrder() {
    try {
      const order = {
        note: note,
        time: new Date().toLocaleTimeString(),
      };

      await AsyncStorage.setItem('orderNote', JSON.stringify(order));

      setSavedOrder(order);
      setNote('');
    } catch (error) {
      console.log(error);
    }
  }

  async function loadOrder() {
    try {
      const value = await AsyncStorage.getItem('orderNote');

      if (value != null) {
        setSavedOrder(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
    }
  }
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Cart Screen</Text>

      {/* ─── Input Field ─── */}
      <Text style={{ fontSize: 12, color: '#999'}}>SPECIAL INSTRUCTIONS:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your note here..."
        value={note}
        onChangeText={setNote}
      />

      {/* ─── Save Button ─── */}
      <TouchableOpacity
        style={styles.button}
        onPress={saveOrder}
      >
        <Text style={styles.buttonText}>Save Note</Text>
      </TouchableOpacity>

      {/* ─── Data Display ─── */}
      {savedOrder && (
        <View style={styles.detailContainer}>
          <Text style={{ fontSize: 12, color: '#999'}}>LAST SAVED NOTE:</Text>

          <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#1A4D2E' }}>{savedOrder.note}</Text>

          <Text style={{ fontSize: 10, color: '#999', fontStyle: 'italic' }}>Saved at {savedOrder.time}</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('OrderSummary')}
      >
        <Text style={styles.buttonText}>View Order Summary</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Order Summary Screen ─────────────────────────────────────────────────────
function OrderSummaryScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📋 Order Summary</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>← Back to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
// NavigationIndependentTree isolates this stack from the one in index.tsx.
// Both tabs have their own stack — they do not share or interfere with each other.
export default function App() {
  return (
    <NavigationIndependentTree>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#1A4D2E' },
          headerTintColor: '#F5F5F5',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Cart"         component={CartScreen}         options={{ title: '🛒 My Cart' }} />
        <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} options={{ title: 'Order Summary', headerLeft: () => null }} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#1A4D2E',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  // ─── New Styles ───
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  detailContainer: {
    backgroundColor: '#F0FFF4',
    borderRadius: 12,
    padding: 16,
    margin: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1A4D2E',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2
  }
});
