package me.niallmurray.slipstreamf1.web;

import me.niallmurray.slipstreamf1.domain.User;
import me.niallmurray.slipstreamf1.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserDataController {
  @Autowired
  UserRepository userRepository;

  @GetMapping("/{userId}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<User> getUserData(@PathVariable Long userId) {
    Optional<User> userOpt = userRepository.findById(userId);
    return ResponseEntity.ok(userOpt.orElse(null));
  }
}
