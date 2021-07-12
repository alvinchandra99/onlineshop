import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import Service from "../service/Service";

export default class PurchaseButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: "",
      redirect: false,
    };
  }
  async makePurchase() {
    let addedItem = [];
    this.props.cart.map((item) => {
      addedItem.push({ id: item.id, qty: item.qty });
    });

    let totalPrice = 0;
    this.props.cart.forEach((item) => {
      totalPrice += item.qty * item.price;
    });

    let order = {};
    order.username = localStorage.getItem("username");
    order.orderDetailDto = addedItem;
    order.amount = totalPrice;

    // let config = {
    //   headers: {
    //     Authorization:
    //       "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhYmMiLCJhdXRoIjoiVVNFUiIsImlhdCI6MTYyMzY3NTQxNywiZXhwIjoxNjIzOTM0NjE3fQ.5Qpn8tjw_WjFTCn-BlpkID8oQIEM6nhaagPrvSoXXEI",
    //   },
    // };

    // const response = await axios
    //   .post("http://localhost:8080/api/order/submit", order, config)
    //   .then((res) => res.data);
    // return await response;

    const response = Service.postData("order/submit", order, true).then(
      (res) => res.data
    );
    return await response;
  }

  async getToken() {
    this.makePurchase().then((data) => {
      this.setState({ redirect: true, orderId: data });
    });
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to={`/order/${this.state.orderId}`} />;
    }
    return (
      <button
        onClick={() => {
          this.getToken();
        }}
        className="btn btn-primary float-md-right"
      >
        Make Purchase <i className="fa fa-chevron-right"></i>
      </button>
    );
  }
}
