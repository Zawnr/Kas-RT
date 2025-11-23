import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { supabase } from '../services/supabase';

export default function DashboardScreen() {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff' }}>
      <Text variant="headlineMedium">Selamat Datang!</Text>
      <Text style={{marginBottom: 20}}>Anda berhasil masuk ke Dashboard.</Text>
      <Button mode="contained" onPress={handleLogout} buttonColor="red">
        Keluar (Logout)
      </Button>
    </View>
  );
}