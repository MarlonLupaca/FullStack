'use client';

import { useState, useEffect } from 'react';
import ClientesHeader from './ClientesHeader';
import ClientesSearch from './ClientesSearch';
import ClientesStats from './ClientesStats';
import ClientesTable from './ClientesTable';
import EditarClienteModal from './EditarClienteModal'; // Importar el modal
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

      const rolesPermitidos = ['ROLE_USER'];
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
    return <div>Cargando clientes...</div>;
  }

  if (error) {
    return <div>Error al cargar los clientes: {error.message}</div>;
  }

  return (
    <div className="p-6 h-full bg-tertiary overflow-y-auto">
      <ClientesHeader />
      <ClientesSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        estadoFilter={estadoFilter}
        setEstadoFilter={setEstadoFilter}
      />
      <ClientesStats clientes={clientes} />
      <ClientesTable
        filteredClientes={filteredClientes}
        totalClientes={clientes.length}
        onEditClient={openEditModal}
        fetchClientes={fetchClientes}
      />

      {isEditModalOpen && editingClient && (
        <EditarClienteModal
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
