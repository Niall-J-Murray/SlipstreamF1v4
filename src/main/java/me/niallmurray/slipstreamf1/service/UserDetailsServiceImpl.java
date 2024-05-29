//package me.niallmurray.slipstreamf1.service;
//
//import me.niallmurray.slipstreamf1.domain.User;
//import me.niallmurray.slipstreamf1.repositories.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.Optional;
//
//@Service
//public class UserDetailsServiceImpl implements UserDetailsService {
//
//  @Autowired
//  private UserRepository userRepository;
//
////  @Override
////  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
////    User user = userRepository.findByUsername(username);
////    if (user == null)
////      throw new UsernameNotFoundException("User with username [" + username + "] not found.");
////    return new UserDetailsImpl(user);
////  }
//
//
//  public UserDetailsServiceImpl(UserRepository userRepo) {
//    super();
//    this.userRepository = userRepo;
//  }
//
//  @Override
//  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//    User user = userRepository.findByUsername(username).orElse(null);
//    if (user == null) {
//      throw new UsernameNotFoundException("Username not found");
//    }
//    return (UserDetails) user;
//  }
//
//  public User save(User user) {
//    return userRepository.save(user);
//  }
//
//  public List<User> findAll() {
//    return userRepository.findAll();
//  }
//
//  public Optional<User> findById(Long userId) {
//    return userRepository.findById(userId);
//  }
//}
//
