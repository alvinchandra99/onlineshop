import React, { Fragment } from "react";
import ProductSortBy from "../../infranet/product/ProductSortBy";
import ProductList from "../../infranet/product/ProductList";
import Service from "../../service/Service";
import ProductPagination from "../../infranet/product/ProductPagination";

class Product extends React.Component {
  constructor(match) {
    super(match);
    console.log("PARAMS IN CONSTRUCTOR", this.props.params);
  }
  state = {
    products: [],
    pagination: {},
    currentPages: 0,
    sortby: "",
    listKey: 0,
    keyword: this.props.match.params.keyword,
  };

  componentDidMount() {
    this.state.keyword ? this.getProductByKeyword() : this.getProductData();
  }
  componentWillUpdate(prevProps) {
    if (this.state.keyword !== prevProps.match.params.keyword) {
      this.state.keyword = prevProps.match.params.keyword;
      this.getProductByKeyword();
    }
  }

  getProductByKeyword() {
    Service.getData("product/search/" + this.state.keyword).then((res) =>
      this.setState({ products: res.data })
    );
  }

  getProductData() {
    let sortbyUrl = "";
    if (this.state.sortby !== "") {
      sortbyUrl = "/" + this.state.sortby + "/asc";
    }
    Service.getData(`products/3/${this.state.currentPages}${sortbyUrl}`).then(
      (result) => {
        this.setState({
          products: result.data.content,
          pagination: result.data,
        });
      }
    );
  }

  handleCallbackPagination = (pageChild) => {
    this.state.currentPages = pageChild - 1;
    this.getProductData();
  };

  handleCallBackSortby = (sortby) => {
    this.state.sortby = sortby;
    this.getProductData();
  };

  render() {
    return (
      <Fragment>
        <section className="section-content padding-y ml-5 mr-5">
          <div className="container">
            <div className="row">
              <main className="col-md-10 m-auto" key={this.state.listKey}>
                <ProductSortBy
                  parentCallback={this.handleCallBackSortby}
                  totalItem={this.state.pagination.totalElements}
                />
                {this.state.products.map((product) => {
                  return (
                    <>
                      <ProductList key={product.id} data={product} />
                    </>
                  );
                })}
                <ProductPagination
                  pagination={this.state.pagination}
                  parentCallback={this.handleCallbackPagination}
                />
              </main>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}
export default Product;
