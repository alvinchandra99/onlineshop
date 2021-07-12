import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import WidgetsItem from "./WidgetsItem";

const Widgets = ({ cart }) => {
  const [cartCount, setCarCount] = useState(0);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });

    setCarCount(count);
  }, [cart, cartCount]);

  return (
    <div className="col-xl-4 col-lg-4 col-md-6">
      <div className="widgets-wrap float-md-right">
        <WidgetsItem to="/profile" icon="fa fa-user" text="My profile" />
        <WidgetsItem to="/chat" icon="fa fa-comment-dots" text="Message" />
        <WidgetsItem
          to="/cart"
          icon="fa fa-shopping-cart"
          text="Cart"
          notify={cartCount}
          className="notify"
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(Widgets);
