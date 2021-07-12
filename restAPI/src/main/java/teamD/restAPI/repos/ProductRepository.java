package teamD.restAPI.repos;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import teamD.restAPI.model.Product;

@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {

    public Optional<Product> findById(@Param("id") Long id);

    @Query(nativeQuery = true, value = "SELECT * FROM tbl_product WHERE name LIKE %:keyword% OR description LIKE %:keyword% LIMIT 5")
    public List<Product> search(@Param("keyword") String keyword);

    public Page<Product> findAll(Pageable pageable);

    @Query(nativeQuery = true, value = "SELECT * FROM tbl_product where category_id = :id")
    public List<Product> findByCategory_Id(Long id);
    
    public void deleteById(Long id);

}
