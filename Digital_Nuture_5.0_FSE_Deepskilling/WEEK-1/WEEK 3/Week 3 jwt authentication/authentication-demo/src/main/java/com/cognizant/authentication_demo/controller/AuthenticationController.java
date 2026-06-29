package com.cognizant.authentication_demo.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.SignatureAlgorithm;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;


@RestController
public class AuthenticationController {
    private static final String SECRET = "thisIsMySuperSecureSecretKey!1234567890";
    private static final Key SIGNING_KEY =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationController.class);

    @GetMapping("/authenticate")
    public Map<String, String> authenticate(@RequestHeader("Authorization") String authHeader) {
        LOGGER.info("START - authenticate()");
        LOGGER.debug("Authorization Header: {}", authHeader);

        String user = getUser(authHeader);
        LOGGER.debug("Extracted user: {}", user);

        String token = generateJwt(user);
        LOGGER.debug("Generated token: {}", token);

        Map<String, String> map = new HashMap<>();
        map.put("token", token);

        LOGGER.info("END - authenticate()");
        return map;
    }


    private String getUser(String authHeader) {
        // Remove "Basic " prefix
        String encodedCredentials = authHeader.substring("Basic ".length());

        // Decode Base64
        byte[] decodedBytes = Base64.getDecoder().decode(encodedCredentials);
        String decodedString = new String(decodedBytes); // user:pwd

        LOGGER.debug("Decoded credentials: {}", decodedString);

        // Split by ":" and return username
        return decodedString.split(":")[0];
    }

    private String generateJwt(String user) {
        return Jwts.builder()
                .setSubject(user)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1200000))
                .signWith(SIGNING_KEY, SignatureAlgorithm.HS256)
                .compact();
    }

}