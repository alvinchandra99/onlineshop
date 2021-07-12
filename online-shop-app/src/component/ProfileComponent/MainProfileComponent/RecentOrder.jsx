import React, { Component } from "react";
import { connect } from "react-redux";
import CurrencyFormat from "react-currency-format";
class RecentOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.orders.orderDetail,
    };
  }

  iterItem() {
    let list = [];
    for (let iter = 0; iter < this.state.order.length; iter++) {
      let product = this.props.products.find(
        (productS) => productS.id === this.state.order[iter].productId
      );
      let name = product.name;
      let price = product.price;
      let image = product.imgurl;
      let amount = this.state.order[iter].qty;
      list.push(
        <figure className="itemside">
          <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
              <div className="row">
                <img src={image} className="border img-sm" />
                <div className="col sm-12">
                  <figcaption className="info">
                    <p>{name} </p>
                    <p>Quantity: {amount}</p>
                    <CurrencyFormat
                      value={price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"IDR "}
                      renderText={(value) => (
                        <span className="h5 price">{value}</span>
                      )}
                    />
                  </figcaption>
                </div>
              </div>
            </div>
          </div>
        </figure>
      );
    }
    return <>{list}</>;
  }
  render() {
    console.log(this.props.orders.amount);
    return (
      <>
        <div className="col-md-12">
          <div className="card card-primary">
            <div className="card-header">
              <div className="row">
                <div className="col sm-6">
                  <p>
                    Order Id: <strong>{this.props.orders.id}</strong>
                  </p>
                  <p>Order Date: {this.props.orders.orderDate}</p>
                </div>
                <div className="col sm-6" style={{ textAlign: "right" }}>
                  <CurrencyFormat
                    value={this.props.orders.amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"IDR "}
                    renderText={(value) => (
                      <strong>Order Amount: {value}</strong>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-sm-12">{this.iterItem()}</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.shop.products,
  };
};

export default connect(mapStateToProps)(RecentOrder);
