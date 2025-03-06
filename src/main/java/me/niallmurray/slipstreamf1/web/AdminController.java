package me.niallmurray.slipstreamf1.web;

import me.niallmurray.slipstreamf1.domain.Driver;
import me.niallmurray.slipstreamf1.domain.League;
import me.niallmurray.slipstreamf1.domain.Team;
import me.niallmurray.slipstreamf1.domain.User;
import me.niallmurray.slipstreamf1.dto.DriverStanding;
import me.niallmurray.slipstreamf1.dto.DriverStandingResponse;
import me.niallmurray.slipstreamf1.dto.StandingsList;
import me.niallmurray.slipstreamf1.service.AdminService;
import me.niallmurray.slipstreamf1.service.DriverService;
import me.niallmurray.slipstreamf1.service.LeagueService;
import me.niallmurray.slipstreamf1.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Objects;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {
  @Autowired
  private TeamService teamService;
  @Autowired
  private LeagueService leagueService;
  @Autowired
  private DriverService driverService;
  @Autowired
  private AdminService adminService;
  @Value("${ergast.urls.base}${ergast.urls.currentDriverStandings}.json")
  private String f1DataApi;

  @GetMapping("/allUsers")
  public ResponseEntity<List<User>> getAllUsers() {
    List<User> allUserAccounts = adminService.getAllUserAccounts();
    return ResponseEntity.ok(allUserAccounts);
  }

  @GetMapping("/allLeagues")
  public ResponseEntity<List<League>> getAllLeagues() {
    return ResponseEntity.ok(leagueService.findAll());
  }

  @ResponseBody
  @GetMapping("/driverStandingsJSON")
  public ResponseEntity<DriverStandingResponse> getDriverStandingsResponse() {
    return new RestTemplate().getForEntity(f1DataApi, DriverStandingResponse.class);
  }

  public List<Driver> getDriversFromResponse() {
    List<StandingsList> standingsLists = Objects.requireNonNull(getDriverStandingsResponse().getBody())
            .mRData.standingsTable
            .standingsLists;
    List<DriverStanding> currentStandings = standingsLists.listIterator().next().driverStandings;

    return driverService.mapDTOToDrivers(currentStandings);
  }

  @GetMapping("/addDrivers")
  public String getAddDrivers() {
    driverService.addDrivers(getDriversFromResponse());
    System.out.println("Drivers Added Spring Boot");
    return "Drivers Added Response";
  }

  // To automatically add drivers when first user attempts login,
  // if admin role has not already added drivers.
  // Admin can manually add drivers using PostMapping above.
  public void addDrivers() {
    List<Driver> latestStandings = getDriversFromResponse();
    driverService.addDrivers(latestStandings);
  }

  @GetMapping("/updateStandings")
  public String getUpdateStandings() {
    driverService.updateDrivers(getDriversFromResponse());

    for (League league : leagueService.findAll()) {
      teamService.updateLeagueTeamsRankings(league);
    }
    System.out.println("Leagues updated!");
    return "Leagues Updated Response";
  }

  @PostMapping("/deleteTeam/{teamId}")
  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<String> postDeleteTeam(@PathVariable String teamId) {
    System.out.println("postDeleteTeam: " + teamId);
    Team team = teamService.findById(Long.valueOf(teamId));
    String teamname = team.getTeamName();
    teamService.deleteTeam(team);
    return ResponseEntity.ok(teamname);
  }

  @PostMapping("/deleteUser/{userId}")
//  @PreAuthorize("hasRole('ADMIN')")
  public ResponseEntity<String> postDeleteUser(@PathVariable String userId) {
    System.out.println("postDeleteUser: " + userId);
    String username;
    if (userId != null) {
      User user = adminService.deleteUser(Long.valueOf(userId));
      username = user.getUsername();
    } else {
      username = "User not found";
    }
    return ResponseEntity.ok(username);
  }


}
