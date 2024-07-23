import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { db } from '../../Firebase/Firebase';
import { doc, updateDoc } from 'firebase/firestore';
//establece los datos que va a tener el colaborador y los estados que parten vacios menos el tipo selector
const ActualizarColaborador: React.FC = () => {
  const router = useRouter();
  const { id, nombre, apellido, correo, telefono, tipoColaborador } = router.query;

  const [nombreEstado, setNombreEstado] = useState('');
  const [apellidoEstado, setApellidoEstado] = useState('');
  const [correoEstado, setCorreoEstado] = useState('');
  const [telefonoEstado, setTelefonoEstado] = useState('');
  const [tipoColaboradorEstado, setTipoColaboradorEstado] = useState('Desarrollador');
  const [actualizacionExitosa, setActualizacionExitosa] = useState(false);
// aqui se ponen el tipo de dato que van a tener los campos
  useEffect(() => {
    if (nombre) setNombreEstado(nombre as string);
    if (apellido) setApellidoEstado(apellido as string);
    if (correo) setCorreoEstado(correo as string);
    if (telefono) setTelefonoEstado(telefono as string);
    if (tipoColaborador) setTipoColaboradorEstado(tipoColaborador as string);
  }, [nombre, apellido, correo, telefono, tipoColaborador]);

  const handleActualizar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const colaboradorRef = doc(db, 'colaboradores', id as string);
      await updateDoc(colaboradorRef, {
        nombre: nombreEstado,
        apellido: apellidoEstado,
        correo: correoEstado,
        telefono: telefonoEstado,
        tipoColaborador: tipoColaboradorEstado,
      });
      setActualizacionExitosa(true);
    } catch (error) {
      console.error('Error al actualizar el colaborador:', error);
      alert('Error al actualizar el colaborador. Intenta de nuevo.');
    }
  };

  return (
    <Container>
      <h2 className="my-4">Actualizar Colaborador</h2>
      {actualizacionExitosa && <Alert variant="success">Colaborador actualizado exitosamente.</Alert>}
      <Form onSubmit={handleActualizar}>
        <Form.Group controlId="formNombre">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombreEstado}
            onChange={(e) => setNombreEstado(e.target.value)}
            placeholder="Ingresa el nombre"
          />
        </Form.Group>

        <Form.Group controlId="formApellido">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            value={apellidoEstado}
            onChange={(e) => setApellidoEstado(e.target.value)}
            placeholder="Ingresa el apellido"
          />
        </Form.Group>

        <Form.Group controlId="formCorreo">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            value={correoEstado}
            onChange={(e) => setCorreoEstado(e.target.value)}
            placeholder="Ingresa el correo"
          />
        </Form.Group>

        <Form.Group controlId="formTelefono">
          <Form.Label>Telefono</Form.Label>
          <Form.Control
            type="text"
            value={telefonoEstado}
            onChange={(e) => setTelefonoEstado(e.target.value)}
            placeholder="Ingresa el telefono"
          />
        </Form.Group>

        <Form.Group controlId="formTipoColaborador">
          <Form.Label>Tipo de Colaborador</Form.Label>
          <Form.Select
            value={tipoColaboradorEstado}
            onChange={(e) => setTipoColaboradorEstado(e.target.value)}
          >
            <option value="Desarrollador">Desarrollador</option>
            <option value="Soporte">Soporte</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Actualizar
        </Button>
      </Form>
    </Container>
  );
};

export default ActualizarColaborador;