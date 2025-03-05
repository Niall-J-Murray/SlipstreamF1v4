package me.niallmurray.slipstreamf1.web;

import me.niallmurray.slipstreamf1.domain.League;
import me.niallmurray.slipstreamf1.domain.Team;
import me.niallmurray.slipstreamf1.domain.User;
import me.niallmurray.slipstreamf1.service.LeagueService;
import me.niallmurray.slipstreamf1.service.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/league")
public class LeagueController {
  @Autowired
  LeagueService leagueService;
  @Autowired
  TeamService teamService;

  @GetMapping("/all")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<List<League>> getAllLeagues() {
    List<League> allLeagues = leagueService.findAll();
    return ResponseEntity.ok(allLeagues);
  }

  @GetMapping("/{id}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<League> getLeague(@PathVariable("id") Long leagueId) {
    Optional<League> leagueOpt = leagueService.findLeagueById(leagueId);
    return ResponseEntity.ok(leagueOpt.orElse(null));
  }

  @GetMapping("/{id}/teams")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<List<Team>> getLeagueTeams(@PathVariable("id") Long leagueId) {
    List<Team> leagueTeams = teamService.findAllTeamsByLeagueId(leagueId);
    return ResponseEntity.ok(leagueTeams);
  }

  @GetMapping("/{leagueId}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<League> getLeagueData(@PathVariable Long leagueId) {
    League leagueById = leagueService.findById(leagueId);
    return ResponseEntity.ok(leagueById);
  }

  @GetMapping("/openLeague")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<League> getOpenLeague() {
    League availableLeague = leagueService.findAvailableLeague();
    if (!availableLeague.getTeams().isEmpty()
        && availableLeague.getTeams().size() % 10 == 0) {
      availableLeague = leagueService.createLeague();
    }
    return ResponseEntity.ok(availableLeague);
  }

  @GetMapping("/{leagueId}/allTeams")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<List<Team>> getAllLeagueTeams(@PathVariable Long leagueId) {
    List<Team> teams = leagueService.findAllTeamsInLeague(leagueId);
    return ResponseEntity.ok(teams);
  }

  @GetMapping("/team/{teamId}")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<League> getTeamLeague(@PathVariable Long teamId) {
    Team team = teamService.findById(teamId);
    Long leagueId = team.getLeague().getId();
    League league = leagueService.findById(leagueId);
    return ResponseEntity.ok(league);
  }

  @GetMapping("/{leagueId}/isDraftInProgress")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<Boolean> getIsDraftInProgress(@PathVariable Long leagueId) {
    boolean isDraftInProgress = false;
    League league = leagueService.findById(leagueId);
    if (league.getTeams().size() >= 10) {
      if (leagueService.checkCurrentPickNumber(leagueId) < 21) {
        isDraftInProgress = true;
      }
    }
    return ResponseEntity.ok(isDraftInProgress);
  }

  @GetMapping("/{leagueId}/isLeagueActive")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<Boolean> getIsLeagueActive(@PathVariable Long leagueId) {
    leagueService.checkCurrentPickNumber(leagueId);
    League league = leagueService.findById(leagueId);
    return ResponseEntity.ok(league.getIsActive());
  }

  @GetMapping("/{leagueId}/getPickNumber")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<Integer> getPickNumber(@PathVariable Long leagueId) {
    League league = leagueService.findById(leagueId);
    return ResponseEntity.ok(league.getCurrentPickNumber());
  }

  @GetMapping("/{leagueId}/getNextUserToPick")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public ResponseEntity<User> getNextUserToPick(@PathVariable Long leagueId) {
    if (leagueService.getNextToPick(leagueId) != null) {
      return ResponseEntity.ok(leagueService.getNextToPick(leagueId));
    }
    return ResponseEntity.ok(null);
  }

  @PostMapping("/{leagueId}/toggleTestLeague")
  public ResponseEntity<Boolean> postToggleTestLeague(@PathVariable Long leagueId) {
    League league = leagueService.findById(leagueId);
    league.setIsPracticeLeague(Boolean.FALSE.equals(league.getIsPracticeLeague()));
    leagueService.save(league);
    return ResponseEntity.ok(league.getIsPracticeLeague());
  }
}
