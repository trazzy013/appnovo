import { Stack, router } from 'expo-router';
import { useState } from 'react';
import {
  TouchableOpacity, View, Text, StyleSheet,
  Modal, Pressable, StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';

const menuItems = [
  { label: 'Início', href: '/', icon: 'home-outline' },
  { label: 'Diagnóstico de pele', href: '/quiz', icon: 'sparkles-outline' },
  { label: 'Categorias', href: '/produtos', icon: 'grid-outline' },
  { label: 'Carrinho', href: '/carrinho', icon: 'bag-outline' },
  { label: 'Meu perfil', href: '/perfil', icon: 'person-outline' },
  { label: 'Configurações', href: '/configuracao', icon: 'settings-outline' },
  { label: 'Sobre o Divas', href: '/sobre', icon: 'information-circle-outline' },
];

function MenuButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingLeft: 0 }}>
      <Ionicons name="menu" size={25} color="#30252A" />
    </TouchableOpacity>
  );
}

function LayoutInner() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, isDark } = useTheme();
  const { user } = useAuth();

  const navigate = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => router.push(href as any), 300);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: theme.headerBg },
          headerTintColor: theme.text,
          headerTitleAlign: 'center',
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Divas",
            headerLeft: () => <MenuButton onPress={() => setMenuOpen(true)} />,
          }}
        />
        <Stack.Screen name="login" options={{ title: '', headerShown: false }} />
        <Stack.Screen name="cadastro" options={{ title: '', headerShown: false }} />
        <Stack.Screen name="perfil" options={{ title: 'Meu perfil' }} />
        <Stack.Screen name="produto/[id]" options={{ title: 'Produto' }} />
        <Stack.Screen name="skincare" options={{ title: 'Skin Care' }} />
        <Stack.Screen name="shampoo" options={{ title: 'Shampoo' }} />
        <Stack.Screen name="carrinho" options={{ title: 'Carrinho' }} />
        <Stack.Screen name="battom" options={{ title: 'Battom' }} />
        <Stack.Screen name="promocoes" options={{ title: 'Promoções' }} />
        <Stack.Screen name="sobre" options={{ title: 'Sobre' }} />
        <Stack.Screen name="configuracao" options={{ title: 'Configuração' }} />
        <Stack.Screen name="produtos" options={{ title: 'Produtos' }} />
        <Stack.Screen name="quiz" options={{ title: 'Quiz' }} />
        <Stack.Screen name="categorias/Maquiagem/maquiagem" options={{ title: 'Categoria de Maquiagem' }}/>
        <Stack.Screen name="categorias/Maquiagem/maquiagem1" options={{ title: 'Categoria de Maquiagem' }}/>
        <Stack.Screen name="categorias/Maquiagem/maquiagem2" options={{ title: 'Categoria de Maquiagem' }}/>
        <Stack.Screen name="categorias/Maquiagem/maquiagem3" options={{ title: 'Categoria de Maquiagem' }}/>
        <Stack.Screen name="categorias/Maquiagem/maquiagem4" options={{ title: 'Categoria de Maquiagem' }}/>
        <Stack.Screen name="categorias/Maquiagem/maquiagem5" options={{ title: 'Categoria de Maquiagem' }}/>
        <Stack.Screen name="categorias/Maquiagem/maquiagem6" options={{ title: 'Categoria de Maquiagem' }}/>
        <Stack.Screen name="categorias/Maquiagem/maquiagem7" options={{ title: 'Categoria de Maquiagem' }}/>
        <Stack.Screen name="categorias/Maquiagem/maquiagem8" options={{ title: 'Categoria de Maquiagem' }}/>
        <Stack.Screen name="categorias/Cabelo/cabelo" options={{ title: 'Categoria de Cabelo' }}/>
        <Stack.Screen name="categorias/Cabelo/cabelo1" options={{ title: 'Categoria de Cabelo' }}/>
        <Stack.Screen name="categorias/Cabelo/cabelo2" options={{ title: 'Categoria de Cabelo' }}/>
        <Stack.Screen name="categorias/Cabelo/cabelo3" options={{ title: 'Categoria de Cabelo' }}/>
        <Stack.Screen name="categorias/Cabelo/cabelo4" options={{ title: 'Categoria de Cabelo' }}/>
        <Stack.Screen name="categorias/Cabelo/cabelo5" options={{ title: 'Categoria de Cabelo' }}/>
        <Stack.Screen name="categorias/Cabelo/cabelo6" options={{ title: 'Categoria de Cabelo' }}/>
        <Stack.Screen name="categorias/Cabelo/cabelo7" options={{ title: 'Categoria de Cabelo' }}/>
        <Stack.Screen name="categorias/Cabelo/cabelo8" options={{ title: 'Categoria de Cabelo' }}/>
        <Stack.Screen name="categorias/Pele/pele" options={{ title: 'Categoria de Pele' }}/>
        <Stack.Screen name="categorias/Pele/pele1" options={{ title: 'Categoria de Pele' }}/>
        <Stack.Screen name="categorias/Pele/pele2" options={{ title: 'Categoria de Pele' }}/>
        <Stack.Screen name="categorias/Pele/pele3" options={{ title: 'Categoria de Pele' }}/>
        <Stack.Screen name="categorias/Pele/pele4" options={{ title: 'Categoria de Pele' }}/>
        <Stack.Screen name="categorias/Pele/pele5" options={{ title: 'Categoria de Pele' }}/>
        <Stack.Screen name="categorias/Pele/pele6" options={{ title: 'Categoria de Pele' }}/>
        <Stack.Screen name="categorias/Pele/pele7" options={{ title: 'Categoria de Pele' }}/>
        <Stack.Screen name="categorias/Pele/pele8" options={{ title: 'Categoria de Pele' }}/>
        <Stack.Screen name="categorias/Rosto/rosto" options={{ title: 'Categoria de Rosto' }}/>
        <Stack.Screen name="categorias/Rosto/rosto1" options={{ title: 'Categoria de Rosto' }}/>
        <Stack.Screen name="categorias/Rosto/rosto2" options={{ title: 'Categoria de Rosto' }}/>
        <Stack.Screen name="categorias/Rosto/rosto3" options={{ title: 'Categoria de Rosto' }}/>
        <Stack.Screen name="categorias/Rosto/rosto4" options={{ title: 'Categoria de Rosto' }}/>
        <Stack.Screen name="categorias/Rosto/rosto5" options={{ title: 'Categoria de Rosto' }}/>
        <Stack.Screen name="categorias/Rosto/rosto6" options={{ title: 'Categoria de Rosto' }}/>
      </Stack>

      <Modal
        visible={menuOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuOpen(false)}
      >
        <View style={styles.modalContainer}>
          <Pressable style={styles.overlay} onPress={() => setMenuOpen(false)} />
          <View style={[styles.drawer, { backgroundColor: theme.surface }]}>
            <View style={styles.drawerHeader}>
              <View style={styles.drawerAvatar}><Text style={styles.drawerInitial}>{user ? user.nome.charAt(0).toUpperCase() : 'D'}</Text></View><View style={{ flex: 1 }}><Text style={styles.drawerTitle}>Olá{user ? `, ${user.nome.split(' ')[0]}` : ''}</Text><Text style={styles.drawerSubtitle}>{user ? 'Seu espaço de beleza' : 'Seu ritual começa aqui'}</Text></View>
              <TouchableOpacity onPress={() => setMenuOpen(false)}>
                <Ionicons name="close" size={22} color="#7B606A" />
              </TouchableOpacity>
            </View>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.href}
                style={styles.menuItem}
                onPress={() => navigate(item.href)}
              >
                <View style={styles.menuIcon}><Ionicons name={item.icon as any} size={19} color="#C74378" /></View><Text style={styles.menuItemText}>{item.label}</Text><Ionicons name="chevron-forward" size={17} color="#BCA8AF"/>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default function Layout() {
  return (
    <AuthProvider><ThemeProvider><CartProvider><LayoutInner /></CartProvider></ThemeProvider></AuthProvider>
  );
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1,},
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.4)' },
  drawer: { width: 300, height: '100%' },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11, padding: 21, paddingTop: 32, backgroundColor: '#FFF7F9',
  },
  drawerAvatar: { width: 43, height: 43, borderRadius: 14, backgroundColor: '#F4D8E3', alignItems: 'center', justifyContent: 'center' },
  drawerInitial: { color: '#B53769', fontWeight: '800', fontSize: 19 },
  drawerTitle: { color: '#30252A', fontSize: 17, fontWeight: '800' },
  drawerSubtitle: { color: '#8B707A', fontSize: 12, marginTop: 3 },
  menuItem: { marginHorizontal: 12, minHeight: 53, flexDirection: 'row', alignItems: 'center', gap: 11 },
  menuIcon: { width: 32, height: 32, borderRadius: 10, backgroundColor: '#FCEBF1', alignItems: 'center', justifyContent: 'center' },
  menuItemText: { flex: 1, color: '#493740', fontSize: 14, fontWeight: '700' },
});
