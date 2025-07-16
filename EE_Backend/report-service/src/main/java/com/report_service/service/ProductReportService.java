package com.report_service.service;

import com.report_service.dto.TopProductDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductReportService {

    public List<?> getLowStockProducts() {
        return List.of(
            new Object() {
                public final String nombre = "Producto A";
                public final int stock = 3;
            },
            new Object() {
                public final String nombre = "Producto B";
                public final int stock = 5;
            }
        );
    }

    public List<TopProductDTO> getTopSellingProducts() {
        return null;
    }

    public List<?> getInventoryMovements() {
        return null;
    }

    public List<?> getPopularCategories() {
        return null;
    }
}
