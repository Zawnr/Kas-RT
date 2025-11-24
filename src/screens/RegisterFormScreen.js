import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button, HelperText } from 'react-native-paper';
import { supabase } from '../services/supabase';
import { theme } from '../constants/theme';

export default function RegisterFormScreen({ route, navigation }) {
  const { role } = route.params; 
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '', password: '', nama: '', no_hp: '', alamat: '',
    nama_rt_baru: '', kota_rt: '', kode_rt_gabung: '' 
  });

  const handleRegister = async () => {
    setLoading(true);
    
    if (!formData.email || !formData.password || !formData.nama) {
      Alert.alert("Error", "Mohon lengkapi data wajib (Email, Password, Nama)");
      setLoading(false);
      return;
    }

    // 1. Buat User Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });

    if (authError) {
      Alert.alert("Gagal Daftar", authError.message);
      setLoading(false);
      return;
    }

    const userId = authData.user.id;
    let finalRtId = null;

    try {
      // 2. Logic Role
      if (role === 'PENGURUS') {
        const kodeUnik = 'RT-' + Math.floor(1000 + Math.random() * 9000);
        
        const { error: rtError } = await supabase.from('data_rt').insert({
          id: kodeUnik,
          nama_rt: formData.nama_rt_baru,
          alamat_rt: formData.alamat, 
          kota: formData.kota_rt
        });

        if (rtError) throw rtError;
        finalRtId = kodeUnik;
        Alert.alert("RT Berhasil Dibuat!", `Kode Unik RT Anda: ${kodeUnik}. Bagikan ke warga.`);
      
      } else {
        const { data: rtData, error: cekError } = await supabase
          .from('data_rt')
          .select('id')
          .eq('id', formData.kode_rt_gabung)
          .single();

        if (cekError || !rtData) throw new Error("Kode RT tidak ditemukan.");
        finalRtId = rtData.id;
      }

      // 3. Simpan Profil
      const { error: profileError } = await supabase.from('profiles').insert({
        id: userId,
        email: formData.email,
        nama_lengkap: formData.nama,
        no_hp: formData.no_hp,
        alamat_rumah: formData.alamat,
        role: role,
        rt_id: finalRtId
      });

      if (profileError) throw profileError;

      Alert.alert("Sukses", "Akun berhasil dibuat. Silakan Login.");
      navigation.navigate('Login');

    } catch (error) {
      console.error("❌ ERROR REGISTRASI TERJADI:");
      console.error("Pesan:", error.message);
      console.error("Detail:", JSON.stringify(error, null, 2)); 
      
      if (error.details) console.error("DB Details:", error.details);
      if (error.hint) console.error("Hint:", error.hint);

      Alert.alert("Terjadi Kesalahan", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom: 50}}>
      <Text variant="headlineSmall" style={styles.title}>
        Lengkapi Data {role === 'PENGURUS' ? 'Pengurus' : 'Warga'}
      </Text>
      
      {role === 'PENGURUS' && (
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Data RT Baru</Text>
          <TextInput label="Nama RT" mode="outlined" style={styles.input} value={formData.nama_rt_baru} onChangeText={(text) => setFormData({...formData, nama_rt_baru: text})} />
          <TextInput label="Kota / Kabupaten" mode="outlined" style={styles.input} value={formData.kota_rt} onChangeText={(text) => setFormData({...formData, kota_rt: text})} />
        </View>
      )}

      {role === 'WARGA' && (
        <View style={styles.sectionBox}>
           <Text style={styles.sectionTitle}>Identitas RT</Text>
          <TextInput label="Masukkan Kode RT" placeholder="Cth: RT-4582" mode="outlined" style={styles.input} value={formData.kode_rt_gabung} onChangeText={(text) => setFormData({...formData, kode_rt_gabung: text})} />
        </View>
      )}

      <Text style={styles.sectionTitle}>Data Pribadi</Text>
      <TextInput label="Nama Lengkap" mode="outlined" style={styles.input} value={formData.nama} onChangeText={(text) => setFormData({...formData, nama: text})} />
      <TextInput label="Email" mode="outlined" style={styles.input} keyboardType="email-address" autoCapitalize="none" value={formData.email} onChangeText={(text) => setFormData({...formData, email: text})} />
      <TextInput label="Password" mode="outlined" style={styles.input} secureTextEntry value={formData.password} onChangeText={(text) => setFormData({...formData, password: text})} />
      <TextInput label="No. HP" mode="outlined" style={styles.input} keyboardType="phone-pad" value={formData.no_hp} onChangeText={(text) => setFormData({...formData, no_hp: text})} />
      <TextInput label="Alamat Rumah" mode="outlined" style={styles.input} multiline value={formData.alamat} onChangeText={(text) => setFormData({...formData, alamat: text})} />

      <Button mode="contained" style={styles.btnSubmit} loading={loading} onPress={handleRegister}>
        {loading ? "Memproses..." : "Konfirmasi & Daftar"}
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontWeight: 'bold', marginBottom: 20, color: theme.colors.primary },
  sectionBox: { backgroundColor: '#F5F9FF', padding: 15, borderRadius: 10, marginBottom: 20 },
  sectionTitle: { fontWeight: 'bold', marginBottom: 10, color: '#555' },
  input: { marginBottom: 10, backgroundColor: '#fff' },
  btnSubmit: { marginTop: 20, borderRadius: 30, height: 50, justifyContent: 'center', backgroundColor: theme.colors.primary }
});