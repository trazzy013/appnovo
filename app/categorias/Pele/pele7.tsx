import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Pele</Text>
      <Image
        source={{ uri: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSYrI8jXLeViEQ49q0fZ9f_pylFloglayHhYwrXmKSpieJ1Bmmjktj6GLxeBcWbEXYPkLiPO1L8sAGLbNVHqDtz4BMQ-f42buU8Vr_upR9aMzZHqB3P3ieftw_3mq-AIAWqHJ2ngo8&usqp=CAc' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Kit Hidratante e Reparador</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
        Hidrata-se e repare a sua pele.
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