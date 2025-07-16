'use client';
import React, { useState } from "react";
import TablesParameters from "../admin/components_admin/TableGeneral";
import ButtonAdaptable from "../admin/components_admin/ButtonAdaptable"; 
import ModalConfirmacion from "../admin/components_admin/Modal"; 
import { notify } from "../admin/components_admin/Notify";  
import { ToastContainer } from "react-toastify";  
import SearchBar from '../admin/components_admin/SearchBar'; 

export default function TablesPage() {
  const tablesData = [
    {
      title: "Tabla 1: Usuarios",
      columns: [
        { headerName: "ID", field: "id" },
        { headerName: "Nombre", field: "name" },
        { headerName: "Edad", field: "age" },
      ],
      data: [
        { id: 1, name: "Ana", age: 25 },
        { id: 2, name: "Luis", age: 30 },
        { id: 3, name: "Carlos", age: 22 },
        { id: 4, name: "Laura", age: 28 },
        { id: 5, name: "Marta", age: 32 },
        { id: 6, name: "Juan", age: 40 },
      ],
    },
    {
      title: "Tabla 2: Productos",
      columns: [
        { headerName: "Código", field: "code" },
        { headerName: "Producto", field: "product" },
        { headerName: "Precio", field: "price" },
        { headerName: "Stock", field: "stock" },
      ],
      data: [
        { code: "P01", product: "Camiseta", price: "$15", stock: 120 },
        { code: "P02", product: "Pantalón", price: "$30", stock: 85 },
        { code: "P03", product: "Chaqueta", price: "$50", stock: 40 },
        { code: "P04", product: "Zapatos", price: "$40", stock: 60 },
      ],
    },
    {
      title: "Tabla 3: Cursos",
      columns: [
        { headerName: "Curso", field: "course" },
        { headerName: "Profesor", field: "teacher" },
        { headerName: "Duración (hrs)", field: "duration" },
      ],
      data: [
        { course: "React", teacher: "Elena", duration: 40 },
        { course: "Node.js", teacher: "Carlos", duration: 35 },
        { course: "Python", teacher: "Sofía", duration: 45 },
        { course: "JavaScript", teacher: "Juan", duration: 50 },
      ],
    },
    {
      title: "Tabla 4: Ciudades",
      columns: [
        { headerName: "Ciudad", field: "city" },
        { headerName: "País", field: "country" },
      ],
      data: [
        { city: "Buenos Aires", country: "Argentina" },
        { city: "Madrid", country: "España" },
        { city: "Santiago", country: "Chile" },
        { city: "Bogotá", country: "Colombia" },
      ],
    },
    {
      title: "Tabla 5: Ventas",
      columns: [
        { headerName: "Vendedor", field: "seller" },
        { headerName: "Cliente", field: "client" },
        { headerName: "Monto", field: "amount" },
        { headerName: "Fecha", field: "date" },
      ],
      data: [
        { seller: "Lucas", client: "Empresa A", amount: "$500", date: "2024-10-01" },
        { seller: "Marta", client: "Empresa B", amount: "$1,200", date: "2024-10-03" },
        { seller: "Julián", client: "Empresa C", amount: "$300", date: "2024-10-05" },
      ],
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 

  const openModal = (modalType) => {
    setIsModalOpen(modalType);
  };

  const closeModal = () => {
    setIsModalOpen(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query); 
  };

  const getFilteredData = (tableData) => {
    if (!searchQuery) return tableData; 
    const lowerCaseQuery = searchQuery.toLowerCase();
    return tableData.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(lowerCaseQuery)
      )
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-center text-2xl font-semibold mb-4">Ejemplos de Tablas</h1>

        <ToastContainer />  

        {/* Sección de Botones */}
        <section className="mb-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Variantes de Botones</h2>
          
          <div className="space-y-1">
            {/* Botón Aceptar (Primary) */}
            <ButtonAdaptable
              label="Aceptar"
              onClick={() => openModal("accept")}
              variant="primary"
              size="md"
            />

            {/* Botón Cancelar (Cancel) */}
            <ButtonAdaptable
              label="Cancelar"
              onClick={() => openModal("cancel")}
              variant="cancel"
              size="md"
            />

            {/* Botón de Éxito (Success) */}
            <ButtonAdaptable
              label="Éxito"
              onClick={() => openModal("success")}
              variant="success"
              size="md"
            />

            {/* Botón de Peligro (Danger) */}
            <ButtonAdaptable
              label="Peligro"
              onClick={() => openModal("danger")}
              variant="danger"
              size="md"
            />

            {/* Botón de Notificación */}
            <ButtonAdaptable
              label="Noticificación"
              onClick={() => openModal("Notificacion correctamente realizada")}
              variant="primary"
              size="md"
            />
          </div>
        </section>

        {/* Sección de Búsqueda */}
        <section className="mb-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Búsqueda Global</h2>
          <SearchBar onSearch={handleSearch} /> 
        </section>

        {/* Modales */}
        {isModalOpen && (
          <ModalConfirmacion
            isOpen={isModalOpen !== null}
            onClose={closeModal}
            onConfirm={() => {
              console.log(`Acción ${isModalOpen} confirmada`);
              notify(
                `Acción ${isModalOpen} realizada con éxito.`,
                isModalOpen === "accept" ? "default" :
                isModalOpen === "cancel" ? "error" :
                isModalOpen === "success" ? "default" :
                isModalOpen === "danger" ? "error" :
                isModalOpen === "newAction" ? "default" : "default"
              );
              closeModal();
            }}
            message={`¿Estás seguro de que deseas realizar esta acción?`}
            title={`Confirmación: ${isModalOpen.charAt(0).toUpperCase() + isModalOpen.slice(1)}`}
          />
        )}

        {/* Renderizar las tablas con los datos filtrados */}
        {tablesData.map((table, index) => (
          <div key={index} className="mb-5">
            <h4 className="text-xl font-semibold">{table.title}</h4>
            <TablesParameters 
              columns={table.columns} 
              data={getFilteredData(table.data)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
