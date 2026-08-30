import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from './src/context/ThemeContext';
export default function Promocoes() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Promoções</Text>
      <Image
        source={{ uri: 'https://down-br.img.susercontent.com/file/br-11134207-7r98o-m3fci9g1jry011' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Kit Beleza Completo</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Combo especial com desconto para você arrasar!{'\n'}{'\n'}
        Apenas R$20,00 !!!
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