import React, { Fragment } from "react";
import CurrencyFormat from "react-currency-format";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  addToCart,
  loadCurrentItem,
} from "../../reduxMul/Shopping/shopping-actions";

const ProductList = (product) => {
  return (
    <Fragment>
      <article className="card card-product-list">
        <div className="row no-gutters">
          <aside className="col-md-3">
            <Link to={`detail/${product.data.id}`} className="img-wrap">
              <img src={product.data.imgurl} alt="img"></img>
            </Link>
          </aside>
          <div className="col-md-6">
            <div className="info-main">
              <Link to={`detail/${product.data.id}`} className="h5 title">
                {product.data.name}
              </Link>
              <p>{product.data.description}</p>
            </div>
          </div>
          <aside className="col-sm-3">
            <div className="info-aside">
              <div className="price-wrap">
                <CurrencyFormat
                  value={product.data.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"IDR "}
                  renderText={(value) => (
                    <span className="h5 price">{value}</span>
                  )}
                />
                <small className="text-muted">/per item</small>
              </div>
              <p className="mt-3">
                <Link
                  to={`detail/${product.data.id}`}
                  className="btn btn-outline-primary w-100"
                  onClick={() => product.loadCurrentItem(product.data)}
                >
                  <i className="fa "></i>Details
                </Link>
                <br />
                <button
                  className="btn  btn-primary mt-2 w-100"
                  onClick={() => product.addToCart(product.data.id)}
                >
                  <i className="fas fa-shopping-cart"></i>
                  <span className="text">Add to cart</span>
                </button>
              </p>
            </div>
          </aside>
        </div>
      </article>
    </Fragment>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    loadCurrentItem: (item) => dispatch(loadCurrentItem(item)),
  };
};
export default connect(null, mapDispatchToProps)(ProductList);
