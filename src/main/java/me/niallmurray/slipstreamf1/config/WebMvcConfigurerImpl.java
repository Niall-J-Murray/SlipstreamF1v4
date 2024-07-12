//package me.niallmurray.slipstreamf1.config;
//
//import jakarta.servlet.http.HttpServletRequest;
//import org.springframework.core.io.Resource;
//import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//import org.springframework.web.servlet.resource.PathResourceResolver;
//import org.springframework.web.servlet.resource.ResourceResolverChain;
//
//import java.util.List;
//
//import static java.util.Objects.nonNull;
//
//public class WebMvcConfigurerImpl implements WebMvcConfigurer {
//
//  //  @Override
////  public void addCorsMappings(CorsRegistry registry) {
////    registry.addMapping("/api/**")
////            .allowedOriginPatterns("*");
////  }
//
//  @Override
//  public void addResourceHandlers(ResourceHandlerRegistry registry) {
//    this.serveDirectory(registry, "/slipstream", "classpath:/slipstream/");
//  }
//
//  private void serveDirectory(ResourceHandlerRegistry registry, String endpoint, String location) {
//    String[] endpointPatterns = endpoint.endsWith("/")
//            ? new String[]{endpoint.substring(0, endpoint.length() - 1), endpoint, endpoint + "**"}
//            : new String[]{endpoint, endpoint + "/", endpoint + "/**"};
//    registry
//            .addResourceHandler(endpointPatterns)
//            .addResourceLocations(location.endsWith("/") ? location : location + "/")
//            /*
//             * The resolver below only matches if there hasn't been any other match for the current path
//             * @Controller methods still have priority, for instance
//             *
//             * It defaults to serving "index.html" if there's no actual static resource at the given path,
//             * which is useful for SPAs with client-side routing
//             */
//            .resourceChain(false)
//            .addResolver(new PathResourceResolver() {
//              @Override
//              public Resource resolveResource(HttpServletRequest request, String requestPath, List<? extends Resource> locations, ResourceResolverChain chain) {
//                Resource resource = super.resolveResource(request, requestPath, locations, chain);
//                if (nonNull(resource)) {
//                  return resource;
//                }
//                return super.resolveResource(request, "/index.html", locations, chain);
//              }
//            });
//  }
//}
