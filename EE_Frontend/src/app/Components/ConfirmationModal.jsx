import React, { useState, useEffect, useRef } from 'react';
import { AlertTriangle, X, Check } from 'lucide-react';

const TYPE_STYLES = {
  danger: {
    iconColor: 'text-red-500',
    confirmBg: 'bg-red-600 hover:bg-red-700',
    borderColor: 'border-red-200',
  },
  info: {
    iconColor: 'text-blue-500',
    confirmBg: 'bg-blue-600 hover:bg-blue-700',
    borderColor: 'border-blue-200',
  },
  warning: {
    iconColor: 'text-yellow-500',
    confirmBg: 'bg-yellow-600 hover:bg-yellow-700',
    borderColor: 'border-yellow-200',
  },
};

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirmar Acción',
  message = '¿Estás seguro de que deseas continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'warning',
}) => {
  const styles = TYPE_STYLES[type] ?? TYPE_STYLES.warning;
  const [shouldRender, setShouldRender] = useState(isOpen);
  const [animateIn, setAnimateIn] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    let enterTimer, exitTimer;
    if (isOpen) {
      setShouldRender(true);
      enterTimer = setTimeout(() => setAnimateIn(true), 10);
    } else {
      setAnimateIn(false);
      exitTimer = setTimeout(() => setShouldRender(false), 300);
    }
    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [isOpen]);

  if (!shouldRender) return null;

  const transitionClass = 'transition-all duration-300 ease-in-out';
  const overlayClasses = `${transitionClass} ${animateIn ? 'opacity-100' : 'opacity-0'}`;
  const modalClasses = `${transitionClass} ${animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`;

  return (
    <div
      className={`fixed inset-0 bg-[rgba(0,0,0,0.7)] flex items-center justify-center z-50 ${overlayClasses}`}
      onClick={(e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
      }}
    >
      <div
        ref={modalRef}
        className={`bg-white rounded-lg shadow-xl max-w-md w-full mx-4 ${modalClasses}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between p-4 border-b ${styles.borderColor}`}>
          <div className="flex items-center space-x-3">
            <AlertTriangle className={`w-6 h-6 ${styles.iconColor}`} />
            <p className="text-lg font-semibold text-gray-900">{title}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer" aria-label="Cerrar">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 text-sm text-gray-700">{message}</div>
        <div className="flex justify-end space-x-3 p-4 bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 text-sm text-white rounded-md ${styles.confirmBg} cursor-pointer`}
          >
            <Check className="w-4 h-4 inline mr-1" />
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

const useConfirmation = () => {
  const [config, setConfig] = useState({ isOpen: false });

  const showConfirmation = (customConfig = {}) =>
    new Promise((resolve) => {
      setConfig({
        ...customConfig,
        isOpen: true,
        onConfirm: () => {
          setConfig((c) => ({ ...c, isOpen: false }));
          resolve(true);
        },
        onClose: () => {
          setConfig((c) => ({ ...c, isOpen: false }));
          resolve(false);
        },
      });
    });

  const ConfirmationComponent = () => (
    <ConfirmationModal {...config} onConfirm={config.onConfirm} onClose={config.onClose} />
  );

  return { showConfirmation, ConfirmationComponent };
};

export { ConfirmationModal, useConfirmation };
