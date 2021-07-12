import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import MainCart from "../../infranet/cart/MainCart";
import SideCart from "../../infranet/cart/SideCart";
import PurchaseButton from "../../component/PurchaseButton";
import { Link } from "react-router-dom";

const CartPage = ({ cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((item) => {
      items += item.qty;
      price += item.qty * item.price;
    });
    setTotalPrice(price);
    setTotalItems(items);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  return (
    <Fragment>
      <section className="section-content padding-y">
        <div className="container">
          <div className="row">
            <main className="col-md-9">
              <div className="card">
                <table className="table table-borderless table-shopping-cart">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width="120">
                        Quantity
                      </th>
                      <th scope="col" width="120">
                        Price
                      </th>
                      <th scope="col" width="120">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <MainCart key={item.id} item={item} />
                    ))}
                  </tbody>
                </table>

                <div className="card-body border-top">
                  <PurchaseButton cart={cart} />

                  <Link to="/" className="btn btn-light">
                    <i className="fa fa-chevron-left"></i> Continue shopping
                  </Link>
                </div>
              </div>
            </main>
            <SideCart totalPrice={totalPrice} totalItems={totalItems} />
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(CartPage);
