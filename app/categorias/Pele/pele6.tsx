import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Pele</Text>
      <Image
        source={{ uri: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSboWBKmVCh4Pw4xuZWzqDuBj_HAb0SO5QG4NfLrml88VpVBsUGZVzUi2PO2IbSXHySM3YEc6zj1KGxKcY_qfd2wAq1tC1VxkljdE4KqFHHacZBB1vHC2wFWO2m0PaP6Ykyg9q-GBbXkFs&usqp=CAc' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Kit Principia</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Um kit para deixar a sua pele impecável.
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