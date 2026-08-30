import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from './src/context/ThemeContext';
export default function Skincare() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Skin Care</Text>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKt-7v7BR8Feee6VesLrSAp4kqEzjkXbyNCm_Fb0WSaQ&s=10' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Hidratante Facial</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Mantém sua pele hidratada e saudável o dia todo.
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  image: { width: 250, height: 180, borderRadius: 10 },
  product: { fontSize: 18, marginTop: 10, fontWeight: 'bold' },
  desc: { textAlign: 'center', padding: 10 },
});
