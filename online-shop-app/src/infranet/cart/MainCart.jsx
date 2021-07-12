import React, { Fragment, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  adjustItemQty,
  removeFromCart,
} from "../../reduxMul/Shopping/shopping-actions";

const MainCart = ({ item, adjustQty, removeFromCart }) => {
  const [input, setInput] = useState(item.qty);

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    adjustQty(item.id, e.target.value);
  };
  return (
    <Fragment>
      <tr>
        <td>
          <figure className="itemside">
            <div className="aside">
              <img src={item.imgurl} className="img-sm" alt="img"></img>
            </div>
            <figcaption className="info">
              <p className="title text-dark">{item.name}</p>
            </figcaption>
          </figure>
        </td>
        <td>
          <div className="form-group col-md flex-grow-0">
            <div className="input-group-append input-group-prepend">
              <input
                min="1"
                name="qty"
                type="number"
                className="form-control "
                value={input}
                onChange={onChangeHandler}
              ></input>
            </div>
          </div>
        </td>
        <td>
          <div className="price-wrap">
            <CurrencyFormat
              value={item.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"IDR "}
              renderText={(value) => <var className="price">{value}</var>}
            />
          </div>
        </td>
        <td>
          <div className="price-wrap">
            <CurrencyFormat
              value={item.price * item.qty}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"IDR "}
              renderText={(value) => <var className="price">{value}</var>}
            />
          </div>
        </td>
        <td className="text-right">
          <Link
            className="btn btn-light"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </Link>
        </td>
      </tr>
    </Fragment>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (id, value) => dispatch(adjustItemQty(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};
export default connect(null, mapDispatchToProps)(MainCart);
