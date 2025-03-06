package me.niallmurray.slipstreamf1.security;

import jakarta.servlet.http.HttpServletRequest;
import me.niallmurray.slipstreamf1.security.jwt.AuthEntryPointJwt;
import me.niallmurray.slipstreamf1.security.jwt.AuthTokenFilter;
import me.niallmurray.slipstreamf1.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.resource.PathResourceResolver;
import org.springframework.web.servlet.resource.ResourceResolverChain;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import java.util.List;

import static java.util.Objects.nonNull;

@Configuration
@EnableMethodSecurity
public class WebSecurityConfig implements WebMvcConfigurer {
  @Autowired
  UserDetailsServiceImpl userDetailsService;

  @Autowired
  private AuthEntryPointJwt unauthorizedHandler;

  @Bean
  public AuthTokenFilter authenticationJwtTokenFilter() {
    return new AuthTokenFilter();
  }

  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

    authProvider.setUserDetailsService(userDetailsService);
    authProvider.setPasswordEncoder(passwordEncoder());

    return authProvider;
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(AbstractHttpConfigurer::disable)
        .exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/slipstream/**").permitAll()
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/api/admin/**").permitAll()
            .requestMatchers("/api/user/**").permitAll()
            .requestMatchers("/api/league/**").permitAll()
            .requestMatchers("/api/team/**").permitAll()
            .requestMatchers("/api/driver/**").permitAll()
            .anyRequest().authenticated());
    http.authenticationProvider(authenticationProvider());
    http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }

  @Override
  public void addResourceHandlers(@NonNull ResourceHandlerRegistry registry) {
    this.serveDirectory(registry, "/slipstream", "classpath:/slipstream/");
  }

  private void serveDirectory(@NonNull ResourceHandlerRegistry registry, @NonNull String endpoint,
      @NonNull String location) {
    String[] endpointPatterns = endpoint.endsWith("/")
        ? new String[] { endpoint.substring(0, endpoint.length() - 1), endpoint, endpoint + "**" }
        : new String[] { endpoint, endpoint + "/", endpoint + "/**" };
    registry
        .addResourceHandler(endpointPatterns)
        .addResourceLocations(location.endsWith("/") ? location : location + "/")
        .resourceChain(false)
        .addResolver(new PathResourceResolver() {
          @Override
          public Resource resolveResource(
              @Nullable HttpServletRequest request,
              @NonNull String requestPath,
              @NonNull List<? extends Resource> locations,
              @NonNull ResourceResolverChain chain) {
            Resource resource = super.resolveResource(request, requestPath, locations, chain);
            if (nonNull(resource)) {
              return resource;
            }
            return super.resolveResource(request, "/index.html", locations, chain);
          }
        });
  }
}
