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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🛒 Cart Screen</Text>

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
      <Text style={styles.title}>📋 Order Summary</Text>

      {/* ─── Input Field ─── */}
      <TextInput
        style={styles.input}
        placeholder="Enter your order note"
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
        <View style={{ marginTop: 30, alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Saved Order</Text>

          <Text>Note: {savedOrder.note}</Text>

          <Text>Saved At: {savedOrder.time}</Text>
        </View>
      )}

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
    alignItems: 'center',
    backgroundColor: '#fff',
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
  },

  input: {
    width: '80%',
    height: 45,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  }
});
