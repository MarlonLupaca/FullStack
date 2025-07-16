'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Cargar productos desde localStorage al iniciar
  useEffect(() => {
    const stored = localStorage.getItem('cart-products');
    if (stored) {
      setProducts(JSON.parse(stored));
    }
  }, []);

  const clearCart = () => {
    setProducts([]);
  };

  // Guardar en localStorage cada vez que cambien los productos
  useEffect(() => {
    localStorage.setItem('cart-products', JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    setProducts((prev) => {
      // Usar 'code' en lugar de 'id' para la comparación
      const existing = prev.find((p) => p.code === newProduct.code);
      if (existing) {
        return prev.map((p) =>
          p.code === newProduct.code ? { ...p, quantity: (p.quantity || 0) + (newProduct.quantity || 1) } : p
        );
      }
      return [...prev, { ...newProduct, quantity: newProduct.quantity || 1 }]; // Asegurar que la cantidad esté definida
    });
  };

  const removeProduct = (code) => {
    // Usar 'code' en lugar de 'id' para la filtración
    setProducts((prev) => prev.filter((p) => p.code !== code));
    console.log('Producto eliminado con code:', code);
  };

  const updateProductQuantity = (code, quantity) => {
    // Usar 'code' en lugar de 'id' para la actualización
    setProducts((prev) =>
      prev.map((product) => (product.code === code ? { ...product, quantity: parseInt(quantity, 10) || 1 } : product))
    );
    console.log('Cantidad actualizada para producto con code:', code);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, removeProduct, updateProductQuantity, clearCart }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
