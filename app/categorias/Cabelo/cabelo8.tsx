import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Cabelo</Text>
      <Image
        source={{ uri: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQNro96ZDrRTsDlQASpW1QNIQMzwmSN1HWpfJyXgxJgNoYOML9R_cuVRYBpR-0I-mLw5zyb5HcySF-_T8vpCetbiwTpqbmX9XVHH8Xr1QFmC4XDHzDWwKQ0aQ' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Máscara seladora</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Tenha cuidado perfeito para selar os fios.
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