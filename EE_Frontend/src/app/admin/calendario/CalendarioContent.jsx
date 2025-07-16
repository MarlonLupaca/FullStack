'use client';

import { useEffect, useState, useCallback } from 'react'; // Agregamos useCallback
import { Plus, Search } from 'lucide-react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import EventModal from './EventModal';
import EventList from './EventList';
import DeleteConfirmation from './DeleteConfirmation';
import EventStats from './EventStats';
import EventTable from './EventTable';
// Importamos las funciones de la API
import { getAllEvents, createEvent, updateEvent, updateEventStatus, deleteEvent } from './eventApi'; // Ajusta la ruta si es necesario

const CalendarioContent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newEvent, setNewEvent] = useState({
    id: null,
    title: '',
    description: '',
    date: '',
    time: '',
    status: 'Activo',
  });

  // Función para cargar eventos desde la API
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error('No se pudieron cargar los eventos:', error);
      // Aquí podrías mostrar un mensaje de error al usuario
    } finally {
      setLoading(false);
    }
  }, []); // El array vacío asegura que esta función se memorice y no cambie en cada render

  // Cargar eventos al montar el componente
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]); // Incluimos fetchEvents como dependencia

  const handleAddEvent = () => {
    setIsEditing(false);
    // Generar un ID temporal, el backend generará el definitivo
    setNewEvent({
      id: `TEMP-${Date.now()}`, // ID temporal para el formulario
      title: '',
      description: '',
      date: selectedDate.toISOString().split('T')[0],
      time: '12:00',
      status: 'Activo',
    });
    setShowModal(true);
  };

  const handleEditEvent = (event) => {
    setIsEditing(true);
    setCurrentEvent(event);
    setNewEvent({ ...event }); // Copia los datos del evento para editar
    setShowModal(true);
  };

  const handleDeleteEvent = (event) => {
    setCurrentEvent(event);
    setShowDelete(true);
  };

  const confirmDelete = async () => {
    if (currentEvent && currentEvent.id) {
      try {
        await deleteEvent(currentEvent.id);
        fetchEvents(); // Recargar la lista de eventos después de eliminar
        setShowDelete(false);
      } catch (error) {
        console.error('Error al eliminar el evento:', error);
        // Manejar error, quizás mostrar una notificación
      }
    }
  };

  const handleSaveEvent = async (eventData) => {
    try {
      let savedEvent;
      if (isEditing) {
        // Llama al endpoint PUT para actualizar
        savedEvent = await updateEvent(eventData.id, eventData);
      } else {
        // Llama al endpoint POST para crear
        savedEvent = await createEvent(eventData);
      }
      fetchEvents(); // Recargar la lista de eventos después de guardar/actualizar
      setShowModal(false);
    } catch (error) {
      console.error('Error al guardar el evento:', error);
      // Manejar error, quizás mostrar una notificación
    }
  };

  const toggleEventStatus = async (id) => {
    const eventToUpdate = events.find((e) => e.id === id);
    if (!eventToUpdate) return;

    const newStatus = eventToUpdate.status === 'Activo' ? 'Inactivo' : 'Activo';
    try {
      // Llama al endpoint PATCH para actualizar el estado
      await updateEventStatus(id, newStatus);
      fetchEvents(); // Recargar la lista de eventos para reflejar el cambio
    } catch (error) {
      console.error('Error al cambiar el estado del evento:', error);
      // Manejar error
    }
  };

  const filteredEvents = events.filter(
    (e) =>
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: events.length,
    active: events.filter((e) => e.status === 'Activo').length,
    upcoming: events.filter((e) => new Date(e.date) >= new Date()).length,
  };

  return (
    <div className="bg-tertiary rounded-lg shadow-sm">
      <div className="p-6 pt-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Administración de Eventos</h2>
        <p className="text-gray-600 mb-6">Gestiona todos los eventos y actividades programadas</p>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por título o descripción"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          <button
            onClick={handleAddEvent}
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Plus size={18} className="mr-2" />
            Nuevo Evento
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-500 py-8">Cargando eventos...</div>
        ) : (
          <>
            <EventStats {...stats} />
            <EventTable
              events={filteredEvents}
              handleEdit={handleEditEvent}
              handleToggle={toggleEventStatus}
              handleDelete={handleDeleteEvent}
            />

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              <div className="lg:col-span-3">
                <CalendarHeader
                  currentMonth={currentMonth}
                  prevMonth={() =>
                    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
                  }
                  nextMonth={() =>
                    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
                  }
                />
                <CalendarGrid
                  currentMonth={currentMonth}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  events={events}
                />
              </div>
              <div className="lg:col-span-2">
                <EventList
                  events={events}
                  selectedDate={selectedDate}
                  handleEditEvent={handleEditEvent}
                  handleDeleteEvent={handleDeleteEvent}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {showModal && (
        <EventModal
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          isEditing={isEditing}
          handleSaveEvent={handleSaveEvent}
          setShowModal={setShowModal}
        />
      )}

      {showDelete && (
        <DeleteConfirmation currentEvent={currentEvent} confirmDelete={confirmDelete} setShowDelete={setShowDelete} />
      )}
    </div>
  );
};

export default CalendarioContent;
