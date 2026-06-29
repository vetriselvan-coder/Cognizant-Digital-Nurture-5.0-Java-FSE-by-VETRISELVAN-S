package com.cognizant.authentication_demo.filter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.List;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private static final String SECRET = "thisIsMySuperSecureSecretKey!1234567890";
    private static final Key SIGNING_KEY =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        // 1) Skip JWT check for the authenticate endpoint
        if ("/authenticate".equals(request.getServletPath())) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2) Get the Authorization header
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            try {
                // 3) Parse and validate JWT
                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(SIGNING_KEY)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();

                // 4) Extract user and set Authentication in context
                String username = claims.getSubject();
                var auth = new UsernamePasswordAuthenticationToken(
                        username,
                        null,
                        List.of(new SimpleGrantedAuthority("ROLE_USER"))
                );
                SecurityContextHolder.getContext().setAuthentication(auth);

            } catch (Exception ex) {
                // Invalid token
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }
        } else {
            // Missing or malformed header
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // 5) Continue the filter chain
        filterChain.doFilter(request, response);
    }
}
