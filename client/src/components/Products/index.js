import "./style.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSelector, useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  setProducts,
  setProduct,
  deleteProduct,
} from "../../redux/reducers/products";

const Products = () => {
  //user_id
  const dispatch = useDispatch();
  const { userId, products, Product, token } = useSelector((state) => {
    return {
      userId: state.auth.userId,
      products: state.products.products,
      Product: state.products.Product,
      token: state.auth.token,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  const [title, setTitle] = useState("");
  const [description, setDescriptin] = useState("");
  const [productImage, setProductimg] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();
  const [productId, setProductIs] = useState("");
  const [message, setMessage] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const GetAllProducts = () => {
    axios
      .get(`http://localhost:5000/Products/getAllProduct`)
      .then((result) => {
        dispatch(setProducts(result.data.result));
        let temp = result.data.result;
        dispatch(setProduct(temp.reverse()));
      })
      .catch((err) => {
        console.log(err);
        // setMessage(err.response.data.message);
      });
  };
  const productDelete = (productId) => {
    axios
      .delete(`http://localhost:5000/Products/DeleteProductById/${productId}`)
      .then((result) => {
        dispatch(deleteProduct(productId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ProductUpdate = async (productId) => {
    try {
      const product = {
        title,
        description,
        productImage,
        price,
      };
      const result = await axios.put(
        `http://localhost:5000/products/updateProductById/${productId}`,

        { title, description, productImage, price },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        setStatus(true);
        setMessage(`${title} created`);
        console.log(result.data.result.insertId);
      }
      console.log(product);
    } catch (error) {
      if (!error.response.data.success) {
        setStatus(false);
        setMessage(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    GetAllProducts();
  }, []);
  return (
    <>
      <>
        {/* /// */}
        <Row xs={1} md={4} className="g-4">
          {products &&
            products.map((Products, i) => (
              <Col key={i}>
                <Card>
                  <Card.Img
                    onClick={() => {
                      navigate(`/OneProduct/${Products.id}`);
                    }}
                    variant="center"
                    src={Products.productImage}
                    style={{ width: "18rem", height: "300px" }}
                  />
                  <Card.Body>
                    <Card.Title>{Products.title}</Card.Title>
                    {userId == Products.user_id ? (
                      <>
                        <Button variant="primary" onClick={handleShow}>
                          Edit/Delete
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Modal heading</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Title
                              </label>
                              <div className="col-sm-10">
                                {" "}
                                <input
                                  className="form-control"
                                  type="text"
                                  onChange={(e) => setTitle(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Descriptin
                              </label>
                              <div className="col-sm-10">
                                <input
                                  className="form-control"
                                  type="text"
                                  onChange={(e) =>
                                    setDescriptin(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Productimg
                              </label>
                              <div className="col-sm-10">
                                <input
                                  className="form-control"
                                  type="text"
                                  onChange={(e) =>
                                    setProductimg(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="form-group row">
                              <label className="col-sm-2 col-form-label">
                                Price
                              </label>
                              <div className="col-sm-10">
                                <input
                                  className="form-control"
                                  type="text"
                                  onChange={(e) => setPrice(e.target.value)}
                                />
                              </div>
                            </div>{" "}
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                            <Button
                              variant="primary"
                              onClick={() => {
                                ProductUpdate(products.id);
                                GetAllProducts();
                              }}
                            >
                              Save Changes
                            </Button>
                            <Button
                              variant="outline-danger"
                              onClick={() => {
                                dispatch(setProduct());
                                productDelete(products.id);
                                GetAllProducts();
                              }}
                            >
                              Delet
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </>
                    ) : (
                      ""
                    )}
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </>
    </>
  );
};

export default Products;
