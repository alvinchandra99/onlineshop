package teamD.restAPI.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import teamD.restAPI.model.AppUser;
import teamD.restAPI.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    List<Order> findIdByAppUser(AppUser appUser);

    List<Order> findTop4ByAppUserOrderByOrderDateDesc(AppUser appUser);
}
