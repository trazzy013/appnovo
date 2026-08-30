import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Cabelo</Text>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSDbKgE-8NbB_gwz38jORvsqLQ1GkZ2JOFBrgyI7WrNC6_X9cfcF2d9hHvEKN42zWZ5OYRIuS0f1ko3x3NPA3SKt_syjfRi' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Máscara de tratamento</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Uma máscara de tratamento que nutre e hidrata.
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