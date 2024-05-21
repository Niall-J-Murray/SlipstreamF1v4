package me.niallmurray.slipstreamf1.web;

import jakarta.validation.Valid;
import me.niallmurray.slipstreamf1.domain.Driver;
import me.niallmurray.slipstreamf1.domain.Team;
import me.niallmurray.slipstreamf1.service.DriverService;
import me.niallmurray.slipstreamf1.service.TeamService;
import me.niallmurray.slipstreamf1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/driver")
public class DriverController {
  @Autowired
  DriverService driverService;
  @Autowired
  UserService userService;
  @Autowired
  TeamService teamService;
  @Autowired
  SseController sseController;

  @GetMapping("/{driverId}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<Driver> getDriverData(@PathVariable Long driverId) {
    System.out.println("getDriverData driverId: " + driverId);
    Driver driver = driverService.findById(driverId);
//    System.out.println("driver entity: " + ResponseEntity.ok(driverOpt.orElse(null)));
    return ResponseEntity.ok(driver);
  }

  @GetMapping("/allDrivers")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<List<Driver>> getAllDrivers() {
    List<Driver> allDrivers = driverService.sortDriversStanding();
//    System.out.println("getAllDrivers: " + allDrivers);
    return ResponseEntity.ok(allDrivers);
  }

  @GetMapping("/driversInTeam/{teamId}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<List<Driver>> getDriversInTeam(@PathVariable Long teamId) {
    Team team = teamService.findById(teamId);
    List<Driver> driversInTeam = new ArrayList<>(6);
    if (team != null) {
      driversInTeam = team.getDrivers();
    }
//    Long driverId1 = team.getDrivers().get(0).getDriverId();
//    Long driverId2 = team.getDrivers().get(1).getDriverId();
//    Driver driver1 = driverService.findById(driverId1);
//    Driver driver2 = driverService.findById(driverId2);
//    driversInTeam.add(driver1);
//    driversInTeam.add(driver2);
//    System.out.println("driver entity: " + ResponseEntity.ok(driverOpt.orElse(null)));
    return ResponseEntity.ok(driversInTeam);
  }

  @GetMapping("/undraftedDrivers/{leagueId}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<List<Driver>> getUndraftedDrivers(@PathVariable Long leagueId) {
    List<Driver> undraftedDrivers = driverService.getUndraftedDrivers(leagueId);
//    System.out.println("getAllDrivers: " + allDrivers);
    return ResponseEntity.ok(undraftedDrivers);
  }

  @PostMapping("/pick/{userId}")
  public ResponseEntity<Boolean> postPickDriver(@PathVariable Long userId, @Valid @RequestBody Map<String, Long> requestData) throws IOException {
    System.out.println("postPickDriver driverID: " + requestData.get("driverId"));
    Long driverId = requestData.get("driverId");
    Long userLeagueId = userService.findById(userId).getTeam().getLeague().getId();

    if (Boolean.TRUE.equals(teamService.isTestPick(userLeagueId))) {
      teamService.addDriverToTestTeam(userId, driverId);
    } else {
      teamService.addDriverToTeam(userId, driverId);
    }
    Driver driver = driverService.findById(driverId);
    //Async send email to next to pick
//    emailService.asyncPickNotificationEmail(userLeague);
//    sseController.testPickMade(userId, driver.getSurname());
//    sseController.pickMade(userId);
    sseController.pickMadeTest(userId);
//    sseController.pickMade(userId);
//    sseController.pickMade();
//    return ResponseEntity.ok(driver);
    return ResponseEntity.ok(true);
  }
}
