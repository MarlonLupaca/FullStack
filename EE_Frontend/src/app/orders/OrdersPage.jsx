'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { Clock, CheckCircle, Package, X } from 'lucide-react';
import Link from 'next/link';
import { pdf } from '@react-pdf/renderer';
import API_BASE_URL from '../config/apiConfig';
import ActiveOrderCard from './ActiveOrderCard';
import DeliveredOrdersTable from './DeliveredOrdersTable';
import RootGreenReceipt from './RootGreenReceipt';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      if (!token) return router.push('/login');

      let decoded;
      try {
        decoded = jwtDecode(token);
      } catch {
        return router.push('/login');
      }

      const userCode = decoded?.userCode;
      if (!userCode) return router.push('/login');

      try {
        const response = await axios.get(`${API_BASE_URL}/invoices/by-user/${userCode}`);
        setOrders(response.data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar tus pedidos. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  const downloadPDF = async (order) => {
    const blob = await pdf(<RootGreenReceipt order={order} />).toBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `boleta_${order.seriesNumber}.pdf`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const latestOrder = useMemo(() => {
    return orders.reduce(
      (latest, current) => (new Date(current.issuedAt) > new Date(latest.issuedAt) ? current : latest),
      orders[0] || null
    );
  }, [orders]);

  const activeCards = useMemo(() => {
    if (!latestOrder) return [];
    const others = orders.filter((o) => o.estate === 'procesando' && o.seriesNumber !== latestOrder.seriesNumber);
    return [latestOrder, ...others];
  }, [orders, latestOrder]);

  const deliveredOrders = useMemo(() => {
    return orders
      .filter((order) => order.estate === 'entregado')
      .sort((a, b) => new Date(b.issuedAt) - new Date(a.issuedAt));
  }, [orders]);

  const NoOrdersMessage = () => (
    <div className="text-center py-12">
      <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h3 className="text-xl font-medium text-gray-900 mb-2">No tienes pedidos aún</h3>
      <p className="text-gray-600">Cuando realices tu primera compra, aparecerá aquí.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[url(/back/fondo_pedidos.svg)] bg-cover bg-no-repeat bg-center p-6 relative py-10">
      <div className="max-w-7xl mx-auto">
        <div className="absolute top-6 right-6">
          <Link href="/products">
            <button className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300">
              <X className="w-6 h-6" />
            </button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mis Pedidos</h1>
          <p className="text-gray-600 mt-2">
            {orders.length > 0
              ? `Bienvenido ${orders[0]?.customer?.firstName}, aquí puedes ver el estado de tus pedidos`
              : 'Aquí puedes ver el estado de tus pedidos'}
          </p>
        </div>

        {loading && <p className="text-gray-600">Cargando pedidos...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <>
            {activeCards.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                  <Clock className="w-6 h-6 mr-2 text-teal-500" />
                  Pedidos
                </h2>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                  {activeCards.map((order, index) => (
                    <div key={order.seriesNumber} className="w-full">
                      <ActiveOrderCard
                        order={order}
                        onDownloadPDF={downloadPDF}
                        showProgressBar={order.estate === 'procesando'}
                        isLatest={index === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
                Historial de Pedidos
              </h2>
              <DeliveredOrdersTable orders={deliveredOrders} onDownloadPDF={downloadPDF} />
            </div>
          </>
        )}

        {!loading && !error && orders.length === 0 && <NoOrdersMessage />}
      </div>
    </div>
  );
};

export default OrdersPage;
