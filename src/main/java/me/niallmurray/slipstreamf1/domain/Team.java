package me.niallmurray.slipstreamf1.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "team",
        uniqueConstraints =
        @UniqueConstraint(columnNames = {"league_id", "firstPickNumber"}))
public class Team implements Serializable {
  @Serial
  private static final long serialVersionUID = 1L;
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @JoinColumn(name = "user_id")
  @JsonIgnore
  @OneToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST})
  //1-1 for now, see comment in User.class
  private User user;
  @Column()
  private String displayedUsername;
  @Column()
  private String teamName;
  @Column()
  private Boolean isTestTeam;
  @Column()
  private Integer firstPickNumber;
  @Column()
  private Integer secondPickNumber;
  @Column()
  private Double firstPickStartingPoints;
  @Column()
  private Double secondPickStartingPoints;
  @Column()
  private Double teamPoints;
  @Column()
  private Integer ranking;
  @Column()
  private Long leagueNumber;
  @JoinColumn(name = "league_id")
  @ManyToOne()
  @JsonIgnore
  private League league;
  @JsonIgnore
  @Column()
  @ManyToMany(fetch = FetchType.LAZY,
          cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.DETACH},
          mappedBy = "teams")
  private List<Driver> drivers = new ArrayList<>(6);

  @Override
  public String toString() {
    return "Team:" +
            " teamId= " + id +
//            ", user= " + user.getUsername() +
            ", username= " + displayedUsername +
            ", teamName=' " + teamName + '\'' +
            ", firstPick= " + firstPickNumber +
            ", secondPick= " + secondPickNumber;

  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (!(o instanceof Team team)) return false;
    return Objects.equals(id, team.id) && Objects.equals(teamName, team.teamName);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id, teamName);
  }
}
