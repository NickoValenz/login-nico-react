import React from 'react';
import Link from 'next/link';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1>Bienvenido al Menu de opciones de admin Firefox</h1>
      <nav>
        <ul>
          <li><Link href="/Componentes/RegistrarUsuario">Registrar nuevo usuario</Link></li>
          <li><Link href="/Componentes/RegistrarColaborador">Registrar usuario colaborador de Firefox</Link></li>
          <li><Link href="/Componentes/VisualizarRegistros">Visualizar los registros</Link></li>
          <li><Link href="/Componentes/salir">Salir</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardPage;