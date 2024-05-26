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
  public ResponseEntity<Boolean> postPickDriver(@PathVariable Long userId, @Valid @RequestBody Map<String, Long> requestData) {
    System.out.println("postPickDriver driverID: " + requestData.get("driverId"));
    Long driverId = requestData.get("driverId");
    Long userLeagueId = userService.findById(userId).getTeam().getLeague().getId();

    if (Boolean.TRUE.equals(teamService.isTestPick(userLeagueId))) {
      teamService.addDriverToTestTeam(userId, driverId);
    } else {
      teamService.addDriverToTeam(userId, driverId);
    }
//    Driver driver = driverService.findById(driverId);

    return ResponseEntity.ok(true);
  }
}
