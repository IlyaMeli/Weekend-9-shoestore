import React, { Component } from "react";
import "./App.css";
import dataApi from "./api";
import Product from "../src/componenets/Product/Product";
import Create from "../src/componenets/Create/Create";
import Update from "../src/componenets/Update/Update";

class App extends Component {
  state = { data: [], isLoading: true, isModalOpen: false };

  componentDidMount = async () => {
    try {
      const { data } = await dataApi.get("/products");
      this.setState({ data }, () => {
        this.setState({ isLoading: false });
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleUpdate = (id, value) => {
    const dataCopy = [...this.state.data];
    let objIdx = dataCopy.findIndex((element) => {
      return element.id === id;
    });
    const updatedItem = {
      ...dataCopy[objIdx],
      name: value.name,
      img_URL: value.img_URL,
      price: value.price,
    };
    dataCopy[objIdx] = updatedItem;
    this.setState({ data: dataCopy }, () => {
      console.log(this.state.data);
    });
  };

  toggleUpdateModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };

  createData = () => {
    const { data } = this.state;
    return data.map((product) => {
      return (
        <>
          {this.state.isModalOpen && (
            <Update handleSubmit={this.handleUpdate} id={product.id} />
          )}
          <Product
            key={product.id}
            product={product}
            delete={this.handleDelete}
            update={this.toggleUpdateModal}
          />
        </>
      );
    });
  };

  handleDelete = (id) => {
    const { data } = this.state;
    const newData = data.filter((item) => item.id !== id);
    this.setState({ data: newData });
  };

  render() {
    return (
      <div className="container">
        <>
          <Create />
        </>
        {this.state.isLoading ? (
          <h2>LOADING...</h2>
        ) : (
          <div className="container">{this.createData()}</div>
        )}
      </div>
    );
  }
}

export default App;
