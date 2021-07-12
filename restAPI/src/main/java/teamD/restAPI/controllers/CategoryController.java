package teamD.restAPI.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import teamD.restAPI.model.Category;
import teamD.restAPI.repos.CategoryRepository;

@RestController
@CrossOrigin("http://localhost:3000")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/category")
    public List<Category> findCategory() {
        return categoryRepository.findAll();
    }
    @PostMapping("/category/new")
    public void saveCategory(@RequestBody Category category) {
        categoryRepository.save(category);
    }
}
