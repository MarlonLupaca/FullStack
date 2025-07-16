package com.report_service.controller;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.report_service.entities.Sale;
import com.report_service.entities.data.Product;
import com.report_service.entities.data.ProductAnalysis;
import com.report_service.service.ReportService;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReporteServiceRestController {

    @GetMapping("/sales/monthly")
    public ResponseEntity<List<?>> getSalesForMonth() {
        ReportService reportService = new ReportService();
        return ResponseEntity.ok(reportService.getSalesForMonth());
    }

    @GetMapping("/sales/best-selling-products")
    public ResponseEntity<List<?>> getBestSellingProducts() {
        ReportService reportService = new ReportService();
        return ResponseEntity.ok(reportService.getBestSellingProducts());
    }
    @GetMapping("/sales/financial-analysis")
    public ResponseEntity<List<?>> getFinancialAnalysis() {
        ReportService reportService = new ReportService();
        return ResponseEntity.ok(reportService.getFinancialAnalysis());
    }
    @GetMapping("/statistics")
    public ResponseEntity<List<?>> getStatistics() {
        ReportService reportService = new ReportService();
        return ResponseEntity.ok(reportService.getStatistics());
    }

    @GetMapping("/performance/channels")
    public ResponseEntity<List<?>> getPerformanceByChannels() {
        ReportService reportService = new ReportService();
        return ResponseEntity.ok(reportService.getPerformanceByChannels());
    }

    @GetMapping("/financial-projections")
    public ResponseEntity<List<?>> getFinancialProjections() {
        ReportService reportService = new ReportService();
        return ResponseEntity.ok(reportService.getFinancialProjections());
    }

    @GetMapping("/financial-indicators")
    public ResponseEntity<List<?>> getFinancialIndicators() {
        ReportService reportService = new ReportService();
        return ResponseEntity.ok(reportService.getFinancialIndicators());
    }


    @GetMapping("/products")
    public ResponseEntity<List<?>> getProducts() {
        ReportService reportService = new ReportService();
        return ResponseEntity.ok(reportService.getProducts());
    }


    @GetMapping("/products/analysis")
    public ResponseEntity<List<?>> getProductsAnalysis() {
        ReportService reportService = new ReportService();
        List<ProductAnalysis> productAnalysisList = reportService.getProductAnalysis();
        return ResponseEntity.ok(productAnalysisList);
    }


    @GetMapping("/products/stock")
    public ResponseEntity<List<?>> getProductsStock() {
        ReportService reportService = new ReportService();
        List<Product> products = reportService.getProducts();

        return ResponseEntity.ok(
                products.stream().map(product -> new Object(){
                    public final String category = product.getCategory();
                    public final String name = product.getName();
                    public final double price = product.getPrice();
                    public final int stock = product.getStock();
                }).toList()
        );
    }



    @GetMapping("/products/stock/pdf")
    public ResponseEntity<byte[]> getSockProductsPDF() throws IOException, DocumentException {
        ReportService reportService = new ReportService();
        List<Product> products = reportService.getProducts();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        Document document = new Document();
        PdfWriter.getInstance(document, byteArrayOutputStream);
        document.open();
        document.add(new Paragraph("Reporte stock de productos"));
        document.add(new Paragraph("\n"));
        document.add(new Paragraph("Fecha: " + LocalDate.now()));
        document.add(new Paragraph("\n"));
        PdfPTable table = new PdfPTable(4);
        table.addCell("Categoria");
        table.addCell("Producto");
        table.addCell("Precio");
        table.addCell("Cantidad");
        for (Product product : products) {
            table.addCell(String.valueOf(product.getCategory()));
            table.addCell(product.getName());
            table.addCell(String.valueOf(product.getPrice()));
            table.addCell(String.valueOf(product.getStock()));
        }
        document.add(table);
        document.close();
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(byteArrayOutputStream.toByteArray());
    }

    @GetMapping("/products/stock/excel")
    public ResponseEntity<byte[]> getSockProductsExcel() throws IOException {
        ReportService reportService = new ReportService();

        List<Product> products = reportService.getProducts();
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Stock");
        XSSFRow row = sheet.createRow(0);
        row.createCell(0).setCellValue("Categoria");
        row.createCell(1).setCellValue("Producto");
        row.createCell(2).setCellValue("Precio");
        row.createCell(3).setCellValue("Cantidad");
        int rowIndex = 1;
        for (Product product : products) {
            row = sheet.createRow(rowIndex);
            row.createCell(0).setCellValue(String.valueOf(product.getCategory()));
            row.createCell(1).setCellValue(product.getName());
            row.createCell(2).setCellValue(String.valueOf(product.getPrice()));
            row.createCell(3).setCellValue(String.valueOf(product.getStock()));
            rowIndex++;
        }
        workbook.write(byteArrayOutputStream);
        return ResponseEntity.ok().contentType(MediaType.APPLICATION_OCTET_STREAM).header("Content-Disposition", "attachment; filename=stock.xlsx").body(byteArrayOutputStream.toByteArray());
    }


}

