import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Cabelo</Text>
      <Image
        source={{ uri: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSp7V6CZg65f3VwX6V4QLBrvo7xz0uYfSeVeRO1vKXpq9ujFtarqF8PND67sXiDMmhGn7pHldNLpn0VpugMuo4OozX3ZLg48ZgO6VH8wPgokneG80ZGlk9E8w' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Creme de tratamento</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Deixe o seu cabelo tratado.
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
