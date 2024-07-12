package me.niallmurray.slipstreamf1.web;

import me.niallmurray.slipstreamf1.domain.User;
import me.niallmurray.slipstreamf1.service.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/user")
public class UserDataController {
  @Autowired
  UserDataService userDataService;

  @GetMapping("/{userId}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<User> getUserData(@PathVariable Long userId) {
    User user = userDataService.getUserData(userId);
    return ResponseEntity.ok(user);
  }
}
