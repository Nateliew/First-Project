// import logo from "./logo.svg";
import Task from "./Component/Task.js";
import "./App.css";
import React from "react";
import Homepage from "./Component/Display";

export default class App extends React.Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Initialise the values
      page: 1,
      username: "",
      NoOfTask: 0,
    };
  }
  next = () => {
    this.setState({
      page: this.state.page + 1,
    });
    console.log(this.state.page);
  };

  back = () => {
    this.setState({
      page: this.state.page - 1,
    });
    console.log(this.state.page);
  };

  render() {
    switch (this.state.page) {
      case 1:
        return <Homepage page={this.state.page} next={this.next} />;

      case 2:
        return <Task page={this.state.page} back={this.back} />;
      default:
        return null;
    }
  }
}
