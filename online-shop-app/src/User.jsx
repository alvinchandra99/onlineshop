import React, { Component } from "react";
import Cart from "./public/user/Cart";
import Contact from "./public/user/Contact";
import Home from "./public/user/Home";
import Product from "./public/user/Product";
import Profile from "./public/user/Profile";
import Header from "./infranet/Header";
import Footer from "./infranet/Footer";
import { Route } from "react-router-dom";
export default class User extends Component {
  render() {
    return (
      <>
        <Header />
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/product" component={Product}></Route>
        <Route exact path="/cart" component={Cart}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route exact path="/contact" component={Contact}></Route>
        <Footer />
      </>
    );
  }
}
