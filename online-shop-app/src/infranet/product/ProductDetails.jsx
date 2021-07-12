import axios from "axios";
import React, { Fragment, Component } from "react";
import CurrencyFormat from "react-currency-format";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../reduxMul/Shopping/shopping-actions";
import Service from "../../service/Service";

class ProductDetails extends Component {
  constructor(match) {
    super(match);
    this.state = {
      id: this.props.match.params.id,
      product: [],
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    console.log(this.state.id);
    Service.getData("product/" + this.state.id)
      .then((res) => res.data)
      .then((data) =>
        this.setState({
          product: data,
        })
      );
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          <aside className="col-md-6">
            <div className="card">
              <article className="gallery-wrap">
                <div className="img-big-wrap">
                  <div>
                    <Link href="#">
                      <img src={this.state.product.imgurl} alt="img"></img>
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </aside>
          <main className="col-md-6">
            <article className="product-info-aside">
              <h2 className="title mt-3">{this.state.product.name}</h2>
              <div className="mb-3">
                <CurrencyFormat
                  value={this.state.product.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"IDR "}
                  renderText={(value) => (
                    <var className="price h4">{value}</var>
                  )}
                />
              </div>
              <p>{this.state.product.description}</p>
              <dl className="row">
                <dt className="col-sm-3">Stock</dt>
                <dd className="col-sm-9">{this.state.product.stock}</dd>
              </dl>
              <div className="form-row  mt-4">
                <div className="form-group col-md">
                  <Link
                    className="btn  btn-primary"
                    onClick={() => this.props.addToCart(this.state.product.id)}
                  >
                    <i className="fas fa-shopping-cart"></i>
                    <span className="text">Add to cart</span>
                  </Link>
                </div>
              </div>
            </article>
          </main>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.shop.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
