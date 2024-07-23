import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { db } from '../../Firebase/Firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const VisualizarRegistros: React.FC = () => {
  const [colaboradores, setColaboradores] = useState<any[]>([]);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [colaboradorSeleccionado, setColaboradorSeleccionado] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    const obtenerColaboradores = async () => {
      const querySnapshot = await getDocs(collection(db, 'colaboradores'));
      const datosColaboradores = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setColaboradores(datosColaboradores);
    };

    obtenerColaboradores();
  }, []);
// aqui se ve la logica del boton eliminar y se pone el modal "inactivo"
  const handleEliminar = async () => {
    if (colaboradorSeleccionado) {
      await deleteDoc(doc(db, 'colaboradores', colaboradorSeleccionado.id));
      setMostrarModalEliminar(false);
      setColaboradorSeleccionado(null);
      // Manda una señal para que recarge los datos
      const querySnapshot = await getDocs(collection(db, 'colaboradores'));
      const datosColaboradores = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setColaboradores(datosColaboradores);
    }
  };

  const handleActualizar = (colaborador: any) => {
    router.push({
      pathname: '/Componentes/ActualizarColaborador',
      query: { 
        id: colaborador.id,
        nombre: colaborador.nombre,
        apellido: colaborador.apellido,
        correo: colaborador.correo,
        telefono: colaborador.telefono,
        tipoColaborador: colaborador.tipoColaborador 
      }
    });
  };
// aqui se activa el modal preguntandole si quiere eliminarlo o no
  const confirmarEliminar = (colaborador: any) => {
    setColaboradorSeleccionado(colaborador);
    setMostrarModalEliminar(true);
  };

  return (
    <div>
      <h2>Colaboradores Registrados</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Tipo de Colaborador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {colaboradores.map(colaborador => (
            <tr key={colaborador.id}>
              <td>{colaborador.nombre}</td>
              <td>{colaborador.apellido}</td>
              <td>{colaborador.correo}</td>
              <td>{colaborador.telefono}</td>
              <td>{colaborador.tipoColaborador}</td>
              <td>
                <Button variant="warning" onClick={() => handleActualizar(colaborador)}>Actualizar</Button>
                <Button variant="danger" onClick={() => confirmarEliminar(colaborador)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={mostrarModalEliminar} onHide={() => setMostrarModalEliminar(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas eliminar al colaborador?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMostrarModalEliminar(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminar}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default VisualizarRegistros;