package me.niallmurray.slipstreamf1.service;//package me.niallmurray.slipstreamf1.service;
//
//import me.niallmurray.slipstreamf1.domain.User;
//import me.niallmurray.slipstreamf1.repositories.UserRepository;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//  private UserRepository userRepo;
//
//  public CustomUserDetailsService(UserRepository userRepo) {
//    super();
//    this.userRepo = userRepo;
//  }
//
//  @Override
//  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//    User user = userRepo.findByUsername(username);
//    if (user == null) {
//      throw new UsernameNotFoundException("Username not found");
//    }
//    return user;
//  }
//
//  public User save(User user) {
//    return userRepo.save(user);
//  }
//
//  public List<User> findAll() {
//    return userRepo.findAll();
//  }
//
//  public Optional<User> findById(Long userId) {
//    return userRepo.findById(userId);
//  }
//}
