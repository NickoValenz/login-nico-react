import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { db } from '../../Firebase/Firebase';
import { collection, addDoc } from 'firebase/firestore';
//se declaran los campos que tendria el colaborador
const RegistrarColaborador: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoColaborador, setTipoColaborador] = useState('Desarrollador');
  const [error, setError] = useState('');
//se mandan los datos a la coleccion colaboradores en firebase para su registro
  const handleRegistrar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'colaboradores'), {
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        telefono: telefono,
        tipoColaborador: tipoColaborador,
      });
      alert('Colaborador registrado exitosamente');
    } catch (error: any) {
      setError('Error al registrar el colaborador. Intenta de nuevo.');
    }
  };

  return (
    <Container>
      <h2 className="my-4">Registrar Colaborador</h2>
      <Form onSubmit={handleRegistrar}>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa el nombre"
          />
        </Form.Group>

        <Form.Group controlId="formApellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            placeholder="Ingresa el apellido"
          />
        </Form.Group>

        <Form.Group controlId="formCorreo">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Ingresa el correo"
          />
        </Form.Group>

        <Form.Group controlId="formTelefono">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ingresa el telefono"
          />
        </Form.Group>

        <Form.Group controlId="formTipoColaborador">
          <Form.Label>Tipo de Colaborador</Form.Label>
          <Form.Select
            value={tipoColaborador}
            onChange={(e) => setTipoColaborador(e.target.value)}
          >
            <option value="Desarrollador">Desarrollador</option>
            <option value="Soporte">Soporte</option>
          </Form.Select>
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}

        <Button variant="primary" type="submit">
          Registrar
        </Button>
      </Form>
    </Container>
  );
};

export default RegistrarColaborador;