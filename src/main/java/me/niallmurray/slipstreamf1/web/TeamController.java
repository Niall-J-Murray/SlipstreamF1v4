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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
// @CrossOrigin(exposedHeaders = "Access-Control-Allow-Origin")
@CrossOrigin
@RequestMapping("api/team")
public class TeamController {
  @Autowired
  private UserService userService;
  @Autowired
  private TeamService teamService;
  @Autowired
  private LeagueService leagueService;

  @GetMapping("/all")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<List<Team>> getAllTeams() {
    List<Team> allTeams = teamService.findAllTeams();
    return ResponseEntity.ok(allTeams);
  }

  @GetMapping("/{id}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<Team> getTeam(@PathVariable("id") Long teamId) {
    Team team = teamService.findById(teamId);
    return ResponseEntity.ok(team);
  }

  @PostMapping("/add")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<Team> addTeam(@RequestBody Team team) {
    User user = team.getUser();
    String teamName = team.getTeamName();
    Team savedTeam = teamService.createTeam(user, teamName);
    return ResponseEntity.ok(savedTeam);
  }

  @DeleteMapping("/user/{userId}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<?> deleteTeamByUser(@PathVariable("userId") Long userId,
      @RequestBody Team team) {
    teamService.deleteTeam(team);
    return ResponseEntity.ok(team);
  }

  @PostMapping("/createUserTeam/{userId}")
  public ResponseEntity<MessageResponse> postCreateTeam(@Valid @RequestBody String teamName,
      @PathVariable Long userId) {
    User user = userService.findById(userId);
    String teamNameFromJson = teamName.substring(13, (teamName.length() - 2));
    if (!teamService.isUniqueTeamName(teamNameFromJson)) {
      return ResponseEntity
          .badRequest()
          .body(new MessageResponse("Sorry, this team name is already in use!"));
    }
    teamService.createTeam(user, teamNameFromJson);
    Team team;
    team = teamService.findByIdTeamName(teamNameFromJson);
    return ResponseEntity.ok(new MessageResponse(teamNameFromJson + "added to " + team.getLeague().getLeagueName()));
  }

  @PostMapping("/deleteUserTeam/{userId}")
  public ResponseEntity<User> postDeleteTeam(@PathVariable Long userId) {
    User user = userService.findById(userId);
    Team team = user.getTeam();

    teamService.deleteTeam(team);
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
