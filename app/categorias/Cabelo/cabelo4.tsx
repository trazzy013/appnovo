import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Cabelo</Text>
      <Image
        source={{ uri: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSc47Gn5JOyNpN-ptDlQZRm1CZp8wakUKohkhX5ItNZmBJ_X4ZcJyoXHkuarDE-2M7pGLC-0DobfFkrhAIAKZiwJJYS3Bzj920WMkBABphdYW_tE62B-E72i_E' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Reparador de pontas</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Repare as pontas de seu cabelo.
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