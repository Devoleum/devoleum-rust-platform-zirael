import React from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import SearchBox from "./SearchBox";
import { logout } from "../actions/userActions";
import { bubble as Menu } from "react-burger-menu";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const styles = {
    bmBurgerButton: {
      position: "absolute",
      width: "36px",
      height: "30px",
      left: "15px",
      top: "15px",
    },
    bmBurgerBars: {
      background: "white",
    },
    bmBurgerBarsHover: {
      background: "#a90000",
    },
    bmCrossButton: {
      height: "24px",
      width: "24px",
    },
    bmCross: {
      background: "#bdc3c7",
    },
    bmMenuWrap: {
      position: "fixed",
      height: "100%",
    },
    bmMenu: {
      background: " #242428",
      padding: "2.5em 1.5em 0",
      fontSize: "1.15em",
    },
    bmMorphShape: {
      fill: " #242428",
    },
    bmItemList: {
      color: "#b8b7ad",
      padding: "0.8em",
      textDecoration: "none",
    },
  };

  return (
    <header>
      <Menu styles={styles} className="menu">
        <Link to="/">
          <div>Home</div>
        </Link>
        <div>
          <div>
            {" "}
            <a
              href="https://github.com/Devoleum"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
        <div>
          <div>
            {" "}
            <a
              href="https://devoleum.github.io/docs/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs
            </a>
          </div>
        </div>
        {userInfo ? (
          <div>
            <Link to="/profile">
              <div>Profile</div>
            </Link>
            <Link to="/dashboard/historylist">
              <div>Histories</div>
            </Link>
            <Link>
              <div onClick={logoutHandler}>Logout</div>
            </Link>
          </div>
        ) : (
          <Link to="/login">
            <div>
              <i className="fas fa-user"></i> Sign In
            </div>
          </Link>
        )}
        {userInfo && userInfo.isAdmin && (
          <div>
            <hr />
            <div>ADMIN</div>
            <Link to="/admin/userlist">
              <div>Users</div>
            </Link>
            <Link to="/admin/orderlist">
              <div>Orders</div>
            </Link>
          </div>
        )}
      </Menu>
      <Navbar style={{ background: "#92AF31", height: "60px" }}>
        <Container>
          <Link to="/">
            <Navbar.Brand
              style={{
                color: "white",
                position: "absolute",
                top: "12px",
                left: "80px",
              }}
            >
              Devoleum
            </Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
