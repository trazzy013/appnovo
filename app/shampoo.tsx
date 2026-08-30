import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from './src/context/ThemeContext';
export default function Cabelo() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Cabelos</Text>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiur2SB32nf-148XTJ5lwNKeUMMP1-czwIevk3gmr30A&s=10' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Shampoo Nutritivo</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Deixa o cabelo macio, brilhante e saudável.
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