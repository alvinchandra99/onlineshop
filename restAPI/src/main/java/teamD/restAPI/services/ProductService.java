package teamD.restAPI.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import teamD.restAPI.model.Product;
import teamD.restAPI.repos.ProductRepository;

@Service
@Transactional
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    JavaMailSender javaMailSender;


    public Page<Product> findAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public List<Product> search(String keyword) {
        return productRepository.search(keyword);
    }

    public List<Product> findByCategory_Id(Long id) {
        return productRepository.findByCategory_Id(id);
    }
    public Optional<Product> findById(Long id) {
        return productRepository.findById(id);
    }

    public void save(Product product) {
        if (product.getId() == null) {
            product.setCreatedAt(LocalDateTime.now().toString());
        }
        // product.setCreatedAt(productRepository.findById(product.getId()).get().getCreatedAt());
        product.setUpdatedAt(LocalDateTime.now().toString());
        productRepository.save(product);
    }

    public void delete(Long id) {
        productRepository.deleteById(id);
    }

    public void sendEmail() {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("alvinchandra99@gmail.com");
        msg.setSubject("Testing from Spring Boot");
        msg.setText("Hello World \n Spring Boot Email");
        javaMailSender.send(msg);
    }

}
