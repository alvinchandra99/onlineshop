package teamD.restAPI.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductSeed {

    private int id;

    private String title;

    private int price;

    private String description;

    private String category;

    private String image;
}
