package com.report_service.service;

import com.report_service.entities.ProductEntity;

import com.report_service.entities.Sale;
import com.report_service.entities.data.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ReportService {


    public List<SalesMonth> getSalesForMonth() {

        List<SalesMonth> salesMonths = new ArrayList<>();
        String months[] = {"Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"};

        for (int i = 0; i < 12; i++) {
            SalesMonth salesMonth = new SalesMonth();
            salesMonth.setName(months[i]);
            salesMonth.setSales((int) (Math.random() * 100));
            salesMonth.setProducts((int) (Math.random() * 50));
            salesMonth.setCosts((int) (Math.random() * 1000));
            salesMonths.add(salesMonth);
        }

        return salesMonths;
    }


    public List<BestSellingProduct> getBestSellingProducts() {

        List<BestSellingProduct> bestSellingProducts = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            BestSellingProduct product = new BestSellingProduct();
            product.setName("Product " + (i + 1));
            product.setValue((Math.random() * 100));
            product.setRevenue(Math.random() * 1000);
            bestSellingProducts.add(product);
        }

        return bestSellingProducts;
    }

    public List<FinancialAnalysis> getFinancialAnalysis() {

        List<FinancialAnalysis> financialAnalyses = new ArrayList<>();
        FinancialAnalysis analysisRevenue = new FinancialAnalysis("Ingresos", 23001.32);
        FinancialAnalysis analysisCosts = new FinancialAnalysis("Costos", 15000.00);
        FinancialAnalysis analysisProfit = new FinancialAnalysis("Ganancias", 8001.32);

        financialAnalyses.add(analysisRevenue);
        financialAnalyses.add(analysisCosts);
        financialAnalyses.add(analysisProfit);

        return financialAnalyses;
    }

    public List<Statistics> getStatistics() {

        List<Statistics> statistics = new ArrayList<>();
        Statistics statistic = new Statistics("Ventas Totales", "S/ 18,550", "+12.5%", "TrendingUp", true);
        Statistics statistic2 = new Statistics("Margen de Beneficio", "26.3%", "+1.8%", "PieChart", true);
        Statistics statistic3 = new Statistics("Ticket Promedio", "S/ 149.60", "+5.2%", "Receipt", true);
        Statistics statistic4 = new Statistics("Costo de Adquisición", "S/ 38.50", "-2.1%", "TrendingDown", false);
        statistics.add(statistic);
        statistics.add(statistic2);
        statistics.add(statistic3);
        statistics.add(statistic4);

        return statistics;
    }

    public List<User> getUsers() {

        List<User> users = new ArrayList<>();
        User user1 = new User("CLI-2025-001", "María Quispe", "maria.quispe@correo.pe", "+51 987 654 321", "15/01/2025", 7, 529.85, "activo");
        User user2 = new User("CLI-2025-002", "Juan Huamán", "juan.huaman@correo.pe", "+51 912 345 678", "02/02/2025", 3, 189.5, "activo");
        User user3 = new User("CLI-2025-003", "Ana Mamani", "ana.mamani@correo.pe", "+51 934 567 890", "20/02/2025", 5, 345.75, "activo");
        User user4 = new User("CLI-2025-004", "Carlos Ticona", "carlos.ticona@correo.pe", "+51 945 678 901", "05/03/2025", 1, 67.25, "inactivo");
        User user5 = new User("CLI-2025-005", "Laura Paredes", "laura.paredes@correo.pe", "+51 956 789 012", "18/03/2025", 4, 289.99, "activo");
        User user6 = new User("CLI-2025-006", "Miguel Salazar", "miguel.salazar@correo.pe", "+51 967 890 123", "01/04/2025", 0, 0.0, "inactivo");

        users.add(user1);
        users.add(user2);
        users.add(user3);
        users.add(user4);
        users.add(user5);
        users.add(user6);
        return users;
    }


    public List<Product> getProducts() {

        List<Product> products = new ArrayList<>();

        ArrayList<String> tags5 = new ArrayList<>();
        tags5.add("Cuidado Personal");
        tags5.add("Salud");
        tags5.add("Ecológico");
        tags5.add("Cero Residuos");
        ArrayList<String> highlights5 = new ArrayList<>();
        highlights5.add("Mango de bambú 100% biodegradable");
        highlights5.add("Cerdas suaves sin BPA");
        ArrayList<Review> reviews5 = new ArrayList<>();
        reviews5.add(new Review("Andrea Flores", 5, "2025-05-29", "Una excelente alternativa al plástico, se siente muy bien en la boca.", 5));
        reviews5.add(new Review("Diego Pérez", 4, "2025-06-01", "Me gusta que sea ecológico, aunque las cerdas podrían ser un poco más firmes para mi gusto.", 4));
        ArrayList<Integer> relatedProducts5 = new ArrayList<>();
        relatedProducts5.add(7);
        relatedProducts5.add(8);
        Product producto5 = new Product(
                5,
                "https://example.com/cepillo-bambu.jpg",
                "Cepillo de Dientes de Bambú Biodegradable",
                "Alternativa ecológica al cepillo de dientes de plástico, con mango de bambú sostenible.",
                "Contribuye al planeta con este cepillo de dientes hecho de bambú de origen sostenible y cerdas de nylon sin BPA. Empaque compostable.",
                "Higiene Personal",
                4.99,
                "0%",
                4.5,
                500,
                100,
                true,
                "Bambú y Nylon",
                "19 cm x 2 cm x 1.5 cm",
                "15 g",
                "N/A",
                "Enjuagar después de cada uso",
                "6 meses (vida útil recomendada)",
                "Vietnam",
                tags5,
                highlights5,
                reviews5,
                relatedProducts5
        );



        ArrayList<String> tags6 = new ArrayList<>();
        tags6.add("Hogar");
        tags6.add("Accesorios");
        tags6.add("Reutilizable");
        tags6.add("Ecológico");
        ArrayList<String> highlights6 = new ArrayList<>();
        highlights6.add("100% algodón orgánico certificado");
        highlights6.add("Capacidad de 15 kg");
        highlights6.add("Diseño plegable y compacto");
        ArrayList<Review> reviews6 = new ArrayList<>();
        reviews6.add(new Review("Laura Gónzalez", 5, "2025-05-27", "¡Perfecta para mis compras semanales! Resistente y muy bonita.", 5));
        reviews6.add(new Review("Carlos Torres", 5, "2025-05-29", "Excelente calidad, un imprescindible para reducir el uso de bolsas de plástico.", 5));
        ArrayList<Integer> relatedProducts6 = new ArrayList<>();
        relatedProducts6.add(9); // Bolsas de malla para frutas y verduras
        relatedProducts6.add(10); // Contenedores de alimentos reutilizables
        Product producto6 = new Product(
                6,
                "https://example.com/bolsa-algodon.jpg",
                "Bolsa de Compras de Algodón Orgánico",
                "Bolsa reutilizable de algodón orgánico, ideal para tus compras diarias y para reducir el plástico.",
                "Diseñada para ser duradera y resistente, esta bolsa de compras es una alternativa sostenible a las bolsas de plástico. Hecha de algodón orgánico certificado GOTS.",
                "Accesorios del Hogar",
                9.99,
                "5%",
                4.9,
                300,
                80,
                true,
                "Algodón Orgánico",
                "40 cm x 35 cm x 10 cm",
                "150 g",
                "N/A", // No aplica
                "Lavar a máquina en frío",
                "Garantía de por vida (por defectos de fabricación)",
                "India",
                tags6,
                highlights6,
                reviews6,
                relatedProducts6
        );

        ArrayList<String> tags7 = new ArrayList<>();
        tags7.add("Hogar");
        tags7.add("Limpieza");
        tags7.add("Ecológico");
        tags7.add("Biodegradable");
        ArrayList<String> highlights7 = new ArrayList<>();
        highlights7.add("Fórmula concentrada");
        highlights7.add("Libre de fosfatos y colorantes");
        highlights7.add("Envase reciclado y reciclable");
        ArrayList<Review> reviews7 = new ArrayList<>();
        reviews7.add(new Review("Marta Ruiz", 5, "2025-05-25", "Deja la ropa impecable y huele muy bien. ¡Me encanta que sea ecológico!", 5));
        reviews7.add(new Review("Javier Sánchez", 4, "2025-05-28", "Muy bueno para el medio ambiente, aunque a veces necesito un poco más para manchas difíciles.", 4));
        ArrayList<Integer> relatedProducts7 = new ArrayList<>();
        relatedProducts7.add(11); // Suavizante ecológico
        relatedProducts7.add(12); // Bolas para secadora de lana
        Product producto7 = new Product(
                7,
                "https://example.com/detergente-ecologico.jpg",
                "Detergente para Ropa Ecológico Concentrado",
                "Detergente líquido biodegradable para una limpieza profunda y respetuosa con el medio ambiente.",
                "Detergente altamente concentrado formulado con ingredientes de origen vegetal, sin químicos agresivos. Ideal para ropa blanca y de color, deja un aroma fresco y natural. Envase hecho con plástico 100% reciclado.",
                "Limpieza del Hogar",
                15.99,
                "0%",
                4.6,
                180, // Dosis (para 30 lavados, por ejemplo)
                40,
                true,
                "Líquido (ingredientes vegetales)",
                "20 cm x 10 cm x 5 cm",
                "1.5 kg (1 litro)",
                "N/A", // No aplica
                "Almacenar en lugar fresco y seco",
                "2 años (sin abrir)",
                "Alemania",
                tags7,
                highlights7,
                reviews7,
                relatedProducts7
        );

        ArrayList<String> tags8 = new ArrayList<>();
        tags8.add("Jardinería");
        tags8.add("Huerto");
        tags8.add("Orgánico");
        tags8.add("Ecológico");
        ArrayList<String> highlights8 = new ArrayList<>();
        highlights8.add("Variedad de hortalizas para huerto urbano");
        highlights8.add("Certificación orgánica USDA");
        highlights8.add("Fácil de cultivar para principiantes");
        ArrayList<Review> reviews8 = new ArrayList<>();
        reviews8.add(new Review("Elena Cárdenas", 5, "2025-05-20", "Germinaron muy rápido y la cosecha fue excelente. ¡Ideal para tener vegetales frescos en casa!", 5));
        reviews8.add(new Review("Roberto Gómez", 4, "2025-05-22", "La variedad es buena, aunque una de las semillas tardó un poco más en brotar. Aun así, lo recomiendo.", 4));
        ArrayList<Integer> relatedProducts8 = new ArrayList<>();
        relatedProducts8.add(13); // Tierra para macetas orgánica
        relatedProducts8.add(14); // Herramientas de jardinería ecológicas
        Product producto8 = new Product(
                8,
                "https://example.com/semillas-organicas.jpg",
                "Kit de Semillas Orgánicas para Huerto Urbano",
                "Selección de semillas orgánicas certificadas para cultivar tus propias hortalizas en casa.",
                "Inicia tu propio huerto urbano con este kit de semillas variadas de tomate, lechuga, y albahaca. Todas las semillas son orgánicas y no modificadas genéticamente, garantizando un cultivo saludable y natural. Empaque de papel reciclable.",
                "Jardinería",
                12.50,
                "0%",
                4.7,
                250, // Número de paquetes
                75,
                true,
                "Semillas (varias especies)",
                "15 cm x 10 cm x 2 cm",
                "50 g",
                "N/A", // No aplica
                "Almacenar en lugar fresco y seco",
                "1 año (fecha de siembra recomendada)",
                "Estados Unidos",
                tags8,
                highlights8,
                reviews8,
                relatedProducts8
        );

        ArrayList<String> tags9 = new ArrayList<>();
        tags9.add("Hogar");
        tags9.add("Bebidas");
        tags9.add("Reutilizable");
        tags9.add("Ecológico");
        ArrayList<String> highlights9 = new ArrayList<>();
        highlights9.add("Mantiene bebidas calientes por 6h y frías por 12h");
        highlights9.add("Acero inoxidable de grado alimenticio");
        highlights9.add("Libre de BPA y ftalatos");
        ArrayList<Review> reviews9 = new ArrayList<>();
        reviews9.add(new Review("Isabel Castro", 5, "2025-05-18", "Mi café se mantiene caliente toda la mañana. ¡Ya no uso vasos desechables!", 5));
        reviews9.add(new Review("Fernando Díaz", 5, "2025-05-21", "Excelente para llevar agua fría en el coche, no gotea y es muy resistente.", 5));
        ArrayList<Integer> relatedProducts9 = new ArrayList<>();
        relatedProducts9.add(15); // Botella de agua reutilizable
        relatedProducts9.add(16); // Pajitas reutilizables de acero
        Product producto9 = new Product(
                9,
                "https://example.com/vaso-termico.jpg",
                "Vaso Térmico Reutilizable de Acero Inoxidable",
                "Vaso térmico doble pared de acero inoxidable, ideal para llevar tus bebidas favoritas y reducir el uso de desechables.",
                "Fabricado con acero inoxidable 18/8 de alta calidad, este vaso es duradero, resistente a la corrosión y no retiene sabores. Perfecto para café, té o agua fría. Su diseño ergonómico cabe en la mayoría de los portavasos de coche.",
                "Utensilios de Cocina",
                19.99,
                "0%",
                4.9,
                300,
                90,
                true,
                "Acero Inoxidable",
                "18 cm x 8 cm (diámetro)",
                "250 g",
                "500 ml", // Capacidad
                "Lavar a mano, no apto para microondas",
                "10 años (por defectos de fabricación)",
                "China",
                tags9,
                highlights9,
                reviews9,
                relatedProducts9
        );

        ArrayList<String> tags10 = new ArrayList<>();
        tags10.add("Hogar");
        tags10.add("Bebidas");
        tags10.add("Ecológico");
        tags10.add("Reutilizable");
        ArrayList<String> highlights10 = new ArrayList<>();
        highlights10.add("Exterior de bambú natural");
        highlights10.add("Interior de acero inoxidable");
        highlights10.add("Mantiene bebidas frías por 24h y calientes por 12h");
        ArrayList<Review> reviews10 = new ArrayList<>();
        reviews10.add(new Review("Camila Soto", 5, "2025-05-30", "Hermosa y funcional. Me encanta llevarla a todas partes y mi té se mantiene caliente.", 5));
        reviews10.add(new Review("Andrés Vargas", 4, "2025-05-29", "Muy bonita y ecológica, aunque un poco pesada para llevar en una mochila pequeña.", 4));
        ArrayList<Integer> relatedProducts10 = new ArrayList<>();
        relatedProducts10.add(9); // Vaso Térmico de Acero Inoxidable
        relatedProducts10.add(16); // Pajitas reutilizables de acero
        Product producto10 = new Product(
                10,
                "https://example.com/botella-bambu.jpg",
                "Botella de Bambú Eco-friendly",
                "Botella térmica con exterior de bambú natural y aislamiento de acero inoxidable.",
                "Disfruta de tus bebidas a la temperatura ideal con esta botella sostenible. Su diseño elegante de bambú es un aislante natural, mientras que el interior de acero inoxidable de doble pared mantiene tus bebidas frías o calientes por horas. Ideal para el día a día y actividades al aire libre.",
                "Utensilios de Cocina",
                24.99,
                "0%",
                4.7,
                150,
                30,
                true,
                "Bambú y Acero Inoxidable",
                "25 cm x 7 cm (diámetro)",
                "350 g",
                "500 ml",
                "Lavar a mano, no apto para lavavajillas",
                "1 año (por defectos de fabricación)",
                "China",
                tags10,
                highlights10,
                reviews10,
                relatedProducts10
        );

        ArrayList<String> tags11 = new ArrayList<>();
        tags11.add("Hogar");
        tags11.add("Compras");
        tags11.add("Reutilizable");
        tags11.add("Ecológico");
        ArrayList<String> highlights11 = new ArrayList<>();
        highlights11.add("Set de 5 bolsas de diferentes tamaños");
        highlights11.add("Hechas de algodón orgánico y malla transpirable");
        highlights11.add("Plegables y lavables a máquina");
        ArrayList<Review> reviews11 = new ArrayList<>();
        reviews11.add(new Review("Paola Rivas", 5, "2025-05-28", "Son perfectas para el supermercado, sobre todo las de malla para las frutas y verduras. ¡Adiós al plástico!", 5));
        reviews11.add(new Review("Miguel Ángel", 5, "2025-05-27", "Muy resistentes y prácticas. Las uso para todo, desde el pan hasta los productos a granel.", 5));
        ArrayList<Integer> relatedProducts11 = new ArrayList<>();
        relatedProducts11.add(6); // Bolsa de Compras de Algodón Orgánico
        relatedProducts11.add(10); // Contenedores de alimentos reutilizables
        Product producto11 = new Product(
                11,
                "https://example.com/set-bolsas-compras.jpg",
                "Set de Bolsas Reutilizables para Compras",
                "Juego de bolsas ecológicas para compras, ideal para reducir el uso de plásticos desechables.",
                "Este set incluye 5 bolsas de diferentes tamaños: 3 de algodón orgánico resistente para artículos grandes y 2 de malla transpirable para frutas y verduras. Son lavables a máquina, plegables y muy duraderas, perfectas para un estilo de vida de cero residuos.",
                "Accesorios del Hogar",
                18.50,
                "15%",
                4.9,
                200,
                60,
                true,
                "Algodón Orgánico, Malla de Algodón",
                "Variado (desde 20x30 cm hasta 45x50 cm)",
                "200 g (total del set)",
                "N/A",
                "Lavar a máquina en frío",
                "2 años (garantía limitada)",
                "India",
                tags11,
                highlights11,
                reviews11,
                relatedProducts11
        );

        ArrayList<String> tags12 = new ArrayList<>();
        tags12.add("Hogar");
        tags12.add("Baño");
        tags12.add("Ecológico");
        tags12.add("Biodegradable");
        ArrayList<String> highlights12 = new ArrayList<>();
        highlights12.add("100% bambú sostenible");
        highlights12.add("Libre de cloro y blanqueadores");
        highlights12.add("Empaque sin plástico");
        ArrayList<Review> reviews12 = new ArrayList<>();
        reviews12.add(new Review("Claudia Núñez", 5, "2025-05-26", "Suave y resistente, ¡y es un alivio saber que no estoy dañando el planeta con cada uso!", 5));
        reviews12.add(new Review("Ricardo Soto", 4, "2025-05-25", "Excelente alternativa al papel tradicional. Es un poco más caro, pero vale la pena por el impacto ambiental.", 4));
        ArrayList<Integer> relatedProducts12 = new ArrayList<>();
        relatedProducts12.add(7); // Detergente para Ropa Ecológico
        relatedProducts12.add(5); // Cepillo de Dientes de Bambú
        Product producto12 = new Product(
                12,
                "https://example.com/papel-bambu.jpg",
                "Papel Higiénico de Bambú (12 rollos)",
                "Papel higiénico sostenible y ecológico, hecho 100% de bambú de rápido crecimiento.",
                "Suave, resistente y biodegradable, este papel higiénico es una opción consciente para tu hogar. El bambú es un recurso altamente renovable y su producción requiere menos agua que la pulpa de madera tradicional. Cada paquete contiene 12 rollos envueltos en papel reciclado, totalmente libre de plástico.",
                "Cuidado del Hogar",
                22.99,
                "0%",
                4.8,
                100, // Stock de paquetes de 12 rollos
                25,
                true,
                "Bambú",
                "40 cm x 20 cm x 10 cm (paquete)",
                "1.2 kg (paquete)",
                "3 capas, 200 hojas por rollo",
                "Almacenar en lugar seco",
                "N/A", // No aplica garantía específica
                "China",
                tags12,
                highlights12,
                reviews12,
                relatedProducts12
        );


        ArrayList<String> tags13 = new ArrayList<>();
        tags13.add("Hogar");
        tags13.add("Bebidas");
        tags13.add("Ecológico");
        tags13.add("Biodegradable");
        ArrayList<String> highlights13 = new ArrayList<>();
        highlights13.add("Fabricada con fibra de arroz natural");
        highlights13.add("Reutilizable y compostable al final de su vida útil");
        highlights13.add("Libre de BPA y melamina");
        ArrayList<Review> reviews13 = new ArrayList<>();
        reviews13.add(new Review("Lucía Morales", 5, "2025-05-29", "Me encanta la textura y el diseño. Es ligera y se siente muy bien en la mano.", 5));
        reviews13.add(new Review("Gustavo Rojas", 4, "2025-05-28", "Ideal para mi café de la mañana, aunque el calor se transfiere un poco más que en una de cerámica.", 4));
        ArrayList<Integer> relatedProducts13 = new ArrayList<>();
        relatedProducts13.add(10); // Botella de Bambú Eco-friendly
        relatedProducts13.add(15); // Botella de agua reutilizable (si es diferente a la de bambú)
        Product producto13 = new Product(
                13,
                "https://example.com/taza-fibra-arroz.jpg",
                "Taza de Café de Fibra de Arroz",
                "Taza de café reutilizable y ecológica, hecha a partir de subproductos de la agricultura.",
                "Disfruta tu café o té con esta taza innovadora fabricada principalmente con fibra de arroz, un material sostenible y biodegradable. Es ligera, duradera y una excelente alternativa a las tazas de plástico o cerámica. Contribuye a un planeta más limpio con cada sorbo.",
                "Utensilios de Cocina",
                11.99,
                "0%",
                4.6,
                200,
                50,
                true,
                "Fibra de Arroz",
                "10 cm x 8 cm (diámetro)",
                "100 g",
                "350 ml",
                "Apto para lavavajillas y microondas (bajo condiciones)",
                "6 meses (vida útil esperada en uso normal)",
                "Vietnam",
                tags13,
                highlights13,
                reviews13,
                relatedProducts13
        );

        ArrayList<String> tags14 = new ArrayList<>();
        tags14.add("Electrónica");
        tags14.add("Energía Solar");
        tags14.add("Portátil");
        tags14.add("Ecológico");
        ArrayList<String> highlights14 = new ArrayList<>();
        highlights14.add("Carga dispositivos vía USB con energía solar");
        highlights14.add("Diseño plegable y ligero");
        highlights14.add("Ideal para camping y actividades al aire libre");
        ArrayList<Review> reviews14 = new ArrayList<>();
        reviews14.add(new Review("Sofía Jiménez", 5, "2025-05-29", "Funciona perfectamente para cargar mi teléfono en mis excursiones. ¡Una excelente inversión!", 5));
        reviews14.add(new Review("Manuel Díaz", 4, "2025-05-28", "Es práctico y carga bien con sol directo. En días nublados es un poco más lento, pero cumple su función.", 4));
        ArrayList<Integer> relatedProducts14 = new ArrayList<>();
        relatedProducts14.add(10); // Botella de Bambú Eco-friendly
        relatedProducts14.add(9); // Vaso Térmico de Acero Inoxidable
        Product producto14 = new Product(
                14,
                "https://example.com/panel-solar-usb.jpg",
                "Panel Solar Portátil USB",
                "Cargador solar compacto y plegable para dispositivos móviles, cámaras y más.",
                "Aprovecha la energía del sol con este panel solar portátil. Perfecto para cargar tu smartphone, tablet o power bank mientras acampas, haces senderismo o en cualquier lugar sin acceso a la electricidad. Es resistente a la intemperie y muy fácil de transportar.",
                "Electrónica Ecológica",
                79.99,
                "0%",
                4.5,
                80,
                15,
                true,
                "Silicio Monocristalino, Tela PET",
                "25 cm x 15 cm x 2 cm (plegado)",
                "300 g",
                "10W de potencia",
                "Limpiar con un paño húmedo",
                "2 años",
                "China",
                tags14,
                highlights14,
                reviews14,
                relatedProducts14
        );


        ArrayList<String> tags15 = new ArrayList<>();
        tags15.add("Hogar");
        tags15.add("Baño");
        tags15.add("Ecológico");
        tags15.add("Cero Residuos");
        ArrayList<String> highlights15 = new ArrayList<>();
        highlights15.add("Hecha de corcho natural y sostenible");
        highlights15.add("Drena el agua y prolonga la vida del jabón");
        highlights15.add("Antibacteriana y resistente a la humedad");
        ArrayList<Review> reviews15 = new ArrayList<>();
        reviews15.add(new Review("Valeria Rojas", 5, "2025-05-31", "Perfecta para mis jabones sólidos. Mantiene el jabón seco y se ve muy bien en el baño.", 5));
        reviews15.add(new Review("Diego Castillo", 5, "2025-05-29", "Excelente calidad. El corcho es un material fantástico para esto y ayuda a que los jabones duren más.", 5));
        ArrayList<Integer> relatedProducts15 = new ArrayList<>();
        relatedProducts15.add(5); // Cepillo de Dientes de Bambú Biodegradable
        relatedProducts15.add(12); // Papel Higiénico de Bambú
        Product producto15 = new Product(
                15,
                "https://example.com/jabonera-corcho.jpg",
                "Jabonera de Corcho Natural",
                "Jabonera sostenible para jabones sólidos, fabricada con corcho 100% natural.",
                "Esta jabonera ecológica es la solución ideal para mantener tus jabones artesanales secos y alargar su vida útil. El corcho es un material renovable, biodegradable y con propiedades antibacterianas, perfecto para el baño. Su diseño permite un drenaje óptimo del agua.",
                "Accesorios de Baño",
                8.99,
                "0%",
                4.9,
                250,
                70,
                true,
                "Corcho Natural",
                "12 cm x 8 cm x 2 cm",
                "50 g",
                "N/A",
                "Limpiar con agua y jabón suave",
                "N/A", // No aplica garantía específica
                "Portugal",
                tags15,
                highlights15,
                reviews15,
                relatedProducts15
        );

        ArrayList<String> tags16 = new ArrayList<>();
        tags16.add("Hogar");
        tags16.add("Comida");
        tags16.add("Reutilizable");
        tags16.add("Ecológico");
        ArrayList<String> highlights16 = new ArrayList<>();
        highlights16.add("Incluye tenedor, cuchillo, cuchara y pajita");
        highlights16.add("Hecho de bambú 100% natural");
        highlights16.add("Estuche de tela de algodón orgánico");
        ArrayList<Review> reviews16 = new ArrayList<>();
        reviews16.add(new Review("Carolina Solís", 5, "2025-05-27", "Perfecto para llevar a la oficina o de picnic. Adiós a los cubiertos de plástico.", 5));
        reviews16.add(new Review("Pablo Rivera", 5, "2025-05-26", "Muy buena calidad y el estuche es muy práctico. Un regalo ideal para cualquier persona consciente.", 5));
        ArrayList<Integer> relatedProducts16 = new ArrayList<>();
        relatedProducts16.add(11); // Set de Bolsas Reutilizables para Compras
        relatedProducts16.add(13); // Taza de Café de Fibra de Arroz
        Product producto16 = new Product(
                16,
                "https://example.com/set-cubiertos-bambu.jpg",
                "Set de Cubiertos de Bambú Portátil",
                "Juego de cubiertos reutilizables de bambú con estuche, ideal para llevar a todas partes.",
                "Elimina los cubiertos de plástico desechables con este elegante y práctico set de bambú. Incluye tenedor, cuchillo, cuchara, palillos y pajita, todo guardado en un estuche de algodón orgánico compacto. Perfecto para el almuerzo en la oficina, viajes o picnics.",
                "Utensilios de Cocina",
                14.99,
                "0%",
                4.8,
                180,
                50,
                true,
                "Bambú, Algodón Orgánico",
                "22 cm x 5 cm x 3 cm (estuche)",
                "120 g",
                "N/A",
                "Lavar a mano con agua tibia y jabón",
                "1 año (por defectos de fabricación)",
                "China",
                tags16,
                highlights16,
                reviews16,
                relatedProducts16
        );



        ArrayList<String> tags17 = new ArrayList<>();
        tags17.add("Hogar");
        tags17.add("Bienestar");
        tags17.add("Ecológico");
        tags17.add("Aromaterapia");
        ArrayList<String> highlights17 = new ArrayList<>();
        highlights17.add("Fabricado con cerámica natural y sostenible");
        highlights17.add("Sin electricidad, difusión por evaporación");
        highlights17.add("Ideal para espacios pequeños y meditación");
        ArrayList<Review> reviews17 = new ArrayList<>();
        reviews17.add(new Review("Gabriela Fuentes", 5, "2025-05-30", "Precioso y muy efectivo para difundir mis aceites. Me encanta que no necesite electricidad.", 5));
        reviews17.add(new Review("Benjamín Cruz", 4, "2025-05-29", "Es muy estético y funciona bien, aunque para habitaciones grandes prefiero uno eléctrico. Ideal para mi escritorio.", 4));
        ArrayList<Integer> relatedProducts17 = new ArrayList<>();
        relatedProducts17.add(18); // Set de aceites esenciales orgánicos
        relatedProducts17.add(19); // Velas de cera de soja
        Product producto17 = new Product(
                17,
                "https://example.com/difusor-ceramica.jpg",
                "Difusor de Aceites Esenciales de Cerámica",
                "Difusor de aromaterapia pasivo hecho a mano con cerámica natural, sin necesidad de electricidad.",
                "Crea un ambiente relajante y natural en tu hogar con este difusor de cerámica. Simplemente aplica unas gotas de tu aceite esencial favorito en la superficie porosa y disfruta de su aroma mientras se evapora naturalmente. Es una opción sostenible y segura, sin calor ni electricidad.",
                "Decoración del Hogar",
                29.99,
                "0%",
                4.7,
                120,
                40,
                true,
                "Cerámica Natural",
                "10 cm x 8 cm (diámetro)",
                "200 g",
                "N/A",
                "Limpiar con un paño húmedo o un poco de alcohol",
                "N/A", // No aplica garantía específica
                "México",
                tags17,
                highlights17,
                reviews17,
                relatedProducts17
        );

        ArrayList<String> tags18 = new ArrayList<>();
        tags18.add("Cuidado Personal");
        tags18.add("Cabello");
        tags18.add("Ecológico");
        tags18.add("Cero Residuos");
        ArrayList<String> highlights18 = new ArrayList<>();
        highlights18.add("Fórmula natural sin sulfatos ni siliconas");
        highlights18.add("Equivalente a 2-3 botellas de champú líquido");
        highlights18.add("Envase compostable de cartón");
        ArrayList<Review> reviews18 = new ArrayList<>();
        reviews18.add(new Review("Andrea G.M.", 5, "2025-05-28", "Mi cabello se siente limpio y suave. ¡Y qué práctico para viajar sin derrames!", 5));
        reviews18.add(new Review("Rodrigo P.", 4, "2025-05-27", "Al principio me costó acostumbrarme, pero ahora me encanta. Dura muchísimo y es muy respetuoso con el cuero cabelludo.", 4));
        ArrayList<Integer> relatedProducts18 = new ArrayList<>();
        relatedProducts18.add(5); // Cepillo de Dientes de Bambú
        relatedProducts18.add(15); // Jabonera de Corcho Natural
        Product producto18 = new Product(
                18,
                "https://example.com/champu-solido.jpg",
                "Champú Sólido Natural de Romero y Menta",
                "Champú en barra artesanal, formulado con ingredientes naturales para todo tipo de cabello.",
                "Reduce tu huella de carbono con este champú sólido. Hecho con romero y menta, deja el cabello fresco, brillante y nutrido. Su formato compacto es ideal para viajar y su empaque de cartón es completamente compostable, eliminando el plástico de tu rutina de baño.",
                "Higiene Personal",
                12.99,
                "0%",
                4.7,
                200,
                60,
                true,
                "Romero, Menta, Aceites Vegetales",
                "7 cm x 5 cm x 2.5 cm",
                "80 g",
                "N/A", // No aplica
                "Dejar secar al aire después de cada uso",
                "1 año (sin abrir)",
                "Perú",
                tags18,
                highlights18,
                reviews18,
                relatedProducts18
        );


        ArrayList<String> tags19 = new ArrayList<>();
        tags19.add("Cuidado Personal");
        tags19.add("Facial");
        tags19.add("Ecológico");
        tags19.add("Biodegradable");
        ArrayList<String> highlights19 = new ArrayList<>();
        highlights19.add("Limpieza facial suave y exfoliante");
        highlights19.add("100% natural y biodegradable");
        highlights19.add("Adecuada para pieles sensibles");
        ArrayList<Review> reviews19 = new ArrayList<>();
        reviews19.add(new Review("Diana C.B.", 5, "2025-05-30", "Mi piel está mucho más suave desde que la uso. Es muy delicada y la sensación es increíble.", 5));
        reviews19.add(new Review("Felipe Q.", 5, "2025-05-29", "Producto excelente para una limpieza profunda sin irritar. La recomiendo para el uso diario.", 5));
        ArrayList<Integer> relatedProducts19 = new ArrayList<>();
        relatedProducts19.add(18); // Champú Sólido Natural
        relatedProducts19.add(5); // Cepillo de Dientes de Bambú
        Product producto19 = new Product(
                19,
                "https://example.com/esponja-konjac.jpg",
                "Esponja Vegetal Konjac Facial",
                "Esponja facial de origen vegetal, perfecta para una limpieza suave y exfoliación diaria.",
                "Hecha de la raíz de la planta Konjac, esta esponja es 100% natural, biodegradable y compostable. Limpia y exfolia suavemente la piel, eliminando impurezas y células muertas, dejando el rostro radiante. Ideal para todo tipo de piel, incluso las más sensibles.",
                "Higiene Personal",
                6.99,
                "0%",
                4.8,
                300,
                100,
                true,
                "Raíz de Konjac",
                "8 cm (diámetro) x 3 cm",
                "10 g (seca)",
                "N/A",
                "Hidratar antes de usar, colgar para secar",
                "3 meses (vida útil recomendada)",
                "Corea del Sur",
                tags19,
                highlights19,
                reviews19,
                relatedProducts19
        );


        ArrayList<String> tags20 = new ArrayList<>();
        tags20.add("Cuidado Personal");
        tags20.add("Infantil");
        tags20.add("Ecológico");
        tags20.add("Bambú");
        ArrayList<String> highlights20 = new ArrayList<>();
        highlights20.add("Mango ergonómico de bambú para manos pequeñas");
        highlights20.add("Cerdas suaves de nylon sin BPA");
        highlights20.add("Diseños divertidos para niños");
        ArrayList<Review> reviews20 = new ArrayList<>();
        reviews20.add(new Review("Carla F.L.", 5, "2025-05-29", "A mi hijo le encanta su nuevo cepillo. ¡Y a mí me encanta que sea ecológico!", 5));
        reviews20.add(new Review("Martín R.V.", 4, "2025-05-28", "Muy buen tamaño para niños y las cerdas son adecuadas. Un gran paso para que aprendan sobre sostenibilidad.", 4));
        ArrayList<Integer> relatedProducts20 = new ArrayList<>();
        relatedProducts20.add(5); // Cepillo de Dientes de Bambú para Adultos
        relatedProducts20.add(7); // Detergente para Ropa Ecológico (para niños)
        Product producto20 = new Product(
                20,
                "https://example.com/cepillo-bambu-ninos.jpg",
                "Cepillo de Dientes de Bambú para Niños",
                "Cepillo de dientes diseñado para los más pequeños, con mango de bambú sostenible y cerdas suaves.",
                "Introduce a tus hijos en un estilo de vida más sostenible con este cepillo de dientes ecológico. Su mango de bambú es fácil de agarrar para los niños, y sus cerdas suaves protegen sus encías. Disponible en varios colores naturales para hacerlo divertido.",
                "Higiene Personal Infantil",
                4.50,
                "0%",
                4.7,
                350,
                90,
                true,
                "Bambú, Nylon sin BPA",
                "14 cm x 1.5 cm x 1 cm",
                "10 g",
                "N/A",
                "Enjuagar después de usar y dejar secar",
                "3 meses (vida útil recomendada)",
                "China",
                tags20,
                highlights20,
                reviews20,
                relatedProducts20
        );

        ArrayList<String> tags21 = new ArrayList<>();
        tags21.add("Hogar");
        tags21.add("Comida");
        tags21.add("Reutilizable");
        tags21.add("Ecológico");
        ArrayList<String> highlights21 = new ArrayList<>();
        highlights21.add("Fabricada con materiales reciclados y sostenibles");
        highlights21.add("Mantiene alimentos fríos o calientes por horas");
        highlights21.add("Plegable y fácil de limpiar");
        ArrayList<Review> reviews21 = new ArrayList<>();
        reviews21.add(new Review("Sandra C.S.", 5, "2025-05-27", "Perfecta para llevar mi almuerzo al trabajo. Mantiene todo fresco y es muy resistente.", 5));
        reviews21.add(new Review("Joaquín V.", 5, "2025-05-26", "La uso para las compras del mercado y también para picnics. Muy útil y ecológica.", 5));
        ArrayList<Integer> relatedProducts21 = new ArrayList<>();
        relatedProducts21.add(11); // Set de Bolsas Reutilizables para Compras
        relatedProducts21.add(16); // Set de Cubiertos de Bambú Portátil
        Product producto21 = new Product(
                21,
                "https://example.com/bolsa-isotermica.jpg",
                "Bolsa Isotérmica Sostenible",
                "Bolsa térmica reutilizable, ideal para transportar alimentos y bebidas manteniendo su temperatura.",
                "Hecha con tela de botellas PET recicladas y aislamiento térmico de espuma ecológica, esta bolsa es la compañera perfecta para tus picnics, compras o el almuerzo diario. Su diseño robusto y plegable la hace práctica para almacenar y limpiar, contribuyendo a reducir el uso de plásticos desechables.",
                "Accesorios del Hogar",
                21.99,
                "10%",
                4.7,
                150,
                40,
                true,
                "RPET (Plástico Reciclado), Espuma Aislante",
                "30 cm x 20 cm x 25 cm",
                "300 g",
                "15 litros de capacidad",
                "Limpiar con un paño húmedo",
                "1 año (por defectos de fabricación)",
                "Vietnam",
                tags21,
                highlights21,
                reviews21,
                relatedProducts21
        );


        ArrayList<String> tags22 = new ArrayList<>();
        tags22.add("Hogar");
        tags22.add("Iluminación");
        tags22.add("Energía Solar");
        tags22.add("Ecológico");
        ArrayList<String> highlights22 = new ArrayList<>();
        highlights22.add("Funciona con energía solar, no necesita cables");
        highlights22.add("Batería de larga duración (hasta 10 horas)");
        highlights22.add("Diseño moderno y minimalista");
        ArrayList<Review> reviews22 = new ArrayList<>();
        reviews22.add(new Review("Elisa M.N.", 5, "2025-05-31", "Preciosa y muy práctica para mi patio. Da una luz ambiental muy agradable y es genial no tener que preocuparme por los cables.", 5));
        reviews22.add(new Review("Sebastián L.C.", 4, "2025-05-30", "Ilumina muy bien para su tamaño. Es un detalle muy bonito y ecológico para cualquier rincón.", 4));
        ArrayList<Integer> relatedProducts22 = new ArrayList<>();
        relatedProducts22.add(14); // Panel Solar Portátil USB
        relatedProducts22.add(17); // Difusor de Aceites Esenciales de Cerámica
        Product producto22 = new Product(
                22,
                "https://example.com/lampara-solar-mesa.jpg",
                "Lámpara Solar de Mesa con Carga USB",
                "Lámpara de mesa decorativa con carga solar integrada y opción de carga USB.",
                "Ilumina tus noches de forma sostenible con esta elegante lámpara solar de mesa. Equipada con un panel solar en la parte superior que carga su batería interna durante el día, proporciona horas de luz cálida por la noche. También incluye un puerto USB para carga en días nublados o cuando necesites una carga rápida. Ideal para jardines, balcones o como luz de ambiente interior.",
                "Iluminación del Hogar",
                45.99,
                "0%",
                4.6,
                100,
                20,
                true,
                "Aluminio Reciclado, Panel Solar, LED",
                "20 cm (alto) x 15 cm (diámetro)",
                "500 g",
                "300 lúmenes",
                "Limpiar con un paño seco",
                "2 años (lámpara y panel solar)",
                "Dinamarca",
                tags22,
                highlights22,
                reviews22,
                relatedProducts22
        );


        products.add(producto5);
        products.add(producto6);
        products.add(producto7);
        products.add(producto8);
        products.add(producto9);
        products.add(producto10);
        products.add(producto11);
        products.add(producto12);
        products.add(producto13);
        products.add(producto14);
        products.add(producto15);
        products.add(producto16);
        products.add(producto17);
        products.add(producto18);
        products.add(producto19);
        products.add(producto20);
        products.add(producto21);
        products.add(producto22);

        return products;
    }


    public List<ProductAnalysis> getProductAnalysis() {
        List<ProductAnalysis> productAnalysisList = new ArrayList<>();
        List<Product> products = getProducts();

        for (Product product : products) {
            ProductAnalysis analysis = new ProductAnalysis();
            analysis.setName(product.getName());
            analysis.setTotalSales(Math.random() * 1000);
            analysis.setStock(product.getStock());
            analysis.setMarginPercent(Math.random() * 100);
            analysis.setStatus(product.getStock() == 0 ? "Sin Stock" : (product.getStock() <= 50 ? "Bajo Stock" : "Disponible"));
            productAnalysisList.add(analysis);
        }

        return productAnalysisList;
    }

    public List<FinancialProjection> getFinancialProjections() {
        List<FinancialProjection> projections = new ArrayList<>();
        FinancialProjection q3_2025_projection = new FinancialProjection(
                "Q3 2025",
                25400.0,
                18750.0,
                6650.0,
                8.2
        );
        FinancialProjection q4_2025_projection = new FinancialProjection(
                "Q4 2025",
                32800.0,
                24200.0,
                8600.0,
                12.5
        );

        FinancialProjection q1_2026_projection = new FinancialProjection(
                "Q1 2026",
                28500.0,
                21100.0,
                7400.0,
                -5.8
        );
        projections.add(q3_2025_projection);
        projections.add(q4_2025_projection);
        projections.add(q1_2026_projection);
        return projections;
    }

    public List<FinancialIndicator> getFinancialIndicators() {
        List<FinancialIndicator> indicators = new ArrayList<>();
        FinancialIndicator roiIndicator = new FinancialIndicator(
                "ROI",
                24.8,
                2.1
        );

        FinancialIndicator grossMarginIndicator = new FinancialIndicator(
                "Margen Bruto",
                35.6,
                0.8
        );

        FinancialIndicator costPerSaleIndicator = new FinancialIndicator(
                "Costo por Venta",
                12.40,
                1.5
        );

        FinancialIndicator customerValueIndicator = new FinancialIndicator(
                "Valor de Cliente",
                320.0,
                5.2
        );

        indicators.add(roiIndicator);
        indicators.add(grossMarginIndicator);
        indicators.add(costPerSaleIndicator);
        indicators.add(customerValueIndicator);

        return indicators;
    }

    public List<Channel> getPerformanceByChannels() {
        List<Channel> channels = new ArrayList<>();
        Channel channel1 = new Channel("Tienda Online", 65.0);
        Channel channel2 = new Channel("Marketplace", 25.0);
        Channel channel3 = new Channel("Ventas Directas", 10.0);

        channels.add(channel1);
        channels.add(channel2);
        channels.add(channel3);

        return channels;
    }



    //test
    public List<Sale> getSales() {
        List<Sale> sales = new ArrayList<>();
        Sale sale1 = new Sale(LocalDate.now(), new ProductEntity("Product1", 50), 2, 100.0);
        Sale sale2 = new Sale(LocalDate.now(), new ProductEntity("Product2", 50), 1, 50.0);
        sales.add(sale1);
        sales.add(sale2);
        return sales;
    }


}
