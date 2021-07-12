package teamD.restAPI.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseOrderDto {

    private String id;

    private String status;

    private String paymentToken;

    private int amount;

    private List<OrderDetailDto> orderDetails;

    private String username;

    private String address;

    
}
