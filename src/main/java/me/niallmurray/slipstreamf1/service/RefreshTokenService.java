package me.niallmurray.slipstreamf1.service;

import me.niallmurray.slipstreamf1.domain.RefreshToken;
import me.niallmurray.slipstreamf1.domain.User;
import me.niallmurray.slipstreamf1.repositories.RefreshTokenRepository;
import me.niallmurray.slipstreamf1.security.services.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;


@Service
public class RefreshTokenService {
  @Value("${jwt.refreshExpirationInMillisecs}")
  private Long refreshExpirationInMillisecs;
  private UserDetailsServiceImpl userDetailsServiceImpl;
  private RefreshTokenRepository refreshTokenRepo;
  private JwtService jwtService;

  public RefreshTokenService(UserDetailsServiceImpl userDetailsServiceImpl, RefreshTokenRepository refreshTokenRepo, JwtService jwtService) {
    super();
    this.userDetailsServiceImpl = userDetailsServiceImpl;
    this.refreshTokenRepo = refreshTokenRepo;
    this.jwtService = jwtService;
  }

  private Date getExpirationTime() {
    return new Date(System.currentTimeMillis() + refreshExpirationInMillisecs);
  }

  private static String generateUUID() {
    return UUID.randomUUID().toString();
  }

  public Optional<RefreshToken> findTokenByUserId(Long userId) {
    return refreshTokenRepo.findByUserId(userId);
  }

  public RefreshToken generateRefreshToken(Long userId) {

    Optional<User> userOpt = userDetailsServiceImpl.findById(userId);
    if (userOpt.isPresent()) {
      Optional<RefreshToken> refreshTokenOpt = refreshTokenRepo.findByUserId(userId);

      RefreshToken refreshToken = null;
      if (refreshTokenOpt.isPresent()) {
        refreshToken = refreshTokenOpt.get();
        refreshToken.setTokenValue(generateUUID());
        refreshToken.setExpirationTime(getExpirationTime());
        System.out.println("old: " + refreshToken);
      } else {
//        refreshToken = new RefreshToken(userOpt.get(), generateUUID(), getExpirationTime());
        refreshToken = new RefreshToken();
        refreshToken.setUser(userOpt.get());
        refreshToken.setTokenValue(generateUUID());
        refreshToken.setExpirationTime(getExpirationTime());
        System.out.println("new: " + refreshToken);
      }
      refreshToken = refreshTokenRepo.save(refreshToken);
      return refreshToken;
    }
    return null;
  }

  private static RefreshToken isNonExpired(RefreshToken refreshToken) {
    if (refreshToken.getExpirationTime().after(new Date())) {
      return refreshToken;
    } else {
      throw new IllegalArgumentException("Refresh Token has expired");
    }
  }

//  public String createNewAccessToken(RefreshTokenRequest refreshTokenRequest) {
//    Optional<RefreshToken> refreshTokenOpt = refreshTokenRepo.findByTokenValue(refreshTokenRequest.getRefreshToken());
//
//    String accessToken = refreshTokenOpt.map(RefreshTokenService::isNonExpired)
//            .map(refreshToken -> jwtService.generateToken(new HashMap<>(), refreshToken.getUser()))
//            .orElseThrow(() -> new IllegalArgumentException("Refresh token not found"));
//
//    return accessToken;
//  }
}


