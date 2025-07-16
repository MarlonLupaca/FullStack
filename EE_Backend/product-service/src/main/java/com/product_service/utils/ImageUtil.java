package com.product_service.utils;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class ImageUtil {

    private static final String UPLOAD_DIR = "product-service/src/uploads/";

    public static String saveImage(MultipartFile imageFile) {
        try {
            String fileName = System.currentTimeMillis() + "_" + imageFile.getOriginalFilename();
            Path imagePath = Paths.get(UPLOAD_DIR, fileName);
            Files.createDirectories(imagePath.getParent());
            Files.write(imagePath, imageFile.getBytes());
            return fileName;
        } catch (IOException e) {
            throw new RuntimeException("Error al guardar la imagen", e);
        }
    }
}
