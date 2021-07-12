import React, { Component } from "react";
import ReactMidTrans from "./ReactMidTrans";
import Service from "../../service/Service";
import { connect } from "react-redux";
import CurrencyFormat from "react-currency-format";

class Order extends Component {
  constructor(match) {
    super(match);
    this.state = {
      orderId: this.props.match.params.orderId,
      order: {},
      load: false,
    };
  }
  componentDidMount() {
    this.getOrderData();
  }

  componentDidUpdate() {
    if (this.state.load === false) {
      this.setState({ load: true });
    }
  }

  detail = () => {};

  async getOrderData() {
    Service.getData("order/" + this.state.orderId, true)
      .then((res) => res.data)
      .then((data) => {
        this.setState({ order: data });
      });
  }

  render() {
    return (
      <>
        <div className="m-5">
          <article className="card order-item mb-4">
            <header className="card-header">
              <strong className="d-inline-block mr-3">
                Order ID: {this.state.order.id}
              </strong>
              <span>Order Date: {this.state.order.orderDate}</span>
            </header>
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h6 className="text-muted">Delivery to</h6>
                  {this.state.load && this.state.order.appUser.address}
                </div>
                <div className="col-md-4">
                  <h6 className="text-muted">Status Payment</h6>
                  <p>{this.state.order.status}</p>
                </div>
              </div>
            </div>
          </article>
          <div className="row">
            <main className="col-md-9">
              <div className="card">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="text-muted">
                      <tr className="small text-uppercase">
                        <th scope="col">Product</th>
                        <th scope="col" width="150">
                          Quantity
                        </th>
                        <th scope="col" width="150">
                          Price
                        </th>
                        <th scope="col" width="150">
                          Total Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.load === true &&
                        this.state.order.orderDetail.map((detail) => {
                          const data = this.props.products.find(
                            (product) => product.id == detail.productId
                          );
                          return (
                            <tr>
                              <td>
                                <figure className="itemside">
                                  <div className="aside">
                                    <img
                                      src={data.imgurl}
                                      className="img-xs border"
                                      alt="img"
                                    ></img>
                                  </div>
                                  <figcaption className="info">
                                    <p className="title text-dark">
                                      {data.name}
                                    </p>
                                  </figcaption>
                                </figure>
                              </td>
                              <td>
                                <p className="font-weight-bold">{detail.qty} Pcs</p>
                              </td>
                              <td>
                                <CurrencyFormat
                                  value={data.price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"IDR "}
                                  renderText={(value) => (
                                    <p className="font-weight-bold">{value}</p>
                                  )}
                                />
                              </td>
                              <td>
                                <CurrencyFormat
                                  value={detail.qty * data.price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"IDR "}
                                  renderText={(value) => (
                                    <p className="font-weight-bold">{value}</p>
                                  )}
                                />
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </main>
            <aside className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <dl className="dlist-align">
                    <dt>Total Pay:</dt>
                    <CurrencyFormat
                      value={this.state.order.amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"IDR "}
                      renderText={(value) => (
                        <dd className="font-weight-bold text-right">{value}</dd>
                      )}
                    />
                  </dl>
                  <hr></hr>
                  <dl className="dlist-align">
                    <ReactMidTrans
                      client-key="SB-Mid-server-vlNKLgb8jAZ_Dlg80rtL1NGr"
                      token={this.state.order.paymentToken}
                    >
                      <button
                        style={{ width: "200px" }}
                        className="btn btn-primary m-auto float-right"
                      >
                        Pay!
                      </button>
                    </ReactMidTrans>
                  </dl>
                </div>
              </div>
            </aside>
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

export default connect(mapStateToProps)(Order);
