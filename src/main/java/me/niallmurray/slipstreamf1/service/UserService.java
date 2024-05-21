package me.niallmurray.slipstreamf1.service;

import me.niallmurray.slipstreamf1.domain.User;
import me.niallmurray.slipstreamf1.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private LeagueService leagueService;

  public User createUser(User user) {
    user.setUsername(user.getUsername().trim());
    user.setIsTestUser(false);
    user.setEmailsReceived(0);
    // For new users first login and to check for unsuccessful logouts.
    user.setLastLogout(String.valueOf(LocalDateTime.of(123, 4, 5, 6, 7)));
    if (userRepository.findAll().size() < 2) {
      leagueService.findAvailableLeague();
    }
    return userRepository.save(user);
  }

  public User createTestUser(String teamName) {
    User user = new User();
    user.setPassword(new BCryptPasswordEncoder().encode(user.getUsername() + "password"));
    user.setLastLogout(String.valueOf(LocalDateTime.now()));
    user.setUsername("Test_User_" + teamName.substring(5));
    user.setEmail(user.getUsername() + "@slipstreamf1.com");
    user.setEmailsReceived(0);
    user.setIsTestUser(true);

    return userRepository.save(user);
  }

  public User findById(Long userId) {
    Optional<User> findById = userRepository.findById(userId);
    return findById.orElse(null);
  }

  public User findByUserName(String username) {
    Optional<User> findByUsername = userRepository.findByUsernameIgnoreCase(username);
    return findByUsername.orElse(null);
  }

  public boolean usernameExists(String username) {
    return userRepository.findByUsername(username).isPresent();
  }

  public boolean emailExists(String email) {
    return userRepository.existsByEmail(email) != null;
  }

//  public boolean isLoggedIn(User user) {
//    if (user != null) {
//      return activeUserStore.getUsers().contains(user.getUsername());
//    }
//    return false;
//  }

//  public boolean isAdmin(User user) {
//    if (user != null) {
//      Set<Authority> authorities = user.getAuthorities();
//      for (Authority authority : authorities) {
//        if (authority.getAuthority().equals("ROLE_ADMIN")) {
//          return true;
//        }
//      }
//    }
//    return false;
//  }

  public void updateLastLogout(Long userId) {
    User user = findById(userId);
    user.setLastLogout(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yy HH:mm")));
    userRepository.save(user);
  }

  public User save(User user) {
    return userRepository.save(user);
  }

  public List<User> findAll() {
    return userRepository.findAll();
  }

  public User findByEmail(String email) {
    return userRepository.findByEmail(email);
  }

  public User delete(User user) {
    userRepository.delete(user);
    return user;
  }
}