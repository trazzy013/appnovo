import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Rosto</Text>
      <Image
        source={{ uri: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR0ILWjnAB7kaLecKCCnDDTQUM2R5moloxJuQWoaEpAaWCbSLamOT4VgujgquF1ZxKVuXMyyH-_jpzpv16sf0kai_FxOZMmJbN9sYkvl7oDNo2Y3AUcpv-P' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Sérum facial Nc-10</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Um toque de sérum para deixar a pele mais hidratada e incrível.
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