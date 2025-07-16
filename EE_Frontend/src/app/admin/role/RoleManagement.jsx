'use client';

import React, { useState, useEffect } from 'react';
import { Search, Users, Shield, Eye, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '@/app/config/apiConfig';
import toast from 'react-hot-toast';
import { useConfirmation } from '@/app/Components/ConfirmationModal';

const RoleManagement = () => {
  const { showConfirmation, ConfirmationComponent } = useConfirmation();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('Todos los roles');
  const [users, setUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [errorLoadingUsers, setErrorLoadingUsers] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Los roles disponibles para la interfaz, fijados en el frontend
  const availableRoles = ['Todos los roles', 'ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_USER'];
  const selectableRoles = availableRoles.filter((role) => role !== 'Todos los roles'); // Roles para asignar

  // Mapeo de colores para los roles definidos
  const roleColors = {
    ROLE_ADMIN: 'bg-red-100 text-red-800 border-red-200',
    ROLE_EMPLOYEE: 'bg-blue-100 text-blue-800 border-blue-200',
    ROLE_USER: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  // Colores para el estado Activo/Inactivo
  const statusColors = {
    Activo: 'text-green-600',
    Inactivo: 'text-red-600',
  };

  // Función para obtener usuarios de la API
  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    setErrorLoadingUsers(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setErrorLoadingUsers('Error al cargar los datos de usuarios. Intente de nuevo.');
      setUsers([]);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  // Función para alternar el estado activo/inactivo de un usuario
  const toggleUserStatus = async (userCode) => {
    const confirmed = await showConfirmation({
      title: 'Desactivar el usuario',
      message: '¿Estás seguro de que deseas desactivar el usuario?',
      type: 'danger',
    });

    if (confirmed) {
      try {
        const response = await axios.put(
          `${API_BASE_URL}/auth/users/toggle/${userCode}`,
          {},
          {
            headers: {
              'Content-Type': 'text/plain',
            },
            responseType: 'text',
          }
        );

        if (response.status >= 200 && response.status < 300) {
          setUsers((prevUsers) =>
            prevUsers.map((user) => (user.userCode === userCode ? { ...user, active: !user.active } : user))
          );
          toast.success('Successfully toasted!');
        } else {
          setNotification({
            message: `Error al alternar estado: ${response.data || 'Respuesta inesperada del servidor.'}`,
            type: 'error',
          });
        }
      } catch (error) {
        console.error('Error al alternar estado del usuario:', error);
        setNotification({
          message: `No se pudo actualizar el estado del usuario. Error: ${error.message}`,
          type: 'error',
        });
      } finally {
        setTimeout(() => setNotification({ message: '', type: '' }), 5000);
      }

      // await deleteProductAPI(productId);
    } else {
      console.log('Eliminación cancelada');
    }
  };

  // NUEVA FUNCIÓN: Para asignar un rol a un usuario
  const assignUserRole = async (userCode, newRoleName) => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/auth/users/${userCode}/assign-role`,
        { roleName: newRoleName }, // El cuerpo de la solicitud JSON con roleName
        {
          headers: {
            'Content-Type': 'application/json', // Indicar que enviamos JSON
          },
        }
      );

      // Asumimos que la respuesta del backend es JSON con un mensaje
      if (response.status >= 200 && response.status < 300) {
        // Actualiza el rol del usuario en el estado local después de un éxito en la API
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.userCode === userCode ? { ...user, rol: newRoleName } : user))
        );
        setNotification({
          message: response.data.message || `Rol ${newRoleName} asignado correctamente.`,
          type: 'success',
        });
      } else {
        setNotification({
          message: `Error al asignar rol: ${response.data.message || 'Respuesta inesperada del servidor.'}`,
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error al asignar rol del usuario:', error);
      const errorMessage = error.response?.data?.message || error.message || 'No se pudo asignar el rol.';
      setNotification({ message: `Error: ${errorMessage}`, type: 'error' });
    } finally {
      setTimeout(() => setNotification({ message: '', type: '' }), 5000);
    }
  };

  // Ejecutar fetchUsers al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtrado de usuarios basado en la búsqueda y el rol seleccionado
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.userCode?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = selectedRole === 'Todos los roles' || user.rol === selectedRole;
    return matchesSearch && matchesRole;
  });

  // Estadísticas de roles
  const roleStats = {
    total: users.length,
    active: users.filter((u) => u.active === true).length,
    admin: users.filter((u) => u.rol === 'ROLE_ADMIN').length,
    moderators: users.filter((u) => u.rol === 'ROLE_EMPLOYEE').length,
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ConfirmationComponent />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Administración de Roles</h1>
        <p className="text-gray-600">Gestiona los roles y permisos de todos los usuarios del sistema</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por nombre de usuario o ID..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white min-w-48"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            {availableRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Total Usuarios</h3>
              <p className="text-3xl font-bold text-gray-900">{roleStats.total}</p>
            </div>
            <div className="bg-teal-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Usuarios Activos</h3>
              <p className="text-3xl font-bold text-green-600">{roleStats.active}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Administradores</h3>
              <p className="text-3xl font-bold text-red-600">{roleStats.admin}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Empleados</h3>
              <p className="text-3xl font-bold text-blue-600">{roleStats.moderators}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Usuario
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Rol Actual
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Asignar Rol
                </th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-500 uppercase tracking-wider flex justify-center">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoadingUsers ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500 text-lg">
                    Cargando datos de usuarios...
                  </td>
                </tr>
              ) : errorLoadingUsers ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-red-500 text-lg">
                    {errorLoadingUsers}
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500 text-lg">
                    No se encontraron usuarios que coincidan con la búsqueda o no hay usuarios disponibles.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.userCode} className="hover:bg-gray-50">
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{user.username || 'N/A'}</div>
                        <div className="text-xs text-gray-400">ID: {user.userCode || 'N/A'}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full border ${
                          roleColors[user.rol] || 'bg-gray-100 text-gray-800 border-gray-200'
                        }`}
                      >
                        {user.rol || 'N/A'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`text-sm font-medium ${statusColors[user.active ? 'Activo' : 'Inactivo']}`}>
                        ● {user.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-wrap gap-1">
                        {' '}
                        {/* Flexbox para los botones de rol */}
                        {selectableRoles.map((role) => (
                          <button
                            key={role}
                            className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors
                                        ${
                                          user.rol === role // Si el rol actual es este, resalta
                                            ? 'bg-teal-600 text-white border-teal-700'
                                            : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                                        }
                                        ${
                                          user.rol === role ? 'cursor-default' : ''
                                        } {/* No se puede re-asignar el mismo rol */}
                                    `}
                            onClick={() => assignUserRole(user.userCode, role)}
                            disabled={user.rol === role} // Deshabilita el botón si es el rol actual
                          >
                            {role.replace('ROLE_', '')} {/* Muestra el nombre del rol más limpio */}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-6 flex justify-center">
                      <div className="flex items-center space-x-2">
                        <button
                          className="p-1 text-gray-400 hover:text-teal-600 transition-colors"
                          onClick={() => toggleUserStatus(user.userCode)}
                        >
                          {user.active ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">
            Mostrando {filteredUsers.length} de {users.length} usuarios
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
              Anterior
            </button>
            <button className="px-3 py-1 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors">
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement;
