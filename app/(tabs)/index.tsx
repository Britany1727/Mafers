import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useAgregarRamo, useRamos } from '../../src/hooks/useRamo';
import { useAuth } from '../../src/providers/auth-provider';

export default function App() {
  const router = useRouter();
  const { signOut } = useAuth();

  const [ramo, setRamo] = useState('');
  const [costo, setCosto] = useState('');

  const { data: ramos = [] } = useRamos();

  const agregarMutation = useAgregarRamo();

  const agregar = () => {
    agregarMutation.mutate(
      {
        nombre: ramo,
        costo: Number(costo),
      },
      {
        onSuccess: () => {
          setRamo('');
          setCosto('');
        },
      }
    );
  };

  const handleLogOut = async () => {
    await signOut();
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Mis Ramos</Text>
          <Text style={styles.subtitle}>Agrega tus ramos</Text>
        </View>

        <Pressable
          style={styles.logoutButton}
          onPress={handleLogOut}>
          <Text style={styles.logoutText}>
            Cerrar sesión
          </Text>
        </Pressable>
      </View>

      <View style={styles.formCard}>
        <Text style={styles.sectionTitle}>
          Agregar ramo
        </Text>

        <TextInput
          value={ramo}
          onChangeText={setRamo}
          placeholder="Nombre del ramo"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <TextInput
          value={costo}
          onChangeText={setCosto}
          placeholder="Costo"
          placeholderTextColor="#94a3b8"
          keyboardType="numeric"
          style={styles.input}
        />

        <Button
          title="Agregar"
          onPress={agregar}
        />
      </View>

      <FlatList
        data={ramos}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyState}>
            Todavía no hay ramos registrados.
          </Text>
        }
        renderItem={renderRamoItem}
      />
    </View>
  );
}

const renderRamoItem = ({
  item,
}: {
  item: { nombre: string; costo: number };
}) => (
  <View style={styles.item}>
    <Text style={styles.itemText}>
      {item.nombre} - ${item.costo}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
    paddingTop: 60,
    gap: 18,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  subtitle: {
    color: '#64748b',
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  title: {
    color: '#0f172a',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 4,
  },

  logoutButton: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
  },

  logoutText: {
    color: '#f8fafc',
    fontWeight: '700',
  },

  formCard: {
    backgroundColor: '#e2e8f0',
    borderRadius: 20,
    padding: 16,
    gap: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },

  input: {
    borderWidth: 1,
    borderColor: '#94a3b8',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#0f172a',
    backgroundColor: '#f8fafc',
  },

  list: {
    gap: 12,
    paddingBottom: 24,
  },

  item: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  itemText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '600',
  },

  emptyState: {
    color: '#64748b',
    textAlign: 'center',
    paddingVertical: 24,
  },
});