package me.niallmurray.slipstreamf1.service;

import me.niallmurray.slipstreamf1.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {
  @SuppressWarnings("SpringJavaAutowiredFieldsWarningInspection")
  @Autowired
  private UserService userService;

  @Secured({"ROLE_ADMIN"})
  public List<User> getAllUserAccounts() {
    return userService.findAll();
  }

  @Secured({"ROLE_ADMIN"})
  public User deleteUser(Long userId) {
    User user = userService.findById(userId);
    return userService.delete(user);
  }
}
