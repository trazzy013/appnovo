import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Rosto</Text>
      <Image
        source={{ uri: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSkCIZ3qBSkfkEBepyt8jCcFCMKuPxtbTH6pXXMpteGik-k0RMTVww9oxUf-_uMGIZaEnHPDOe5ZBKSzbQri741mgjRwOtAUrIiZxkRQosiBAP1w5CTW67U' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Creme Hidratante Facial</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Deixe a sua pele hidratada.
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