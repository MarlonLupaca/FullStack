package com.auth_service.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Map;

@Component
public class JwtUtil {

    private final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private final long expirationMillis = 5 * 60 * 60 * 1000; // 5 horas

    // Genera token con username, userCode y un solo rol
    public String generateToken(String username, String userCode, String role) {
        Map<String, Object> extraClaims = Map.of(
                "userCode", userCode,
                "role", role
        );

        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationMillis))
                .signWith(secretKey)
                .compact();
    }


    // Extrae el username (sub)
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // Extrae el rol
    public String extractRole(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("role", String.class);
    }

    // Extrae userCode
    public String extractUserCode(String token) {
        Claims claims = extractAllClaims(token);
        return claims.get("userCode", String.class);
    }

    // Valida que el token sea válido para el usuario dado
    public boolean isTokenValid(String token, String username) {
        return extractUsername(token).equals(username) && !isTokenExpired(token);
    }

    // Verifica si el token está expirado
    public boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    // Extrae todos los claims con la clave secreta
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
