import React, { Fragment } from "react";

const SideCart = (props) => {
  return (
    <Fragment>
      <aside className="col-md-3">
        <div className="card">
          <div className="card-body">
            <dl className="dlist-align">
              <dt>Total items:</dt>
              <dd className="text-right">{props.totalItems} items</dd>
            </dl>
            <dl className="dlist-align">
              <dt>Total price:</dt>
              <dd className="text-right">IDR {props.totalPrice}</dd>
            </dl>
            <hr></hr>
            <dl className="dlist-align">
              <dt>Total:</dt>
              <dd className="text-right  h5">
                <strong>IDR {props.totalPrice}</strong>
              </dd>
            </dl>
          </div>
        </div>
      </aside>
    </Fragment>
  );
};
export default SideCart;
