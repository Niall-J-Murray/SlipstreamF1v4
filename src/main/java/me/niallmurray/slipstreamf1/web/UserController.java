package me.niallmurray.slipstreamf1.web;


import org.springframework.web.bind.annotation.RestController;

@RestController
//@CrossOrigin(exposedHeaders = "Access-Control-Allow-Origin")
//@CrossOrigin
//@RequestMapping("api/v1/users")
public class UserController {
//  private UserRepository userRepository;
//  private PasswordEncoder passwordEncoder;
//  private JwtService jwtService;
//  private UserService userService;
//  private CustomUserDetailsService customUserDetailsService;
//  private RefreshTokenService refreshTokenService;
//
//  public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService, UserService userService,
//                        CustomUserDetailsService customUserDetailsService, RefreshTokenService refreshTokenService) {
//    super();
//    this.userRepository = userRepository;
//    this.passwordEncoder = passwordEncoder;
//    this.jwtService = jwtService;
//    this.userService = userService;
//    this.customUserDetailsService = customUserDetailsService;
//    this.refreshTokenService = refreshTokenService;
//  }
//
//  @PostMapping("/register")
//  public ResponseEntity<AuthenticationResponse> signUpUser(@RequestBody User user) {
//    user.setPassword(passwordEncoder.encode(user.getPassword()));
//    User savedUser = userService.createUser(user);
//
//    String accessToken = jwtService.generateToken(new HashMap<>(), savedUser);
//    RefreshToken refreshToken = refreshTokenService.generateRefreshToken(savedUser.getId());
//
//    return ResponseEntity.ok(new AuthenticationResponse(savedUser.getUsername(), accessToken, refreshToken.getTokenValue()));
//  }
//
//  @PostMapping("/login")
//  public ResponseEntity<AuthenticationResponse> signInUser(@RequestBody User user) {
//    User loggedInUser = (User) customUserDetailsService.loadUserByUsername(user.getUsername());
//    String accessToken = jwtService.generateToken(new HashMap<>(), loggedInUser);
//    RefreshToken refreshToken = refreshTokenService.generateRefreshToken(loggedInUser.getId());
//
//    return ResponseEntity.ok(new AuthenticationResponse(loggedInUser.getUsername(), accessToken, refreshToken.getTokenValue()));
//  }
//
//  @PostMapping("/refresh-token")
//  public ResponseEntity<RefreshTokenResponse> getNewAccessToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
//    String accessToken = refreshTokenService.createNewAccessToken(refreshTokenRequest);
//    return ResponseEntity.ok(new RefreshTokenResponse(refreshTokenRequest.getRefreshToken(), accessToken));
//  }
//
//
//  @GetMapping("/all-users")
//  public ResponseEntity<List<User>> getAllUsers() {
////    List<String> activeUsers = activeUserStore.getUsers();
////    List<User> users = userService.findAll();
////    System.out.println("users" + users);
////    return new ResponseEntity<>(users, HttpStatus.OK);
//    List<User> allUsers;
//    try {
//      allUsers = customUserDetailsService.findAll();
//    } catch (Exception e) {
//      return ResponseEntity.status(500).build();
//    }
//    System.out.println("users" + allUsers);
//    return ResponseEntity.ok(allUsers);
//
//
////    if (userService.isAdmin(user)) {
////      modelMap.addAttribute("isAdmin", true);
////    }
////    return "home";
//  }
//
//  @GetMapping("/current-user")
//  public ResponseEntity<String> getCurrentUser(@AuthenticationPrincipal String username, Principal user) {
////    User user= userService.findByUserName(username);
//    System.out.println("current user: " + user);
//    System.out.println("current username: " + username);
//    return new ResponseEntity<>(username, HttpStatus.OK);
//  }
//
//  @GetMapping("/{userId}")
//  public ResponseEntity<User> getUserById(@PathVariable Long userId, @AuthenticationPrincipal User userAuth) {
//    User user = customUserDetailsService.findById(userId).get();
////    if (userService.isLoggedIn(user)) {
////      user = userService.findById(userId).get();
////    }
//    System.out.println("user by id" + user);
//    return new ResponseEntity<>(user, HttpStatus.OK);
//  }
//
//  @GetMapping("/test-all-users")
//  public ResponseEntity<List<User>> getTestAllUsers(@AuthenticationPrincipal User userAuth) {
//    List<User> allUsers;
//    try {
//      allUsers = customUserDetailsService.findAll();
//    } catch (Exception e) {
//      return ResponseEntity.status(500).build();
//    }
//    System.out.println("users" + allUsers);
//    return ResponseEntity.ok(allUsers);
//  }
}
