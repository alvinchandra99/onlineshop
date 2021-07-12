import React, { Fragment } from "react";
import ImgSlider from "../../component/HomeComponents/ImgSlider";
import RecoItem from "../../component/HomeComponents/RecoItem";
import NewItems from "../../component/HomeComponents/NewItems";
export default class Home extends React.Component {
  render() {
    return (
      <Fragment>
        <ImgSlider />
        <div className="container">
          <RecoItem />
          <NewItems />
        </div>
      </Fragment>
    );
  }
}
