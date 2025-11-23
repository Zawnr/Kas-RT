import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { supabase } from '../services/supabase';
import { theme } from '../constants/theme';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [secureText, setSecureText] = useState(true);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Gagal Masuk', error.message);
      setLoading(false);
    } 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
         <View style={{width: 60, height: 60, borderRadius: 30, backgroundColor: theme.colors.primary, alignSelf:'center', marginBottom: 10}} />
         <Text variant="titleLarge" style={{textAlign:'center', color: theme.colors.primary, fontWeight:'bold'}}>KASRT</Text>
      </View>

      <View style={styles.tabContainer}>
        <Button mode="text" textColor="#BDBDBD" onPress={() => navigation.navigate('RegisterChoice')}>Daftar</Button>
        <Button mode="contained" style={styles.activeTab}>Masuk</Button>
      </View>

      <View style={styles.form}>
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          autoCapitalize="none"
        />
        <TextInput
          label="Kata Sandi"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
          right={<TextInput.Icon icon={secureText ? "eye" : "eye-off"} onPress={() => setSecureText(!secureText)} />}
          style={styles.input}
        />
        
        <Text style={styles.forgotPass}>Lupa Password?</Text>

        <Button 
          mode="contained" 
          onPress={handleLogin} 
          loading={loading}
          style={styles.btnLogin}
        >
          Masuk
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent:'center' },
  header: { marginBottom: 30 },
  tabContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20, backgroundColor:'#F5F5F5', borderRadius: 30, padding: 4 },
  activeTab: { backgroundColor: '#fff', shadowColor:'#000', elevation: 2, borderRadius: 25, width: '50%' },
  form: { gap: 15 },
  input: { backgroundColor: '#fff' },
  forgotPass: { textAlign: 'right', color: 'red', fontSize: 12 },
  btnLogin: { borderRadius: 30, height: 50, justifyContent:'center', marginTop: 10, backgroundColor: theme.colors.primary }
});