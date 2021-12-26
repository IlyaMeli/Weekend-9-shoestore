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

  handleCreate = async () => {
    let dataCopy = [...this.state.data];
    const newItem = {
      name: "random",
      img_URL:
        "https://lh3.googleusercontent.com/proxy/pqVYtp2QpzyjY_FA1dATFd_TQyPRCftLqAOsWH8jsh0agM6isgVhi9j13ftmpo76uKBH-utA92aDOI52wwIGlvaFqUC-oewFWII5aiB4Q2fi1oTYWtAXm6_eTsFGtrxk",
      price: "0",
    };
    await dataApi.post("/products/", newItem);
    dataCopy.push(newItem);
    this.setState({ data: dataCopy });
  };

  handleUpdate = async (id, value) => {
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
    await dataApi.put(`/products/${id}`, updatedItem);

    this.setState({ data: dataCopy });
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

  handleDelete = async (id) => {
    const { data } = this.state;
    const newData = data.filter((item) => item.id !== id);
    await dataApi.delete(`/products/${id}`);
    this.setState({ data: newData });
  };

  render() {
    return (
      <div className="container">
        <>
          <Create create={this.handleCreate} />
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
