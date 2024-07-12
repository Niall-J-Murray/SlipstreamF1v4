package me.niallmurray.slipstreamf1.service;

import me.niallmurray.slipstreamf1.domain.User;
import me.niallmurray.slipstreamf1.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDataService {
  @Autowired
  UserRepository userRepository;

  public User getUserData(Long userId) {
    Optional<User> userOpt = userRepository.findById(userId);
    return userOpt.orElse(null);
  }
}
