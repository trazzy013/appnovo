import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Maquiagem</Text>
      <Image
        source={{ uri: 'https://oceane.vtexassets.com/arquivos/ids/202580-800-800?v=638350643865630000&width=800&height=800&aspect=true' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Mascara para cílios</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Para você ganhar um destaque incrível.
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