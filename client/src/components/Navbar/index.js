import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/auth";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, userId } = useSelector((state) => {
    return {
      isLoggedIn: state.auth.isLoggedIn,
      userId: state.auth.userId,
    };
  });
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/Products">E Store</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="/Products">Products</Nav.Link>
              {isLoggedIn ? (
                <Nav.Link href="/AddNewProduct">Creat new Product</Nav.Link>
              ) : (
                ""
              )}
              {isLoggedIn ? (
                <Nav.Link
                  className="logout"
                  onClick={() => {
                    dispatch(logout());
                    navigate("/Login");
                  }}
                >
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link
                className="Login"
                onClick={() => {
                  dispatch(logout());
                  navigate("/Login");
                }}
              >
                Login/register
              </Nav.Link>              )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default TopBar;
