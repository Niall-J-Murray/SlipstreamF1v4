package me.niallmurray.slipstreamf1.web;

import jakarta.validation.Valid;
import me.niallmurray.slipstreamf1.domain.League;
import me.niallmurray.slipstreamf1.domain.Team;
import me.niallmurray.slipstreamf1.domain.User;
import me.niallmurray.slipstreamf1.payload.response.MessageResponse;
import me.niallmurray.slipstreamf1.service.LeagueService;
import me.niallmurray.slipstreamf1.service.TeamService;
import me.niallmurray.slipstreamf1.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
//@CrossOrigin(exposedHeaders = "Access-Control-Allow-Origin")
@CrossOrigin
@RequestMapping("api/team")
public class TeamController {
  @Autowired
  private UserService userService;
  @Autowired
  private TeamService teamService;
  @Autowired
  private LeagueService leagueService;

  @GetMapping("/all-teams")
  public ResponseEntity<List<Team>> getAllTeams() {
    List<Team> allTeams;
    try {
      allTeams = teamService.findAllTeams();
    } catch (Exception e) {
      return ResponseEntity.status(500).build();
    }
//    System.out.println("teams" + allTeams);
    return ResponseEntity.ok(allTeams);
  }

  @GetMapping("/getTeam/{teamId}")
  public ResponseEntity<Team> getTeamById(@PathVariable Long teamId, @AuthenticationPrincipal User userAuth) {
    Team team = teamService.findById(teamId);
//    System.out.println("getTeam: " +team);
//    System.out.println("getTeamDrivers: " +team.getDrivers());
    return ResponseEntity.ok(team);
  }

  @PostMapping("/createUserTeam/{userId}")
  public ResponseEntity<MessageResponse> postCreateTeam(@Valid @RequestBody String teamName, @PathVariable Long userId) {
    User user = userService.findById(userId);
    String teamNameFromJson = teamName.substring(13, (teamName.length() - 2));
    if (!teamService.isUniqueTeamName(teamNameFromJson)) {
      return ResponseEntity
              .badRequest()
              .body(new MessageResponse("Sorry, this team name is already in use!"));
    }
//    team = teamService.findById(team.getId());
    teamService.createTeam(user, teamNameFromJson);
    Team team;
    team = teamService.findByIdTeamName(teamNameFromJson);
//    System.out.println("new team: " + team);
    return ResponseEntity.ok(new MessageResponse(teamNameFromJson + "added to "+ team.getLeague().getLeagueName()));
  }

  @PostMapping("/deleteUserTeam/{userId}")
  public ResponseEntity<User> postDeleteTeam(@PathVariable Long userId) {
    User user = userService.findById(userId);
    Team team = user.getTeam();
    League league = team.getLeague();

    teamService.deleteTeam(team);
//    userService.save(user);
//    leagueService.save(league);
    return ResponseEntity.ok(user);
  }

  @PostMapping("/createTestTeam/{leagueId}")
  public ResponseEntity<Team> postCreateTestTeam(@PathVariable Long leagueId) {
    Team testTeam = teamService.createTestTeam(leagueId);
    if (testTeam != null) {
      return ResponseEntity.ok(testTeam);
    }
    return ResponseEntity.of(Optional.empty());
  }

  @PostMapping("/deleteTestTeams/{leagueId}")
  public ResponseEntity<League> postDeleteAllTestTeams(@PathVariable Long leagueId) {
    League league = leagueService.findById(leagueId);
    teamService.deleteAllTestTeams(league);
    leagueService.save(league);
    return ResponseEntity.of(Optional.empty());
  }

}
