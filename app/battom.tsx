import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from './src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Maquiagem</Text>
      <Image
        source={{ uri: 'https://static.vecteezy.com/system/resources/previews/023/742/340/non_2x/pink-lipstick-illustration-ai-generative-free-png.png' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Batom Matte Rosa</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Cor intensa e longa duração para um look incrível.
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