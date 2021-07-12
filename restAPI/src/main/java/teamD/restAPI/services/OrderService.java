package teamD.restAPI.services;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.transaction.TransactionScoped;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import teamD.restAPI.model.AppUser;
import teamD.restAPI.model.Order;
import teamD.restAPI.model.OrderDetail;
import teamD.restAPI.model.Product;
import teamD.restAPI.repos.OrderRepository;
import teamD.restAPI.repos.ProductRepository;

import com.midtrans.Config;
import com.midtrans.ConfigFactory;
import com.midtrans.httpclient.error.MidtransError;
import com.midtrans.service.MidtransSnapApi;

@Service
@TransactionScoped
public class OrderService {

    @Autowired
    OrderRepository orderRepository;

    @Autowired
    ProductRepository productRepository;

    public void save(Order order) {
        orderRepository.save(order);
    }
    
    public List<Order> findAll() {
        List<Order> orders = orderRepository.findAll();
        return orders;
    }

    public List<Order> findIdByAppUser(AppUser appUser){
        List<Order> orders = orderRepository.findIdByAppUser(appUser);
        return orders;
    }

    public Order findById(String id){
        return orderRepository.findById(id).get();
    }

    public void orderSuccess(String orderId){
        Order order = findById(orderId);

        for(OrderDetail orderDetail : order.getOrderDetail()){
            Product product = productRepository.findById(orderDetail.getProductId()).get();

            int productSold = product.getSold();
            int productStock = product.getStock();

            int buyQty = orderDetail.getQty();
            

            product.setStock(productStock - buyQty);
            product.setSold(productSold + buyQty);
            productRepository.save(product);
        }
        order.setStatus("accept");
        System.out.println("ORDER ; " + order.getId());
        orderRepository.save(order);
    }

    public String getToken(String id, int amount){
        
        Map<String, Object> params = new HashMap<>();
        
        Map<String, String> transactionDetails = new HashMap<>();
        transactionDetails.put("order_id", id.toString());
        transactionDetails.put("gross_amount", Integer.toString(amount));
                
        params.put("transaction_details", transactionDetails);

        try{
        MidtransSnapApi snapApi = new ConfigFactory(
            new Config("SB-Mid-server-vlNKLgb8jAZ_Dlg80rtL1NGr", "SB-Mid-server-vlNKLgb8jAZ_Dlg80rtL1NGr", false))
                    .getSnapApi();

        String transactionToken = snapApi.createTransactionToken(params);
        return transactionToken;
        }
        catch(MidtransError e){
            
        }
        return "";
    }

    public List<Order> findTop4ByAppUserOrderByOrderDateDesc(AppUser appUser){
        return orderRepository.findTop4ByAppUserOrderByOrderDateDesc(appUser);
    }

   
    
}
