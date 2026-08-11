package com.avh.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Allows the React (Vite) frontend running on http://localhost:5173
 * to communicate with this REST API during development.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/employees/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");

        registry.addMapping("/dashboard/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "OPTIONS")
                .allowedHeaders("*");
    }
}
