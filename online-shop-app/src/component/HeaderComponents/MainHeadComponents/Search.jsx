import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      keyword: "",
    };
  }
  handleChange(e) {
    this.setState({
      keyword: e.target.value,
    });
  }
  doSearch() {
    this.props.history.push("/product/" + this.state.keyword);
  }

  render() {
    return (
      <div className="col-xl-6 col-lg-5 col-md-6">
        <form action="#" className="search-header">
          <div className="input-group w-100">
            <select className="custom-select border-right" name="category_name">
              <option value="">All type</option>
              <option value="codex">Special</option>
              <option value="comments">Only best</option>
              <option value="content">Latest</option>
            </select>
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              onChange={(e) => this.handleChange(e)}
            />

            <div className="input-group-append">
              <Link to={`/product/${this.state.keyword}`}>
                <button className="btn btn-primary" type="submit">
                  <i className="fa fa-search"></i> Search
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
