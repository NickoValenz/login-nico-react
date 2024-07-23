import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { db } from '../../Firebase/Firebase';
import { collection, addDoc } from 'firebase/firestore';
// aqui se declara cuantos campos va a tener el usuario para registrarse
const RegistrarUsuario: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
// aqui manda los valores del nombre y la contraseña a la coleccion en firebase
  const handleRegistrar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'usuarios'), {
        nombre: nombre,
        contrasena: contrasena,
      });
      alert('El usuario se registro bien');
    } catch (error: any) {
      setError('Error al registrar el usuario. Intenta de nuevo.');
    }
  };

  return (
    <Container>
      <h2 className="my-4">Registrar Usuario</h2>
      <Form onSubmit={handleRegistrar}>
        <Form.Group controlId="formBasicNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control 
            type="text" 
            value={nombre} 
            onChange={(e) => setNombre(e.target.value)} 
            placeholder="Ingresa tu nombre" 
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control 
            type="password" 
            value={contrasena} 
            onChange={(e) => setContrasena(e.target.value)} 
            placeholder="Ingresa tu contraseña" 
          />
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}

        <Button variant="primary" type="submit">
          Registrar
        </Button>
      </Form>
    </Container>
  );
};

export default RegistrarUsuario;