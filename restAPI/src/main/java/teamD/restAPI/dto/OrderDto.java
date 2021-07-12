package teamD.restAPI.dto;

import java.util.List;

import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDto {

    @NotEmpty
    private String username;

    @NotEmpty
    private int amount;

    @NotEmpty
    private List<OrderDetailDto> orderDetailDto;
    
}
