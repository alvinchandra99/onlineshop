import React from "react";
import { Link } from "react-router-dom";

const ProductPagination = (props) => {
  const totalPages = props.pagination.totalPages;
  const currentPages = props.pagination.number + 1;
  let pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  const onTrigger = (event) => {
    props.parentCallback(event);
  };

  return (
    <nav className="mb-4" aria-label="Page navigation sample">
      <ul className="pagination">
        <li className="page-item disabled">
          <Link className="page-link" to="#">
            Previous
          </Link>
        </li>
        {pages.map((page) => {
          if (page == currentPages) {
            return (
              <li className="page-item active">
                <button
                  className="page-link"
                  href="#"
                  onClick={() => onTrigger(page)}
                >
                  {page}
                </button>
              </li>
            );
          }
          return (
            <li className="page-item">
              <button
                className="page-link"
                href="#"
                onClick={() => onTrigger(page)}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li className="page-item">
          <Link className="page-link" to="#">
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default ProductPagination;
