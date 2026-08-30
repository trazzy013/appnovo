import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Rosto</Text>
      <Image
        source={{ uri: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRhbU27g61resxpFF9ml09FUcdgchJGrDXgXMych4KskgWW9c86sRO3pZMJEb7jyeh1dQn39UWe6qhTI5nYmkSFQPcaqnXCADZE_2NWARVWwzn2dsI9grwg' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>KIt Skincare</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Hidrata-se diáriamente.
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