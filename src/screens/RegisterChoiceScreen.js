import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, RadioButton, Button } from 'react-native-paper';
import { theme } from '../constants/theme';

export default function RegisterChoiceScreen({ navigation }) {
  const [role, setRole] = useState('WARGA');

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.header}>Daftar akun sebagai</Text>
      
      <TouchableOpacity 
        style={[styles.card, role === 'PENGURUS' && styles.cardActive]} 
        onPress={() => setRole('PENGURUS')}
      >
        <RadioButton 
          value="PENGURUS" 
          status={role === 'PENGURUS' ? 'checked' : 'unchecked'} 
          onPress={() => setRole('PENGURUS')}
          color={theme.colors.primary}
        />
        <Text style={styles.label}>Pengurus RT</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.card, role === 'WARGA' && styles.cardActive]} 
        onPress={() => setRole('WARGA')}
      >
        <RadioButton 
          value="WARGA" 
          status={role === 'WARGA' ? 'checked' : 'unchecked'} 
          onPress={() => setRole('WARGA')}
          color={theme.colors.primary}
        />
        <Text style={styles.label}>Warga</Text>
      </TouchableOpacity>

      <Button 
        mode="contained" 
        style={styles.btnNext}
        onPress={() => navigation.navigate('RegisterForm', { role: role })}
      >
        Selanjutnya
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 50 },
  header: { fontWeight: 'bold', marginBottom: 20 },
  card: {
    flexDirection: 'row', alignItems: 'center', padding: 15,
    borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 12,
    marginBottom: 15
  },
  cardActive: { backgroundColor: '#E3F2FD', borderColor: theme.colors.primary },
  label: { fontSize: 16, marginLeft: 10 },
  btnNext: { marginTop: 20, borderRadius: 30, height: 50, justifyContent:'center', backgroundColor: theme.colors.primary }
});