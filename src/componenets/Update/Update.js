import React, { Component } from "react";
import "./update.css";

export default class Update extends Component {
  state = {
    name: "",
    img_URL: "",
    price: "",
  };

  handleChange = (item, e) => {
    this.setState({ [item]: e.target.value });
  };

  handleSubmitBtn = () => {
    this.props.handleSubmit(this.props.id, this.state);
  };

  render() {
    return (
      <div className="update-container">
        <div className="update-content">
          <label className="name-l">Name:</label>
          <input
            onChange={(e) => this.handleChange("name", e)}
            className="name"
          />
          <label className="img-l">Img:</label>
          <input
            onChange={(e) => this.handleChange("img_URL", e)}
            className="img_URL"
          />
          <label className="Price-l">Price:</label>
          <input
            onChange={(e) => this.handleChange("price", e)}
            className="price"
          />
          <button onClick={this.handleSubmitBtn} className="submit-btn">
            SUBMIT
          </button>
        </div>
      </div>
    );
  }
}
