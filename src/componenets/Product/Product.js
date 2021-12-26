import React, { Component } from "react";
import "./product.css";

export default class Products extends Component {
  render() {
    const { product } = this.props;
    return (
      <div className="product-container">
        <img className="card-img" src={product.img_URL} alt={product.name} />
        <div className="content">
          <div className="card-title">{product.name}</div>
          <div className="card-price">Price: {product.price}$</div>
        </div>
        <div className="card-buttons">
          <div
            className="card-delete"
            onClick={() => this.props.delete(product.id)}
          >
            Delete
          </div>
          <div className="card-update" onClick={this.props.update}>
            Update
          </div>
        </div>
      </div>
    );
  }
}
