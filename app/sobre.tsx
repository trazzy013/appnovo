import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useTheme } from './src/context/ThemeContext';

const highlights = [
  { icon: 'sparkles-outline', title: 'Cuidado personalizado', text: 'Descubra produtos e rotinas de acordo com o seu tipo de pele.' },
  { icon: 'shield-checkmark-outline', title: 'Sua conta protegida', text: 'As senhas são enviadas de forma segura e armazenadas em formato criptografado.' },
  { icon: 'heart-outline', title: 'Beleza sem complicação', text: 'Tudo para tornar seu autocuidado mais simples e gostoso.' },
];

export default function Sobre() {
  const { theme } = useTheme();
  return <ScrollView style={[styles.screen, { backgroundColor: theme.background }]} contentContainerStyle={styles.content}>
    <View style={[styles.hero, { backgroundColor: theme.accentSoft }]}>
      <View style={[styles.logo, { backgroundColor: theme.primary }]}><Text style={styles.logoText}>D</Text></View>
      <Text style={[styles.brand, { color: theme.text }]}>divas</Text>
      <Text style={[styles.tagline, { color: theme.textMuted }]}>Seu espaço de beleza e autocuidado.</Text>
    </View>
    <Text style={[styles.title, { color: theme.text }]}>Feito para a sua rotina</Text>
    <Text style={[styles.description, { color: theme.textMuted }]}>O Divas reúne produtos, dicas e um diagnóstico de pele para ajudar você a escolher o que faz sentido para o seu dia a dia.</Text>
    <View style={styles.list}>{highlights.map((item) => <View key={item.title} style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}><View style={[styles.icon, { backgroundColor: theme.accentSoft }]}><Ionicons name={item.icon as any} size={21} color={theme.primary}/></View><View style={styles.cardContent}><Text style={[styles.cardTitle, { color: theme.text }]}>{item.title}</Text><Text style={[styles.cardText, { color: theme.textMuted }]}>{item.text}</Text></View></View>)}</View>
    <Pressable style={[styles.button, { borderColor: theme.primary }]} onPress={() => router.push('/quiz' as any)}><Text style={[styles.buttonText, { color: theme.primary }]}>Fazer meu diagnóstico</Text><Ionicons name="arrow-forward" size={18} color={theme.primary}/></Pressable>
    <Text style={[styles.version, { color: theme.textMuted }]}>DIVAS · VERSÃO 1.0.0</Text>
  </ScrollView>;
}

const styles = StyleSheet.create({
  screen: { flex: 1 }, content: { padding: 22, paddingBottom: 36 }, hero: { borderRadius: 24, alignItems: 'center', paddingVertical: 30, paddingHorizontal: 18 }, logo: { width: 62, height: 62, borderRadius: 21, alignItems: 'center', justifyContent: 'center' }, logoText: { color: '#fff', fontSize: 34, fontWeight: '800' }, brand: { fontSize: 28, fontWeight: '800', marginTop: 10 }, tagline: { fontSize: 14, marginTop: 4 }, title: { marginTop: 30, fontSize: 23, fontWeight: '800' }, description: { marginTop: 9, fontSize: 14, lineHeight: 21 }, list: { gap: 11, marginTop: 25 }, card: { borderWidth: 1, borderRadius: 17, padding: 14, flexDirection: 'row', gap: 12 }, icon: { width: 42, height: 42, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, cardContent: { flex: 1 }, cardTitle: { fontSize: 15, fontWeight: '800' }, cardText: { fontSize: 13, lineHeight: 19, marginTop: 3 }, button: { minHeight: 51, borderWidth: 1.5, borderRadius: 14, marginTop: 27, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 9 }, buttonText: { fontWeight: '800', fontSize: 15 }, version: { fontSize: 10, letterSpacing: 1, textAlign: 'center', marginTop: 28, fontWeight: '700' },
});
