package me.niallmurray.slipstreamf1.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {
  @Value("${jwt.signingKey}")
  private String jwtSigningKey;
  @Value("${jwt.expirationInMillisecs}")
  private Long expirationInMillisecs;

  private Key getSigningKey() {
    System.out.println("jwt= " + jwtSigningKey);
    byte[] jwtKeyInBytes = Decoders.BASE64.decode(jwtSigningKey);
    return Keys.hmacShaKeyFor(jwtKeyInBytes);
  }

  public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
    System.out.println("exp= " + expirationInMillisecs);
    return Jwts.builder()
            .setClaims(extraClaims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + expirationInMillisecs))
            .setHeaderParam("typ", Header.JWT_TYPE)
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
  }

  public Claims extractAllClaims(String token) {
    return Jwts.parserBuilder()
            .setSigningKey(getSigningKey())
            .build()
            .parseClaimsJws(token)
            .getBody();
  }

  public <R> R extractClaim(String token, Function<Claims, R> claim) {
    Claims allclaims = extractAllClaims(token);
    return claim.apply(allclaims);
  }

  public String getSubject(String token) {
    return extractClaim(token, Claims::getSubject);
  }

  public Boolean isValidToken(String token, UserDetails userDetails) {
    Date expirationTime = extractClaim(token, Claims::getExpiration);
    String subject = getSubject(token);
    return userDetails.getUsername().equalsIgnoreCase(subject) && new Date().before(expirationTime);
  }

  //  For JUnit tests
  public void setJwtSigningKey(String jwtSigningKey) {
    if (this.jwtSigningKey == null) {
      this.jwtSigningKey = jwtSigningKey;
    }
  }
  //  For JUnit tests
  public void setExpirationInMillisecs(Long expirationInMillisecs) {
    if (this.expirationInMillisecs == null) {
      this.expirationInMillisecs = expirationInMillisecs;
    }
  }
}
