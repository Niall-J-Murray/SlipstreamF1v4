package me.niallmurray.slipstreamf1.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RefreshToken {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @OneToOne
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;
  private String tokenValue;
  private Date expirationTime;

  public RefreshToken(User user, String tokenValue, Date expirationTime) {
    super();
    this.user = user;
    this.tokenValue = tokenValue;
    this.expirationTime = expirationTime;
  }
}
