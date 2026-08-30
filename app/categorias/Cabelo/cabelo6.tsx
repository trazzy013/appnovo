import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Cabelo</Text>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTfQRJVvpPi-mIhjP0-Y_NTCmlcxrtiv8CIE9nwUCYJ_6nIOEs5FvAWv7hdy1oNVjqVvI6_ehRAuOe14tJF0Y_7WxAtiOajZ1WIsL0aFQ5_AkA-dXcqxMg7DXLU' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Desfrizante Salon line</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Um toque que ajuda a controlar o frizz.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  image: { width: 150, height: 150 },
  product: { fontSize: 18, marginTop: 10, fontWeight: 'bold' },
  desc: { textAlign: 'center', padding: 10 },
});