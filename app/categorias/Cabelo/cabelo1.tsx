
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Cabelo</Text>
      <Image
        source={{ uri: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSrr987nM4cII0KQ2LShtc6XoFsPEiHpTaiROA2qFeZM0j409gu2WaRUj5LeEK8zUWgljPZukgujRRWy0qQ0_9SKL8B2brVMPkn9DPzRHLt9r9KQ1YA8eGE1g' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Creme de pentear</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Deixe o seu cabelo modelado e encaracolado.
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