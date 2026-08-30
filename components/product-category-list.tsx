import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from '../app/src/context/ThemeContext';

type Product = { name: string; detail: string; route: string; image: string };
export function ProductCategoryList({ eyebrow, title, products }: { eyebrow: string; title: string; products: Product[] }) {
  const { theme } = useTheme();
  return <ScrollView style={{ backgroundColor: theme.background }} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
    <Text style={[styles.eyebrow, { color: theme.primary }]}>{eyebrow}</Text><Text style={[styles.title, { color: theme.text }]}>{title}</Text><Text style={[styles.subtitle, { color: theme.textMuted }]}>Escolhas para deixar seu momento de cuidado ainda mais especial.</Text>
    <View style={styles.list}>{products.map(product => <Pressable key={product.name} style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]} onPress={() => router.push(`/produto/${product.route.replace('./', '')}` as any)}><Image source={{ uri: product.image }} style={styles.image}/><View style={styles.info}><Text style={[styles.productName, { color: theme.text }]}>{product.name}</Text><Text style={[styles.detail, { color: theme.textMuted }]}>{product.detail}</Text><Text style={[styles.link, { color: theme.primary }]}>Ver produto</Text></View><Ionicons name="chevron-forward" size={19} color={theme.textMuted}/></Pressable>)}</View>
  </ScrollView>;
}
const styles = StyleSheet.create({ content: { padding: 22, paddingTop: 27, paddingBottom: 42 }, eyebrow: { fontSize: 11, letterSpacing: 1.3, fontWeight: '800' }, title: { fontWeight: '800', fontSize: 28, marginTop: 7 }, subtitle: { marginTop: 8, lineHeight: 21, marginBottom: 26 }, list: { gap: 12 }, card: { borderWidth: 1, borderRadius: 18, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 12 }, image: { width: 74, height: 74, borderRadius: 13, backgroundColor: '#F8EDF1' }, info: { flex: 1 }, productName: { fontSize: 15, fontWeight: '800' }, detail: { fontSize: 12, marginTop: 4 }, link: { fontWeight: '800', fontSize: 12, marginTop: 8 } });
