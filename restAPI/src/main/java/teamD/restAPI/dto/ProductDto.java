package teamD.restAPI.dto;

import javax.validation.constraints.NotEmpty;

import org.springframework.web.multipart.MultipartFile;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {

    private Long id;

    @NotEmpty
    private String name;

    @NotEmpty
    private String description;

    
    @NotEmpty
    private String stock;

    @NotEmpty
    private int price;

    private MultipartFile image;

    @NotEmpty
    public String categoryId;
}
