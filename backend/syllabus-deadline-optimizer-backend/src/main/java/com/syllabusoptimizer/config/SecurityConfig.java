package com.syllabusoptimizer.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    private final UserDetailsService userDetailsService;

    public SecurityConfig(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disables CSRF protection
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/auth/register", "/api/auth/login").permitAll() // Allow these paths without authentication
                        .anyRequest().authenticated() // Authenticate all other requests
                )
                .httpBasic(httpBasic -> {}); // Enables basic HTTP authentication
        return http.build();
    }

    @Bean
    public AuthenticationManagerBuilder authenticationManagerBuilder(
            AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
        return auth;
    }
}
