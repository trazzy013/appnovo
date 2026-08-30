import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Pele</Text>
      <Image
        source={{ uri: 'https://kozhaskincare.com/cdn/shop/files/Kozha-Espuma_de_Limpeza_Facial_copy.png?v=1760831195&width=1000' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Espuma de limpeza</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Elimine toda a sujeira.
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