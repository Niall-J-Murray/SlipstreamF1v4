package me.niallmurray.slipstreamf1.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;


@Entity
@NoArgsConstructor
@Getter
@Setter
@Table(name = "league")
public class League implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @Column(nullable = false, unique = true)
  private String leagueName;
  @Column()
  private String creationTimestamp;
  @Column()
  private Boolean isPracticeLeague;
  @Column()
  private Integer currentPickNumber;
  @Column()
  private String lastDriverPickedName;
  @Column()
  private String lastPickTime;
  @Column()
  private Boolean isActive;
  @Column()
  private String activeTimestamp;
  @ManyToMany(
          fetch = FetchType.LAZY,
          cascade = {CascadeType.MERGE, CascadeType.PERSIST})
  private List<Team> teams = new ArrayList<>(20);

  @Override
  public String toString() {
    return "Id= " + id +
            ", Name= " + leagueName +
            ", Creation Time=" + creationTimestamp +
            ", No. of Teams= " + teams.size();
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    League league = (League) o;
    return Objects.equals(id, league.id) && Objects.equals(leagueName, league.leagueName);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, leagueName);
  }
}
