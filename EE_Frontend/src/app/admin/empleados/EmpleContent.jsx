'use client';

import { useState, useEffect } from 'react';
import EmpleHeader from './EmpleHeader';
import EmpleSearch from './EmpleSearch';
import EmpleStats from './EmpleStats';
import EmpleTable from './EmpleTable';
import EditarEmpleModal from './EditarEmpleModal';
import axios from 'axios';
import API_BASE_URL from '@/app/config/apiConfig';

const ClientesContent = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [estadoFilter, setEstadoFilter] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingClient, setEditingClient] = useState(null); // Estado para el cliente en edición
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

  const fetchClientes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orchestrator/clients`);

      const rolesPermitidos = ['ROLE_EMPLOYEE'];
      const clientesFiltrados = response.data.filter((cliente) => rolesPermitidos.includes(cliente.rol));

      setClientes(clientesFiltrados);
      console.log(clientesFiltrados);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  // Filtrar clientes por estado y búsqueda
  const filteredClientes = clientes.filter((cliente) => {
    const matchesEstado = estadoFilter === 'todos' || (cliente.active ? 'activo' : 'inactivo') === estadoFilter;
    const matchesSearch =
      cliente.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.usercode?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesEstado && matchesSearch;
  });

  const openEditModal = (cliente) => {
    setEditingClient(cliente);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditingClient(null);
    setIsEditModalOpen(false);
  };

  const updateClient = async (updatedData) => {
    try {
      if (editingClient) {
        const response = await axios.put(`${API_BASE_URL}/customers/update/${editingClient.usercode}`, updatedData);
        // Actualizar el estado local de clientes
        const updatedClientes = clientes.map((c) =>
          c.usercode === editingClient.usercode ? { ...c, ...response.data } : c
        );
        setClientes(updatedClientes);
        closeEditModal();
        fetchClientes();
        // Opcional: Mostrar mensaje de éxito
      }
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      // Opcional: Mostrar mensaje de error
    }
  };

  if (loading) {
    return <div>Cargando empleados...</div>;
  }

  if (error) {
    return <div>Error al cargar los empleados: {error.message}</div>;
  }

  return (
    <div className="p-6 h-full bg-tertiary overflow-y-auto">
      <EmpleHeader />
      <EmpleSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        estadoFilter={estadoFilter}
        setEstadoFilter={setEstadoFilter}
      />
      <EmpleStats clientes={clientes} />
      <EmpleTable
        filteredClientes={filteredClientes}
        totalClientes={clientes.length}
        onEditClient={openEditModal}
        fetchClientes={fetchClientes}
      />

      {isEditModalOpen && editingClient && (
        <EditarEmpleModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          client={editingClient}
          onUpdate={updateClient}
        />
      )}
    </div>
  );
};

export default ClientesContent;
