import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Nav, Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as actions from "../../redux/Users/userActions";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userdetails } = user;

  const logOutHandler = () => {
    localStorage.removeItem("userdetails");
    navigate("/sign-in");
    dispatch(actions.logOutUser());
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" className="autohide  sticky-top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            {userdetails?.user?.name}
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/orders">
              Orders
            </Nav.Link>
            <Nav.Link as={Link} to="https://github.com/CAPTAINCOBRA">
              About
            </Nav.Link>
          </Nav>

          <Button
            variant="primary LogOut"
            onClick={logOutHandler}
            className="SignOut"
          >
            Sign Out
          </Button>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
