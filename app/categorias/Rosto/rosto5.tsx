import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';
export default function Maquiagem() {
  const { theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Rosto</Text>
      <Image
        source={{ uri: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTw1QH1o-LtFU8iOZ7K0CnPnLDk_-X02S_sIetbzjaVR-jy2RFGd6065hTr9R5Db-0LoUj8UnRCboZsnQ1BUEZJ5rSgEzd8RniyWOyi-FChNmq4DLbJGL9y' }}
        style={styles.image}
      />
      <Text style={[styles.product, { color: theme.text }]}>Gel de limpeza</Text>
      <Text style={[styles.desc, { color: theme.text }]}>
       Limpe sua pele e deixe incrível.
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