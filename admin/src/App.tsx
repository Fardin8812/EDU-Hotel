import React from 'react';
import { Layout } from './components/Layout';
import { Bookings } from './pages/Bookings';
import { useAuthStore } from './store/authStore';

export default function App() {
  const { initialize } = useAuthStore();

  React.useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <>
      <Bookings />
    </>
    
  );
}