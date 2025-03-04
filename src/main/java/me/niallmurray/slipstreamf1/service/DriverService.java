package me.niallmurray.slipstreamf1.service;

import jakarta.transaction.Transactional;
import me.niallmurray.slipstreamf1.domain.Driver;
import me.niallmurray.slipstreamf1.domain.Team;
import me.niallmurray.slipstreamf1.dto.DriverStanding;
import me.niallmurray.slipstreamf1.repositories.DriverRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class DriverService {
  @Autowired
  private DriverRepository driverRepository;
  @Autowired
  private LeagueService leagueService;

  public List<Driver> mapDTOToDrivers(List<DriverStanding> allDriverStandings) {
    List<Driver> drivers = new ArrayList<>();
    ModelMapper modelMapper = new ModelMapper();

    for (DriverStanding driverStanding : allDriverStandings) {
      Driver driver = modelMapper.map(driverStanding.driverDTO, Driver.class);
      driver.setStanding(Integer.parseInt(driverStanding.position));
      driver.setPoints(Double.parseDouble(driverStanding.points));
      driver.setConstructor(driverStanding.constructors.get(0).name.replace("Team", ""));
      drivers.add(driver);
    }
    return drivers;
  }

  public void addDrivers(List<Driver> drivers) {
    if (drivers != null) {
      for (Driver driver : drivers) {
        // Set current champ to car #1
        if (driver.getCarNumber() == 33) {
          driver.setCarNumber(1);
        }
        if (driverRepository.findByCarNumber(driver.getCarNumber()) == null) {
          driverRepository.save(driver);
        }
      }
    }
  }

  @Transactional
  public void updateDrivers(List<Driver> updatedDrivers) {
    for (Driver driver : updatedDrivers) {
      driverRepository.updatePoints(driver.getShortName(), driver.getPoints());
      driverRepository.updateStandings(driver.getShortName(), driver.getStanding());
    }
  }

//  public List<Driver> sortDriversStanding() {
//    return driverRepository.findAllByOrderByStandingAsc();
//  }

  public List<Driver> sortDriversStanding() {
    List<Driver> driverStandings = driverRepository.findAllByOrderByStandingAsc();
    for (Driver driver : driverStandings) {
      asteriskReplacedDrivers(driver, "Bearman");

    }
    return driverStandings;
  }

  public void asteriskReplacedDrivers(Driver driver, String surname) {
    if (driver.getSurname().equalsIgnoreCase(surname)) {
      driver.setSurname(driver.getSurname() + "*(inactive)");
    }
  }

  public List<Driver> removeInactiveDrivers() {
    // Filter out any drivers who are no longer active due to injury or being dropped by their team.
    List<Driver> driversStandings = sortDriversStanding();
 //   driversStandings.removeIf((driver -> driver.getShortName().equalsIgnoreCase("BEA")));
    return driversStandings;
  }

  public List<Driver> getUndraftedDrivers(Long leagueId) {
    List<Driver> undraftedDrivers = removeInactiveDrivers();
    List<Team> teams = leagueService.findById(leagueId).getTeams();
    for (Team team : teams) {
      List<Driver> drivers = team.getDrivers();
      undraftedDrivers.removeAll(drivers);
    }
    return undraftedDrivers;
  }

//  public List<Driver> getUndraftedDrivers(Long leagueId) {
//    List<Driver> undraftedDrivers = driverRepository.findAllByOrderByStandingAsc();
//    // Remove inactive de Vries and Lawson from pick options.
//    undraftedDrivers.remove(driverRepository.findByCarNumber(21));
//    undraftedDrivers.remove(driverRepository.findByCarNumber(15));
//    List<Team> teams = leagueService.findById(leagueId).getTeams();
//    for (Team team : teams) {
//      List<Driver> drivers = team.getDrivers();
//      undraftedDrivers.removeAll(drivers);
//    }
//    return undraftedDrivers;
//  }

  public Driver findById(Long driverId) {
    return driverRepository.findById(driverId).orElse(null);
  }

  public Driver findByCarNumber(Integer carNumber) {
    return driverRepository.findByCarNumber(carNumber);
  }

  public void save(Driver driver) {
    driverRepository.save(driver);
  }

}
