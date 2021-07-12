package teamD.restAPI;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import teamD.restAPI.services.ProductService;


// import java.io.BufferedReader;
// import java.io.InputStreamReader;
// import java.net.URL;
// import java.net.URLConnection;
// import java.util.List;

// import com.fasterxml.jackson.core.type.TypeReference;
// import com.fasterxml.jackson.databind.ObjectMapper;


// import teamD.restAPI.dto.ProductSeed;
// import teamD.restAPI.model.Product;

@SpringBootApplication
public class RestApiApplication implements CommandLineRunner {

	@Autowired
	ProductService productService;

	public static void main(String[] args) {
		SpringApplication.run(RestApiApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		// URL url = new URL("https://fakestoreapi.com/products");
		// URLConnection uConnection = url.openConnection();
		// BufferedReader in = new BufferedReader(new InputStreamReader(uConnection.getInputStream()));
		// String content = in.readLine();

		// ObjectMapper mapper = new ObjectMapper();
		// List<ProductSeed> listProduct = mapper.readValue(content, new TypeReference<List<ProductSeed>>() {
		// });

		// for (ProductSeed productSeed : listProduct) {
		// 	Product product = new Product();
		// 	product.setName(productSeed.getTitle());
		// 	// product.setPrice(productSeed.getPrice());
		// 	product.setImgurl(productSeed.getImage());
		// 	product.setDescription(productSeed.getDescription());
		// 	productService.save(product);
		// }
	}
}
