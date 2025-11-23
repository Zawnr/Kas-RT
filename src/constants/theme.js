import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2F80ED', // Biru Utama
    accent: '#F2C94C',  // Kuning Aksen
    background: '#FFFFFF',
    surface: '#F8F9FA',
    text: '#333333',
    placeholder: '#BDBDBD',
  },
  roundness: 10,
};