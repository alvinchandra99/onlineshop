package teamD.restAPI.repos;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import teamD.restAPI.model.Category;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Integer> {
    List<Category> findAll();
}
