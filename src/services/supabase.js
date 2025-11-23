import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://kzivqgrrzpqgqxpeeotv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6aXZxZ3JyenBxZ3F4cGVlb3R2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MTM1MDksImV4cCI6MjA3OTM4OTUwOX0.yohUlpUs_A8ZrAnvopN-aYIDhUwMSTZ9jk3-abFl9gw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

