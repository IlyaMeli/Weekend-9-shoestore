import React, { Component } from "react";
import "./create.css";

export default class Create extends Component {
  render() {
    return (
      <div onClick={this.props.create} className="create-container">
        <div>Create Product</div>
      </div>
    );
  }
}
