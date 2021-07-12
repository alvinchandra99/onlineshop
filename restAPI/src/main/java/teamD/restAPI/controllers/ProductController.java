package teamD.restAPI.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import teamD.restAPI.dto.ProductDto;
import teamD.restAPI.model.Category;
import teamD.restAPI.model.Product;
import teamD.restAPI.services.ProductService;

@RestController
@CrossOrigin("http://localhost:3000")
public class ProductController {

    @Autowired
    ProductService productService;

    @GetMapping("/product/{id}")
    public Product findById(@PathVariable Long id) {
        return productService.findById(id).get();
    }

    @PostMapping(value = "/product/save", consumes = "multipart/form-data")
    public void save(@ModelAttribute ProductDto productDto, RedirectAttributes redirectAttributes) {
        // Mapping ProductDto to Product Entity
        ModelMapper modelMapper = new ModelMapper();
        Product product = modelMapper.map(productDto, Product.class);

        if (productDto.getImage() != null) {
            try {
                String pathUrl = "D:/Bootcamp/Week 1/projectakhir/clone 2/sdlc-onlineshop/online-shop-app/public/asset/images/product/";
                String baseUrl = "http://localhost:3000/asset/images/product/";

                // Get Image File From FrontENd
                MultipartFile image = productDto.getImage();
                byte[] bytes = image.getBytes();

                // Generate Random Img name & Rewrite
                String fileType = image.getContentType();
                String imageEx = fileType.substring(fileType.lastIndexOf("/") + 1);
                UUID randId = UUID.randomUUID();
                String imgFileName = randId.toString();
                String imgUrl = imgFileName + "." + imageEx;
                Path path = Paths.get(pathUrl + imgUrl);
                Files.write(path, bytes);

                product.setImgurl(baseUrl + imgUrl);

            } catch (IOException exception) {
                exception.printStackTrace();
            }
        }

        // Mapping Product dto to Category Entity;
        Category category = new Category();
        category.setId(Long.parseLong(productDto.getCategoryId()));
        // category.setName(productDto.getCategoryName());
        product.setCategory(category);

        // Save Product
        productService.save(product);
    }

    @PostMapping("/product/delete/{id}")
    public void delete(@PathVariable("id") Long id) {
        productService.delete(id);
    }

    @GetMapping("/product/search/{keyword}")
    public List<Product> search(@PathVariable String keyword) {
        return productService.search(keyword);
    }

    @GetMapping("/product/category/{category}")
    public List<Product> findByCategory_Id(@PathVariable("category") Long id) {
        return productService.findByCategory_Id(id);
    }

    @GetMapping("/products/{size}/{page}")
    public Page<Product> findAll(@PathVariable("size") int size, @PathVariable("page") int page) {
        Pageable pageable = PageRequest.of(page, size);
        return productService.findAll(pageable);
    }

    @GetMapping("/products/{size}/{page}/{sortby}/{sort}")
    public Page<Product> findAll(@PathVariable("size") int size, @PathVariable("page") int page,
            @PathVariable("sortby") String sortby, @PathVariable("sort") String sort) {

        if (sort.equals("asc")) {
            Pageable pageable = PageRequest.of(page, size, Sort.by(sortby).ascending());
            return productService.findAll(pageable);
        }
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortby).descending());
        return productService.findAll(pageable);
    }

}
