package me.niallmurray.slipstreamf1.service;

import me.niallmurray.slipstreamf1.domain.League;
import me.niallmurray.slipstreamf1.domain.Team;
import me.niallmurray.slipstreamf1.domain.User;
import me.niallmurray.slipstreamf1.repositories.LeagueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
public class LeagueService {
  @Autowired
  private LeagueRepository leagueRepository;

  public League createLeague() {
    deleteEmptyLeagues();
    League league = new League();
    league.setLeagueName("League " + findNewestLeagueId());
    league.setTeams(new ArrayList<>());
    league.setIsPracticeLeague(false);
    league.setCurrentPickNumber(1);
    league.setIsActive(false);
    league.setCreationTimestamp(
            LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd-MM-yy HH:mm")));
    leagueRepository.save(league);
    league.setLeagueName("League " + league.getId());
    return leagueRepository.save(league);
  }

  public Long findNewestLeagueId() {
    List<League> allLeagues = leagueRepository.findAll();
    if (allLeagues.isEmpty()) {
      return 1L;
    }
    return allLeagues.get(allLeagues.size() - 1).getId() + 1;
  }

  public League findAvailableLeague() {
    List<League> allLeagues = findAll();

    if (allLeagues.isEmpty()) {
      return createLeague();
    }
    // If no empty leagues exist, get the latest created (last in list)
    League newestInactiveLeague = allLeagues.get(allLeagues.size() - 1);
    // Check if newest league is active, if true, return new league instead.
    if (Boolean.TRUE.equals(newestInactiveLeague.getIsActive())) {
      newestInactiveLeague = createLeague();
    }
    return newestInactiveLeague;
  }

  public List<Team> findAllTeamsInLeague(Long leagueId) {
    List<Team> teams = Objects.requireNonNull(leagueRepository.findById(leagueId).orElse(null)).getTeams();
    return teams;
  }

  public boolean timeToPick(Long leagueId) {
    User user = getNextToPick(leagueId);
    if (user != null) {
      int firstPickNumber = user.getTeam().getFirstPickNumber();
      int secondPickNumber = user.getTeam().getSecondPickNumber();

      return firstPickNumber == checkCurrentPickNumber(leagueId)
              || secondPickNumber == checkCurrentPickNumber(leagueId);
    }
    return false;
  }

  public User getNextToPick(Long leagueId) {
    int currentPickNumber = checkCurrentPickNumber(leagueId);
    User nextUserPick = null;
    List<Team> teamsInLeague = findAllTeamsInLeague(leagueId);
    for (Team team : teamsInLeague) {
//      if (timeToPick(leagueId)) {
//        nextUserPick = team.getUser();
//      }
      if (team.getFirstPickNumber() == currentPickNumber
              || team.getSecondPickNumber() == currentPickNumber) {
        nextUserPick = team.getUser();
      }
    }
    return nextUserPick;
  }

//  public String getNextToPickName(Long leagueId) {
//    String nextUserPick = null;
//    List<Team> teamsInLeague = findAllTeamsInLeague(leagueId);
//    for (Team team : teamsInLeague) {
////      if (timeToPick(leagueId)) {
////        nextUserPick = team.getUser().getUsername();
////      }
//      if (team.getFirstPickNumber() == currentPickNumber
//              || team.getSecondPickNumber() == currentPickNumber) {
//        nextUserPick = team.getUser().getUsername();
//      }
//    }
//    return nextUserPick;
//  }


//  public int getCurrentPickNumber(League league) {
//    List<Driver> undraftedDrivers = driverService.getUndraftedDrivers(league.getLeagueId());
//    if (league.getTeams().size() == 10 && undraftedDrivers.isEmpty()) {
//      activateLeague(league);
//    }
//    return 21 - undraftedDrivers.size();
//  }

  public int checkCurrentPickNumber(Long leagueId) {
    League league = leagueRepository.findById(leagueId).orElse(null);
    if (league != null) {
//    if (league.getTeams().size() == 10 && league.getCurrentPickNumber() > 20) {
      if (league.getCurrentPickNumber() > 20) {
        activateLeague(leagueId);
      }
      return league.getCurrentPickNumber();
    }
    return 22;
  }

  public void activateLeague(Long leagueId) {
    League league = findById(leagueId);
    league.setIsActive(true);
    league.setActiveTimestamp(LocalDateTime.now()
            .format(DateTimeFormatter.ofPattern("dd-MM-yy HH:mm")));
    leagueRepository.save(league);
  }

  public void deleteEmptyLeagues() {
    List<League> allLeagues = leagueRepository.findAll();
    for (League league : allLeagues) {
      if (league.getTeams().isEmpty()) {
        leagueRepository.delete(league);
      }
    }
  }

  public List<League> findAll() {
    return leagueRepository.findAll();
  }

  public void save(League league) {
    leagueRepository.save(league);
  }

  public League findById(Long leagueId) {
    return leagueRepository.findById(leagueId).orElse(null);
  }
}
