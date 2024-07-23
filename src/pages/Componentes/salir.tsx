import React from 'react';
import { useRouter } from 'next/router';

const Salir: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/');
  };
// para salir como es poco no quise ponerle componentes de Bootstrap y por tiempo F
  return (
    <div>
      <h1>Salir</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Salir;