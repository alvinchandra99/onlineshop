import React from "react";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";

const ItemCardMed = (props) => {
  return (
    <div className="col-xl-3 col-lg-3 col-md-4 col-6">
      <div className="card card-product-grid">
        <Link to="#" className="img-wrap">
          <img src={props.data.imgurl} alt="img" />
        </Link>
        <figcaption className="info-wrap">
          <div>
            <Link to="#" className="text-muted">
              {props.data.category_name}
            </Link>
            <Link to="#" className="title">
              {props.data.name}
            </Link>
          </div>
          <CurrencyFormat
            value={props.data.price}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"IDR "}
            renderText={(value) => <div className="price h5 mt-2">{value}</div>}
          />
        </figcaption>
      </div>
    </div>
  );
};

export default ItemCardMed;
