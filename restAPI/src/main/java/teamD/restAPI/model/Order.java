package teamD.restAPI.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tbl_order")
public class Order {
    
    @Id
    private String id;

    private int amount;

    @Builder.Default
    private String status = "pending";

    private String paymentToken;

    @OneToMany(cascade = CascadeType.ALL)
    public List<OrderDetail> orderDetail;

    @OneToOne
    @JoinColumn(name = "userId")
    public AppUser appUser;

    private String orderDate;


}
