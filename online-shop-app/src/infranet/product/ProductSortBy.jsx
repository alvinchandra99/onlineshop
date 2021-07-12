import React, { Fragment } from "react";

export default function ProductSortBy(props) {
  const onTrigger = (event) => {
    props.parentCallback(event.target.value);
  };
  return (
    <Fragment>
      <header className="mb-3">
        <div className="form-inline">
          <strong className="mr-md-auto">{props.totalItem} Items found </strong>
          <select className="mr-2 form-control" onChange={onTrigger}>
            <option value="updatedAt">Latest items</option>
            <option value="price">Cheapest</option>
          </select>
        </div>
      </header>
    </Fragment>
  );
}
