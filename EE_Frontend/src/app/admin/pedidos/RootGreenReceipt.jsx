import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

// Estilos mejorados para un diseño más profesional
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    padding: 0,
    backgroundColor: '#ffffff',
  },

  // Header mejorado con gradiente visual
  headerContainer: {
    backgroundColor: '#0d9488',
    padding: 25,
    marginBottom: 0,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    marginRight: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  logo: {
    width: 180,
    height: 60,
    objectFit: 'contain',
  },

  companyInfo: {
    flexDirection: 'column',
  },

  companyName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 2,
  },

  companySlogan: {
    fontSize: 10,
    color: '#a7f3d0',
    fontStyle: 'italic',
  },

  documentType: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },

  documentTypeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },

  invoiceNumber: {
    fontSize: 14,
    color: '#a7f3d0',
    fontWeight: 'bold',
  },

  // Contenido principal
  content: {
    padding: 30,
  },

  // Info boxes mejoradas
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  infoCard: {
    width: '48%',
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    borderLeft: '4px solid #0d9488',
  },

  cardTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0d9488',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  cardText: {
    fontSize: 10,
    marginBottom: 3,
    color: '#374151',
  },

  cardTextBold: {
    fontSize: 10,
    marginBottom: 3,
    color: '#111827',
    fontWeight: 'bold',
  },

  // Tabla de productos mejorada
  productsSection: {
    marginBottom: 25,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0d9488',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  table: {
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#0d9488',
    padding: 0,
  },

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    minHeight: 40,
  },

  tableRowOdd: {
    backgroundColor: '#f9fafb',
  },

  tableRowEven: {
    backgroundColor: '#ffffff',
  },

  tableColHeader: {
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
  },

  tableCol: {
    padding: 12,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    justifyContent: 'center',
  },

  // Anchos específicos para cada columna
  colProduct: { width: '45%' },
  colQuantity: { width: '15%' },
  colPrice: { width: '20%' },
  colSubtotal: { width: '20%' },

  tableCellHeader: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },

  tableCell: {
    fontSize: 10,
    color: '#374151',
    textAlign: 'center',
  },

  tableCellLeft: {
    fontSize: 10,
    color: '#374151',
    textAlign: 'left',
  },

  productName: {
    fontWeight: 'bold',
    marginBottom: 2,
  },

  productCode: {
    fontSize: 8,
    color: '#6b7280',
  },

  // Sección de totales mejorada
  totalsSection: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  totalLabel: {
    fontSize: 12,
    color: '#374151',
  },

  totalValue: {
    fontSize: 12,
    color: '#374151',
  },

  finalTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderTopColor: '#0d9488',
    paddingTop: 10,
    marginTop: 10,
  },

  finalTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0d9488',
  },

  finalTotalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d9488',
  },

  // Footer
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    textAlign: 'center',
  },

  footerText: {
    fontSize: 9,
    color: '#6b7280',
    marginBottom: 3,
  },

  // Status badge
  statusBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },

  statusText: {
    fontSize: 9,
    color: '#166534',
    fontWeight: 'bold',
  },
});

