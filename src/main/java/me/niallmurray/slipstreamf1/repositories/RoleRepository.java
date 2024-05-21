package me.niallmurray.slipstreamf1.repositories;


import me.niallmurray.slipstreamf1.domain.ERole;
import me.niallmurray.slipstreamf1.domain.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
  Optional<Role> findByName(ERole name);
}
