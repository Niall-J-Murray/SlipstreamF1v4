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
//    return userOpt.orElse(null);
//    System.out.println("user entity: " + ResponseEntity.ok(userOpt.orElse(null)));
//    if (userOpt.isPresent()) {
//      System.out.println("user entity: " + ResponseEntity.ok(userOpt.orElse(null).getUsername()));
//      if (userOpt.orElse(null).getTeam() != null) {
//        System.out.println(userOpt.orElse(null).getTeam().getDrivers());
//      }
//    }
    return ResponseEntity.ok(userOpt.orElse(null));
  }

//  @Autowired
//  LeagueRepository leagueRepository;
//
//  @GetMapping("/league/{leagueId}")
//  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
//  public ResponseEntity<League> getLeagueData(@PathVariable Long leagueId) {
//    Optional<League> leagueOpt = leagueRepository.findById(leagueId);
//    System.out.println("league entity: " + ResponseEntity.ok(leagueOpt.orElse(null)));
//    return ResponseEntity.ok(leagueOpt.orElse(null));
//  }

  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping("/mod")
  @PreAuthorize("hasRole('MODERATOR')")
  public String moderatorAccess() {
    return "Moderator Board.";
  }

  @GetMapping("/admin")
  @PreAuthorize("hasRole('ADMIN')")
  public String adminAccess() {
    return "Admin Board.";
  }
}
