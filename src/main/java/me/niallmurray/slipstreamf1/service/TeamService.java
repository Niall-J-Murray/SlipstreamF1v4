package me.niallmurray.slipstreamf1.service;

import me.niallmurray.slipstreamf1.domain.Driver;
import me.niallmurray.slipstreamf1.domain.League;
import me.niallmurray.slipstreamf1.domain.Team;
import me.niallmurray.slipstreamf1.domain.User;
import me.niallmurray.slipstreamf1.repositories.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.random.RandomGenerator;

@Service
public class TeamService {
  @Autowired
  private TeamRepository teamRepository;
  @Autowired
  private UserService userService;
  @Autowired
  private LeagueService leagueService;
  @Autowired
  private DriverService driverService;

  public boolean isUniqueTeamName(String teamName) {
    List<Team> allTeams = teamRepository.findAll();
    for (Team team : allTeams) {
      if (Objects.equals(team.getTeamName(), teamName))
        return false;
    }
    return true;
  }

  private static String formatNameForDisplay(String name) {
    String userDisplayName = name.strip();
    if (userDisplayName.length() > 16) {
      String firstInitial = userDisplayName.charAt(0) + ". ";
      String nameEnding = userDisplayName.substring(userDisplayName.length() - 14);
      if (nameEnding.contains(" ")) {
        int spacePos = nameEnding.indexOf(" ");
        nameEnding = nameEnding.substring(spacePos + 1, nameEnding.length());
      }
      userDisplayName = firstInitial + nameEnding;
    }
    return userDisplayName;
  }

  public Team createTeam(User user, String teamName) {
    Team team = new Team();
    team.setUser(user);
    //To handle longer team or usernames which may cause irregular table layout displays.
    String teamDisplayName = formatNameForDisplay(teamName);
    if (isUniqueTeamName(teamDisplayName)) {
      team.setTeamName(teamDisplayName);
      user.setTeam(team);
      user.setEmail(user.getEmail());
    }

    String userDisplayName = formatNameForDisplay(user.getUsername());
    team.setDisplayedUsername(userDisplayName);
    team.setFirstPickNumber(randomPickNumber());
    team.setSecondPickNumber(21 - team.getFirstPickNumber()); //So players get 1&20, 2&19 etc. up to 10&11.
    team.setRanking(team.getFirstPickNumber());
    team.setFirstPickStartingPoints(0.0);
    team.setSecondPickStartingPoints(0.0);
    team.setTeamPoints(0.0);
    team.setIsTestTeam(false);
    team.setLeague(leagueService.findAvailableLeague());
    team.setLeagueNumber(team.getLeague().getId());
    addOneTeamToLeague(team);
    return team;
  }

  public Team createTestTeam(Long leagueId) {
    League league = leagueService.findById(leagueId);
    int leagueSize = findAllTeamsByLeague(league).size();

    if (leagueSize < 10) {
      String leagueNumber = league.getLeagueName().substring(7);
      String teamName = "Team " + leagueNumber + "." + (leagueSize + 1);
      User testUser = userService.createTestUser(teamName);

      Team team = new Team();

      team.setUser(testUser);
      team.setDisplayedUsername(testUser.getUsername());
      team.setTeamName(teamName);
      team.setFirstPickNumber(randomPickNumber());
      team.setSecondPickNumber(21 - team.getFirstPickNumber());
      team.setRanking(team.getFirstPickNumber());
      team.setFirstPickStartingPoints(0.0);
      team.setSecondPickStartingPoints(0.0);
      team.setTeamPoints(0.0);
      team.setIsTestTeam(true);
      team.setLeague(league);
      team.setLeagueNumber(team.getLeague().getId());

      testUser.setTeam(team);
      addOneTeamToLeague(team);
      leagueService.save(league);
      return team;
    }
    return null;
  }

  public void addOneTeamToLeague(Team team) {
    League league = leagueService.findAvailableLeague();
    List<Team> teams = league.getTeams();
    teams.add(team);
    league.setTeams(teams);
    teamRepository.save(team);
    leagueService.save(league);
  }

  private int randomPickNumber() {
    RandomGenerator random = RandomGenerator.getDefault();
    int pickNumber = random.nextInt(1, 11);

    for (Team team : leagueService.findAvailableLeague().getTeams()) {
      if (team.getFirstPickNumber() == pickNumber) {
        pickNumber = randomPickNumber();
      }
    }
    return pickNumber;
  }

  public void addDriverToTeam(Long userId, Long driverId) {
    User user = userService.findById(userId);
    Driver driver = driverService.findById(driverId);
    Team team = findById(user.getTeam().getId());
    List<Driver> teamDrivers = user.getTeam().getDrivers();
    League league = team.getLeague();

    if (teamDrivers.size() < 2) {
      teamDrivers.add(driver);
      driver.getTeams().add(team);
      driver.setTeams(driver.getTeams());
    }
//    Double startingPoints = team.getDrivers().stream()
//            .mapToDouble(Driver::getPoints).sum();

    team.setDrivers(teamDrivers);
    team.setFirstPickStartingPoints(team.getDrivers().get(0).getPoints());
    if (teamDrivers.size() > 1) {
      team.setSecondPickStartingPoints(team.getDrivers().get(1).getPoints());
    }
    team.setUser(user);
    user.setTeam(user.getTeam());

    league.setCurrentPickNumber(league.getCurrentPickNumber() + 1);
    league.setLastDriverPickedName(driver.getFirstName() + " " + driver.getSurname());
    league.setLastPickTime(LocalDateTime.now()
            .format(DateTimeFormatter.ofPattern("HH:mm (dd-MM-yyyy)")));

    userService.save(user);
    teamRepository.save(team);
    driverService.save(driver);
    leagueService.save(league);
  }

