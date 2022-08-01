import React from "react";
import "./Display.css";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import MainPage from "./Homepage";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const mainpage = {
  title: "Welcome to To-Do-List",
  image: "https://images.pexels.com/photos/5717415/pexels-photo-5717415.jpeg",
  imageText: "todolist",
};

const Homepage = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    props.next(props.page);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <>
      <CssBaseline />
      <AppBar position="relative" style={{ background: "#795548" }}>
        <Toolbar>
          <Typography variant="h2">Homepage</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <MainPage post={mainpage} />
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          <p>Click the start button to add tasks</p>
          <div>
            <Button
              onClick={handleToggle}
              variant="contained"
              style={{ background: "#795548" }}
            >
              Start
            </Button>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
              duration="3ms"
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </div>
        </Typography>
      </Container>
    </>
  );
};

export default Homepage;
