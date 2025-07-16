import { Trash } from 'lucide-react';

const DeleteConfirmation = ({ currentEvent, confirmDelete, setShowDelete }) => {
  return (
    <div className="fixed inset-0 bg-gray-900/60 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <div className="flex items-center justify-center text-red-500 mb-4">
          <Trash size={40} />
        </div>

        <h3 className="text-xl font-semibold text-center mb-2">¿Eliminar este evento?</h3>

        <p className="text-gray-600 text-center mb-6">
          ¿Estás seguro de que deseas eliminar el evento "{currentEvent?.title}"? Esta acción no se puede deshacer.
        </p>

        <div className="flex justify-center space-x-3">
          <button
            onClick={() => setShowDelete(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
