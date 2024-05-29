package me.niallmurray.slipstreamf1.repositories;

import me.niallmurray.slipstreamf1.domain.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {

  Team findByTeamName(String teamName);

}
