package vn.edu.hcmuaf.cdw.ShopThoiTrang.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import vn.edu.hcmuaf.cdw.ShopThoiTrang.entity.deserializer.GrantedAuthorityDeserializer;

import java.sql.Date;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"userInfo"})
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotNull(message = "Username is required")
    @Column(name = "username")
    private String username;

    @JsonIgnore
    @NotNull(message = "Password is required")
    @Column(name = "password_encrypted")
    private String passwordEncrypted;

    @NotNull(message = "Enabled is required")
    @Column(name = "enabled")
    private boolean enabled;

    @NotNull(message = "Deleted is required")
    @Column(name = "deleted")
    private boolean deleted;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private UserInfo userInfo;

    @JsonIgnore
    @OneToMany(mappedBy = "reviewer", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Review> reviews;

    @JsonIgnore
    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<Order> orders;


    @ManyToOne
    @NotNull(message = "Role is required")
    @JoinTable(
            name = "roles_users",
            joinColumns = @JoinColumn(
                    name = "user_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(
                    name = "role_id", referencedColumnName = "id"))
    private Role role;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ResourceVariation> resourceVariations;

    @Column(name = "created_date")
    private Date createdDate;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @JsonIgnore
    @Column(name = "updated_date")
    private Date updateDate;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by")
    private User updateBy;

    @Override
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Set<GrantedAuthority> authorities = new HashSet<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
        if (resourceVariations != null)
            resourceVariations.forEach(resourceVariation ->
                    resourceVariation.getPermissions().forEach(permission ->
                            authorities.add(new SimpleGrantedAuthority(resourceVariation.getResource().getName() + "_" + permission.getName()))));
        return authorities;
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return passwordEncrypted;
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }
}