const RootGreenReceipt = ({ order }) => {
  // Función para obtener el color del estado
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'procesando':
        return { bg: '#fef3c7', text: '#92400e' };
      case 'enviado':
        return { bg: '#dbeafe', text: '#1e40af' };
      case 'entregado':
        return { bg: '#dcfce7', text: '#166534' };
      default:
        return { bg: '#f3f4f6', text: '#374151' };
    }
  };

  const statusColors = getStatusColor(order.estate);

  // Calcular subtotal antes de descuentos si es necesario
  const subtotalBeforeDiscount = order.details.reduce((sum, detail) => sum + detail.subtotal, 0);
  const discountAmount = 0; // Calcular si hay descuentos globales

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header mejorado */}
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <View style={styles.logoSection}>
              <View style={styles.logoContainer}>
                <Image src="/Img/logo_header.png" style={styles.logo} />
              </View>
            </View>
            <View style={styles.documentType}>
              <Text style={styles.documentTypeText}>BOLETA DE VENTA</Text>
              <Text style={styles.invoiceNumber}>{order.seriesNumber}</Text>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* Información en tarjetas */}
          <View style={styles.infoContainer}>
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>Información del Cliente</Text>
              <Text style={styles.cardTextBold}>
                {order.customer.firstName} {order.customer.lastName}
              </Text>
              <Text style={styles.cardText}>Código: {order.customer.userCode}</Text>
              <Text style={styles.cardText}>Email: {order.customer.email}</Text>
              <Text style={styles.cardText}>Teléfono: {order.customer.phone}</Text>
              <Text style={styles.cardText}>Dirección: {order.shippingAddress}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>Detalles del Pedido</Text>
              <Text style={styles.cardText}>
                Fecha:{' '}
                {new Date(order.issuedAt).toLocaleDateString('es-PE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
              <Text style={styles.cardText}>
                Hora:{' '}
                {new Date(order.issuedAt).toLocaleTimeString('es-PE', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Text>
            </View>
          </View>

          {/* Tabla de productos mejorada */}
          <View style={styles.productsSection}>
            <Text style={styles.sectionTitle}>Productos</Text>
            <View style={styles.table}>
              {/* Header de la tabla */}
              <View style={styles.tableHeader}>
                <View style={[styles.tableColHeader, styles.colProduct]}>
                  <Text style={styles.tableCellHeader}>Producto</Text>
                </View>
                <View style={[styles.tableColHeader, styles.colQuantity]}>
                  <Text style={styles.tableCellHeader}>Cant.</Text>
                </View>
                <View style={[styles.tableColHeader, styles.colPrice]}>
                  <Text style={styles.tableCellHeader}>Precio Unit.</Text>
                </View>
                <View style={[styles.tableColHeader, styles.colSubtotal]}>
                  <Text style={styles.tableCellHeader}>Subtotal</Text>
                </View>
              </View>

              {/* Filas de productos */}
              {order.details.map((detail, index) => (
                <View
                  key={detail.id}
                  style={[styles.tableRow, index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}
                >
                  <View style={[styles.tableCol, styles.colProduct]}>
                    <Text style={[styles.tableCellLeft, styles.productName]}>{detail.product.name}</Text>
                    <Text style={[styles.tableCellLeft, styles.productCode]}>Código: {detail.product.code}</Text>
                    {detail.product.discount !== '0%' && (
                      <Text style={[styles.tableCellLeft, styles.productCode]}>
                        Descuento: {detail.product.discount}
                      </Text>
                    )}
                  </View>
                  <View style={[styles.tableCol, styles.colQuantity]}>
                    <Text style={styles.tableCell}>{detail.quantity}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.colPrice]}>
                    <Text style={styles.tableCell}>S/ {detail.unitPrice.toFixed(2)}</Text>
                  </View>
                  <View style={[styles.tableCol, styles.colSubtotal]}>
                    <Text style={styles.tableCell}>S/ {detail.subtotal.toFixed(2)}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Sección de totales */}
          <View style={styles.totalsSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalValue}>S/ {subtotalBeforeDiscount.toFixed(2)}</Text>
            </View>

            {discountAmount > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Descuento:</Text>
                <Text style={styles.totalValue}>- S/ {discountAmount.toFixed(2)}</Text>
              </View>
            )}

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>IGV (18%):</Text>
              <Text style={styles.totalValue}>Incluido</Text>
            </View>

            <View style={styles.finalTotalRow}>
              <Text style={styles.finalTotalLabel}>TOTAL A PAGAR:</Text>
              <Text style={styles.finalTotalValue}>S/ {order.totalAmount.toFixed(2)}</Text>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Gracias por su compra - Root Green</Text>
            <Text style={styles.footerText}>Para consultas: contacto@rootgreen.com | (51) 987 234 675</Text>
            <Text style={styles.footerText}>www.rootgreen.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default RootGreenReceipt;
