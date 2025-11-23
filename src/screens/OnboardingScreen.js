import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { theme } from '../constants/theme';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo Placeholder */}
        <View style={styles.logoCircle} />

        <Text variant="headlineMedium" style={styles.title}>
          <Text style={{color: theme.colors.accent, fontWeight:'bold'}}>KAS</Text>
          <Text style={{color: theme.colors.primary, fontWeight:'bold'}}>RT</Text>
        </Text>
        
        <Text style={styles.subtitle}>
          Bikin Pengurus Mudah,{'\n'}Bikin Warga Nyaman.
        </Text>

        <View style={styles.buttonContainer}>
          <Button 
            mode="contained" 
            style={styles.btnMasuk}
            contentStyle={{height: 50}}
            onPress={() => navigation.navigate('Login')}
          >
            Masuk
          </Button>
          
          <Button 
            mode="outlined" 
            style={styles.btnDaftar}
            contentStyle={{height: 50}}
            textColor={theme.colors.primary}
            onPress={() => navigation.navigate('RegisterChoice')}
          >
            Daftar
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  content: { padding: 20, alignItems: 'center' },
  logoCircle: {width: 120, height: 120, borderRadius: 60, backgroundColor: theme.colors.primary, marginBottom: 20},
  title: { fontSize: 32, marginBottom: 10 },
  subtitle: { textAlign: 'center', color: theme.colors.primary, fontSize: 16, marginBottom: 40 },
  buttonContainer: { width: '100%', gap: 15 },
  btnMasuk: { borderRadius: 30, backgroundColor: theme.colors.primary },
  btnDaftar: { borderRadius: 30, borderColor: theme.colors.primary, borderWidth: 1 }
});