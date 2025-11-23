import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { supabase } from './src/services/supabase';
import { theme } from './src/constants/theme';

// Import Screen
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterChoiceScreen from './src/screens/RegisterChoiceScreen';
import RegisterFormScreen from './src/screens/RegisterFormScreen';
import DashboardScreen from './src/screens/DashboardScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek session saat aplikasi dibuka
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Dengar perubahan login/logout
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return null; 

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {session && session.user ? (
            // Halaman Setelah Login
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
          ) : (
            // Halaman Sebelum Login
            <Stack.Group>
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen 
                name="RegisterChoice" 
                component={RegisterChoiceScreen} 
                options={{ headerShown: true, title: 'Pilih Akun' }} 
              />
              <Stack.Screen 
                name="RegisterForm" 
                component={RegisterFormScreen}
                options={{ headerShown: true, title: 'Isi Data' }}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}