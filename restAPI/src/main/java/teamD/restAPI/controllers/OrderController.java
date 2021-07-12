package teamD.restAPI.controllers;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.midtrans.Config;
import com.midtrans.ConfigFactory;
import com.midtrans.httpclient.error.MidtransError;
import com.midtrans.service.MidtransCoreApi;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import teamD.restAPI.dto.OrderDetailDto;
import teamD.restAPI.dto.OrderDto;
import teamD.restAPI.model.AppUser;
import teamD.restAPI.model.Order;
import teamD.restAPI.model.OrderDetail;
import teamD.restAPI.services.AppUserService;
import teamD.restAPI.services.OrderService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private AppUserService appUserService;

    @Autowired
    private OrderService orderService;

    @PostMapping("/submit")
    public String submit(@RequestBody OrderDto orderDto) {
        System.out.println(orderDto.getUsername());

        // Find UserId By Username
        String username = orderDto.getUsername();
        Long userId = appUserService.findIdByUsername(username);

        AppUser user = new AppUser();
        user.setId(userId);

        // Mapping OrderDto to Order Entity
        Order order = new Order();
        order.setAmount(orderDto.getAmount());
        order.setAppUser(user);

        // Mapping OrderDetailDto to OrderDetail Entitiy
        List<OrderDetail> orderDetails = new ArrayList<OrderDetail>();
        for (OrderDetailDto orderDetailDto : orderDto.getOrderDetailDto()) {
            OrderDetail orderDetail = new OrderDetail();
            orderDetail.setProductId(orderDetailDto.getId());
            orderDetail.setQty(orderDetailDto.getQty());
            orderDetails.add(orderDetail);
        }
        order.setOrderDetail(orderDetails);

        UUID randId = UUID.randomUUID();
        String orderId = randId.toString();

        // Get Token And Then Save
        String paymentToken = orderService.getToken(orderId, orderDto.getAmount());
        order.setId(orderId);
        order.setPaymentToken(paymentToken);
        order.setOrderDate(LocalDate.now().toString());
        orderService.save(order);

        return orderId;

    }

    @PostMapping(value = "/notification", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> handleNotification(@RequestBody Map<String, Object> response) throws MidtransError {
        String notifResponse = null;

        MidtransCoreApi coreApi = new ConfigFactory(
                new Config("SB-Mid-server-vlNKLgb8jAZ_Dlg80rtL1NGr", "SB-Mid-server-vlNKLgb8jAZ_Dlg80rtL1NGr", false))
                        .getCoreApi();

        if (!(response.isEmpty())) {
            // Get Order ID from notification body
            String orderId = (String) response.get("order_id");

            // Get status transaction to api with order id
            JSONObject transactionResult = coreApi.checkTransaction(orderId);

            String transactionStatus = (String) transactionResult.get("transaction_status");
            String fraudStatus = (String) transactionResult.get("fraud_status");

            notifResponse = "Transaction notification received. Order ID: " + orderId + ". Transaction status: "
                    + transactionStatus + ". Fraud status: " + fraudStatus;
            System.out.println(notifResponse);

            if (transactionStatus.equals("settlement")) {
                if (fraudStatus.equals("challenge")) {
                    // TODO set transaction status on your database to 'challenge' e.g: 'Payment
                    // status challenged. Please take action on your Merchant Administration Portal
                } else if (fraudStatus.equals("accept")) {
                    System.out.println("BEFORE CALL ORDER SERVICE");
                    orderService.orderSuccess(orderId);
                }
            } else if (transactionStatus.equals("cancel") || transactionStatus.equals("deny")
                    || transactionStatus.equals("expire")) {
                // TODO set transaction status on your database to 'failure'
            } else if (transactionStatus.equals("pending")) {
                // TODO set transaction status on your database to 'pending' / waiting payment
            }
        }

        return new ResponseEntity<>(notifResponse, HttpStatus.OK);
    }

    @GetMapping("/user/recent/{username}")
    public List<Order> getOrdersDetail(@PathVariable String username) {
        System.out.println(username);

        // Find userId by Username
        Long userId = appUserService.findIdByUsername(username);

        // Search Order Match with userId
        AppUser appUser = new AppUser();
        appUser.setId(userId);
        List<Order> orders = orderService.findTop4ByAppUserOrderByOrderDateDesc(appUser);

        for (Order order : orders) {
            order.getAppUser().setPassword(null);
        }
        return orders;
    }

    @GetMapping("/user/{username}")
    public List<Order> getOrders(@PathVariable String username) {
        System.out.println(username);

        // Find userId by Username
        Long userId = appUserService.findIdByUsername(username);

        // Search Order Match with userId
        AppUser appUser = new AppUser();
        appUser.setId(userId);
        List<Order> orders = orderService.findIdByAppUser(appUser);

        for (Order order : orders) {
            order.getAppUser().setPassword(null);
        }
        return orders;
    }
    @GetMapping("/{orderId}")
    public Order getOrderDetail(@PathVariable String orderId) {
        Order order = orderService.findById(orderId);
        order.getAppUser().setPassword(null);
        return order;
    }

    @GetMapping("/get/all") 
    public List<Order> getAllOrder(){
        return orderService.findAll();
    }    

}
