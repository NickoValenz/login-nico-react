import { useRouter } from 'next/router';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { db } from '../Firebase/Firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const q = query(
        collection(db, 'usuarios'),
        where('nombre', '==', username),
        where('contrasena', '==', password)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('Credenciales incorrectas. Intentalo de nuevo.');
      } else {
        router.push('/Componentes/DashboardPage');
      }
    } catch (error) {
      setError('Error al iniciar sesion. Intentalo de nuevo.');
    }
  };

  return (
    <div className="container">
      <h1 className="my-4">Inicio de sesion usuarios Firefox</h1>
      <div className="mb-3">
        <label className="form-label">Usuario:</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Contraseña:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleLogin}>
        Iniciar Sesion
      </button>
      {error && <p className="text-danger mt-3">{error}</p>}
    </div>
  );
};

export default LoginPage;