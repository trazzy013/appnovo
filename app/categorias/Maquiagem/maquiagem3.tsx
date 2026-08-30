import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Maquiagem</Text>
      <Image
        source={{ uri: 'https://payottatix.vtexassets.com/arquivos/ids/161539/Base_Matte_Alta_Cobertura_1_312.jpg?v=639204512755600000' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Base Matte</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Uma boa base transforma a make.
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