import React, { Component } from "react";
import "./task.css";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ListSubheader from "@mui/material/ListSubheader";
import Grid from "@mui/material/Grid";

export default class Task extends Component {
  constructor(props) {
    // Always call super with props in constructor to initialise parent class
    super(props);
    this.state = {
      // Initialise the values
      checked: false,
      allTasks: [],
      currTasks: {
        task: "",
        status: false,
      },
    };
  }

  // Once the tasks has been keyed in, change the value
  handleChange = (e) => {
    this.setState({ currTasks: { task: e.target.value, status: false } });
  };

  handleSubmit = (e) => {
    //Prevent the page from refreshing everytime we submit
    e.preventDefault();
    const newTask = {
      currTasks: this.state.currTasks,
    };

    console.log(this.state.allTasks);
    const allTasks = [...this.state.allTasks];

    //Add new task into the array upon pressing submit
    allTasks.push(newTask);

    //after pushing, set the state
    this.setState({
      allTasks,
      currTasks: { task: "" },
    });

    //**Local storage**//
    //if the array upon loading is 0, add the current tasks into a new array
    if (this.state.allTasks.length === 0) {
      console.log("storage array is 0");
      let data = {
        currTasks: this.state.currTasks,
      };
      let array = [];
      array.push(data);
      localStorage.setItem("data", JSON.stringify(array));
    } else {
      let data = {
        currTasks: this.state.currTasks,
      };
      let newArray = [...this.state.allTasks];
      newArray.push(data);
      localStorage.setItem("data", JSON.stringify(newArray));
    }
  };

  //upon loading page, get the list of tasks and parse it
  componentDidMount() {
    console.log(localStorage.getItem("data"));
    let data =
      JSON.parse(localStorage.getItem("data")) === null
        ? []
        : JSON.parse(localStorage.getItem("data"));
    console.log(data);
    if (data.length === 0) {
      //alert the user since the length of the array is more than 0
      return;
    } else {
      alert("You have unfinished tasks!");
      this.setState({ allTasks: data });

      // //future reminder functions:
      // function areEquals(a, b) {
      //   var keys1 = Object.keys(a);
      //   var keys2 = Object.keys(b);
      //   if (keys1.length !== keys2.length) {
      //     return false;
      //   }
      //   for (this.state.currTasks.status in a) {
      //     if (a[this.state.currTasks.status] !== b[this.state.currTasks.status])
      //       return false;
      //   }
      //   return true;
      // }
      // function checkArray(arr) {
      //   for (var i = 1; i < arr.length; i++) {
      //     if (!areEquals(arr[0], arr[i])) return false;
      //   }
      //   alert("You have unfinished tasks!");
      //   return true;
      // }
    }
  }

  //change page
  continue = (e) => {
    e.preventDefault();
    this.props.back();
  };

  deleteTask(item) {
    //copy current list of tasks
    const allTasks = [...this.state.allTasks];
    //Iterates over each task items, remove if the task id matches the id being clicked
    const updatedList = allTasks.filter(
      (task) => task.currTasks.task !== item.currTasks.task
    );
    //set/update the state of the list again
    this.setState({ allTasks: updatedList });

    //**if the updated list has no tasks inside it,
    if (updatedList === null) {
      //then we setlocalstorage.removeitem()
      localStorage.removeitem(allTasks);
      //if there are tasks in the updated lists,
      //retain the tasks, set localstorage with the updatedlist
    } else localStorage.setItem("data", JSON.stringify(updatedList));
  }

  //checkbox function
  handleCheck = (e, item) => {
    const allTasks = [...this.state.allTasks];
    //if the checkbox is clicked, the item will be marked as completed ("true"), else false
    if (e.target.checked === true) {
      allTasks.filter(
        (taskItem) => taskItem.currTasks.task === item.currTasks.task
      )[0].currTasks.status = true;
    } else {
      allTasks.filter(
        (taskItem) => taskItem.currTasks.task === item.currTasks.task
      )[0].currTasks.status = false;
    }

    //set the state of allTasks after updating and stringify for local storage
    this.setState({ allTasks });
    localStorage.setItem("data", JSON.stringify(allTasks));
  };
  render() {
    return (
      <>
        <CssBaseline />
        <div className="App">
          <AppBar position="relative" style={{ background: "#795548" }}>
            <Toolbar>
              <Typography variant="h2">To-Do-List.</Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="sm">
            <Typography
              component="h3"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              List of Tasks
            </Typography>
            <Grid item xs={6} md={8} rowSpacing={1}>
              Number of tasks: {this.state.allTasks.length}
            </Grid>
            <br />
            <div className="taskInput">
              <form onSubmit={this.handleSubmit}>
                <label>
                  Tasks:
                  <input
                    type="text"
                    placeholder="Enter here"
                    value={this.state.currTasks.task}
                    onChange={this.handleChange}
                  />
                </label>
                <input type="submit" value="Add" />
              </form>
            </div>
            <br />
            <br />
          </Container>
          <div className="box">
            <ListSubheader component="div" id="nested-list-subheader">
              <div className="listings">
                {/* to render out the list of tasks after user has typed it out */}
                {this.state.allTasks && this.state.allTasks.length > 0 ? (
                  this.state.allTasks.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          //apply CSS based on completed status
                          item.currTasks.status ? "completed" : "incomplete"
                        }
                      >
                        <input
                          value={this.state.currTasks.task}
                          type="checkbox"
                          defaultChecked={item.currTasks.status}
                          onClick={(e) => this.handleCheck(e, item)}
                        />{" "}
                        {/* output the task here */} {item.currTasks.task}{" "}
                        {/* delete button */}
                        <Button
                          variant="outlined"
                          onClick={() => this.deleteTask(item)}
                        >
                          {" "}
                          Delete
                        </Button>
                      </div>
                    );
                  })
                ) : (
                  <p> You have no tasks at the moment.</p>
                )}
              </div>
            </ListSubheader>
          </div>
          <tr class="spacer">
            <td colspan="2">
              <br />{" "}
            </td>
          </tr>
          <div>
            <Button variant="outlined" onClick={this.continue}>
              Back
            </Button>
          </div>
        </div>
      </>
    );
  }
}
