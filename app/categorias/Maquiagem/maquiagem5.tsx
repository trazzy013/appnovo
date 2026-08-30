import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Maquiagem</Text>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ5yTjSVwOHicbXvcw-hpUDWJcLeiAOFiFzNCPwWyrew&s=10' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Pó Dailus</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Um toque de pó para selar a make e deixar a pele com aquele acabamento impecável.
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