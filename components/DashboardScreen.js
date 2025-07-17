import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, Image, ActivityIndicator } from 'react-native';

export default function DashboardScreen({ setIsLoggedIn, storage }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    if (typeof localStorage !== 'undefined') {
      await storage.setItem('isLoggedIn', 'true');
    } else {
      await storage.removeItem('isLoggedIn');
    }
    setIsLoggedIn(false);
  };

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10')
      .then(res => res.json())
      .then(async (json) => {
        const detailed = await Promise.all(
          json.results.map(async (poke) => {
            const res = await fetch(poke.url);
            return res.json();
          })
        );
        setData(detailed);
        setLoading(false);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.sprites.front_default }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );
  return (
  <View style={styles.container}>
    <View style={styles.topBar}>
      <Text style={styles.header}>Pokémon Dashboard</Text>
      <Button title="Logout" onPress={logout} />
    </View>

    <FlatList
      data={data}
      keyExtractor={(item) => item.name}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  </View>
);
}

const styles = StyleSheet.create({
    topBar: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 20,
},
  container: { flex: 1, padding: 20, paddingTop: 50 },
  header: { fontSize: 22, textAlign: 'center', marginBottom: 20 },
  list: { paddingBottom: 20 },
  card: { borderWidth: 1, borderRadius: 10, padding: 15, marginBottom: 15, alignItems: 'center' },
  image: { width: 80, height: 80 },
  name: { marginTop: 10, textTransform: 'capitalize' },
});
