import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/DashboardScreen';
import getStorage from './getStorage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [storage, setStorage] = useState(null);

  useEffect(() => {
    (async () => {
      const storageImpl = await getStorage();
      const isLogged = await storageImpl.getItem('isLoggedIn');
      setStorage(storageImpl);
      setIsLoggedIn(isLogged === 'true');
      setLoading(false);
    })();
  }, []);

  if (loading || !storage) return <View><ActivityIndicator size="large" /></View>;

  return isLoggedIn
    ? <DashboardScreen setIsLoggedIn={setIsLoggedIn} storage={storage} />
    : <LoginScreen setIsLoggedIn={setIsLoggedIn} storage={storage} />;
}
