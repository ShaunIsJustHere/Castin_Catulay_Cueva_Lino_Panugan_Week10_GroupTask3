import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import { NavigationIndependentTree } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

const Stack = createStackNavigator();

const [edit, setEdit] = useState('');
const [savedChange, setSavedChange] = useState<any>(null);

useEffect(() => {
  loadProfile();
}, []);

async function saveChange() {
  try {
    const change = {
      note: edit,
      time: new Date().toLocaleTimeString()
    };

    await AsyncStorage.setItem('profileEdit', JSON.stringify(change));

    setSavedChange(change);
    setEdit('');
  } catch (error) {
    console.log(error);
  }
}

async function loadProfile() {
  try {
    const value = await AsyncStorage.getItem('profileEdit');

    if (value != null) {
      setSavedChange(JSON.parse(value));
    }
  } catch (error) {
    console.log(error);
  }
}

// ─── Profile Screen ───────────────────────────────────────────────────────────
function ProfileScreen({ navigation }: any) {

  return (
    <View style={styles.container}>
      <Text style={styles.avatar}>👤</Text>
      <Text style={styles.name}>{savedChange.edit}</Text>
      <Text style={styles.email}>kapine@gmail.com</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Member Since</Text>
        <Text style={styles.value}>July 2026</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Total Orders</Text>
        <Text style={styles.value}>12</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Edit')}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

function EditScreen({ navigation }: any) {
  return (
    
    <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
      <Text style={styles.title}>✍️ Edit Profile</Text>

      <Text style={{ fontSize: 12, color: '#999'}}>{savedChange.edit}</Text>
      <TextInput
        style={styles.input}
        placeholder="Edit your profile name here..."
        value={edit}
        onChangeText={setEdit}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={saveChange}
      >
        <Text style={styles.buttonText}>Save Changes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={styles.buttonText}>Return to Profile</Text>
      </TouchableOpacity>

    </View>
  )
}

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
        <Stack.Screen name="Profile"         component={ProfileScreen}         options={{ title: '👤 Personal Profile' }} />
        <Stack.Screen name="Edit" component={EditScreen} options={{ title: 'Profile Details', headerLeft: () => null }} />
      </Stack.Navigator>
    </NavigationIndependentTree>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: '#FDF6EE',
  },
  avatar: {
    fontSize: 64,
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3E1F00',
  },
  email: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
  },
  card: {
    width: '80%',
    backgroundColor: '#FFF8F2',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#C1440E',
  },
  label: {
    fontSize: 12,
    color: '#888',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#3E1F00',
    marginTop: 4,
  },

  button: {
    backgroundColor: '#3E1F00',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  // ─── New Styles ───
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 20,
  }
});
