import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Cabelo</Text>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRBov--KuKj_WpekdgdU7qPdE0uFdIL9_cq4R2Ocn3G1vrEhM68DHfNz1uIM72zIFI7Qanh8i5M2FE6FaSKvEIynBZYCHpd' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Kit de Shampoo e condicionador</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Deixe o seu cabelo limpo e macío.
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