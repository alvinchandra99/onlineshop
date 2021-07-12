package teamD.restAPI.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import teamD.restAPI.model.AppUser;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findById(@Param("id") Long id);
    Optional<AppUser> findByEmail(String email);
    List<AppUser> findAll();
}