  public void addDriverToTestTeam(Long userId, Long driverId) {
    User user = userService.findById(userId);
    Long leagueId = user.getTeam().getLeague().getId();
    User testUser = leagueService.getNextToPick(leagueId);
    addDriverToTeam(testUser.getId(), driverId);
  }

  public Boolean isTestPick(Long leagueId) {
    return leagueService.getNextToPick(leagueId).getIsTestUser();
//    return leagueService.getNextToPickName(leagueId) != null && (leagueService.getNextToPickName(leagueId).startsWith("Test_User"));
  }

  public Boolean hasTestTeams(League league) {
    List<Team> teamsInLeague = findAllTeamsByLeague(league);
    for (Team team : teamsInLeague) {
      if (Boolean.TRUE.equals(team.getIsTestTeam()))
        return true;
    }
    return false;
  }

//  public boolean timeToPick(League league, Long teamId) {
//    int firstPickNumber = findById(teamId).getFirstPickNumber();
//    int secondPickNumber = findById(teamId).getSecondPickNumber();
//
//    return firstPickNumber == leagueService.getCurrentPickNumber(league)
//            || secondPickNumber == leagueService.getCurrentPickNumber(league);
//  }

//  public User getNextToPick(League league) {
//    User nextUserPick = null;
//    List<Team> teamsInLeague = findAllTeamsByLeague(league);
//    for (Team team : teamsInLeague) {
//      if (timeToPick(league, team.getId())) {
//        nextUserPick = team.getUser();
//      }
//    }
//    return nextUserPick;
//  }
//
//  public String getNextToPickName(League league) {
//    String nextUserPick = null;
//    List<Team> teamsInLeague = findAllTeamsByLeague(league);
//    for (Team team : teamsInLeague) {
//      if (timeToPick(league, team.getId())) {
//        nextUserPick = team.getUser().getUsername();
//      }
//    }
//    return nextUserPick;
//  }

  public List<Team> updateLeagueTeamsRankings(League league) {
    List<Team> teams = league.getTeams();
    for (Team team : teams) {
      // Update existing teams with drivers who have been replaced.
      // So far only 1 (de Vries) has been replaced (by Ricciardo).
      if (team.getDrivers().contains(driverService.findByCarNumber(21))) {
        team.getDrivers().remove(driverService.findByCarNumber(21));
        team.getDrivers().add(driverService.findByCarNumber(3));
      }
      Double totalDriverPoints = team.getDrivers().stream()
              .mapToDouble(Driver::getPoints).sum();
      team.setTeamPoints(totalDriverPoints - (team.getFirstPickStartingPoints() + team.getSecondPickStartingPoints()));
    }
    // Sort by pick order until all picks made and league is active
    if (Boolean.FALSE.equals(league.getIsActive())) {
      teams.sort(Comparator.comparing(Team::getFirstPickNumber));
      return teams;
    }
    teams.sort(Comparator.comparing(Team::getFirstPickNumber).reversed());
    teams.sort(Comparator.comparing(Team::getTeamPoints).reversed());
    for (Team team : teams) {
      team.setRanking(teams.indexOf(team) + 1);
    }
    return teamRepository.saveAll(teams);
  }

  public void deleteTeam(Team team) {
    League league = team.getLeague();
    List<Driver> drivers = team.getDrivers();
    User user = team.getUser();
    for (Driver driver : drivers) {
      driver.getTeams().remove(team);
      driverService.save(driver);
    }
    league.getTeams().remove(team);
    user.setTeam(null);
    team.setLeague(null);
    team.setLeagueNumber(null);

    teamRepository.delete(team);
    userService.save(user);
    leagueService.save(league);
    updateLeagueTeamsRankings(league);
  }

  public void deleteAllTestTeams(League league) {
    List<Team> teamsInLeague = findAllTeamsByLeague(league);
    for (Team team : teamsInLeague) {
      if (Boolean.TRUE.equals(team.getIsTestTeam())) {
        deleteTeam(team);
        userService.delete(team.getUser());
      }
    }
    updateLeagueTeamsRankings(league);

    if (Boolean.TRUE.equals(league.getIsPracticeLeague())) {
      league.setIsPracticeLeague(false);
    }
    leagueService.save(league);
  }

  public void deleteExpiredTestTeams() {
    List<League> allLeagues = leagueService.findAll();
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yy HH:mm");
    for (League league : allLeagues) {
      LocalDateTime creationTime = LocalDateTime.parse(league.getCreationTimestamp(), formatter);
      if (LocalDateTime.now().minusHours(24).isAfter(creationTime)) {
        deleteAllTestTeams(league);
      }
    }
  }

  public List<Driver> findDriversInTeam(Long teamId) {
    System.out.println("team drivers: " + findById(teamId).getDrivers());
    return findById(teamId).getDrivers();
//    return teamRepository.findAll().stream()
//            .filter(team -> team.getLeague().equals(league))
//            .toList();
  }

  public List<Team> findAllTeamsByNextPick() {
    List<Team> allTeams = teamRepository.findAll();
    allTeams.sort(Comparator.comparing(Team::getFirstPickNumber));
    return allTeams;
  }

  public List<Team> findAllTeamsByLeague(League league) {
    return teamRepository.findAll().stream()
            .filter(team -> team.getLeague().equals(league))
            .toList();
  }

  public List<Team> findAllTeams() {
    return teamRepository.findAll();
  }

  public void saveAllTeams(League league) {
    teamRepository.saveAll(findAllTeamsByLeague(league));
    leagueService.save(league);
  }

  public Team findById(Long teamId) {
    return teamRepository.findById(teamId).orElse(null);
  }

  public Team findByIdTeamName(String teamName) {
    return teamRepository.findByTeamName(teamName);
  }
}
