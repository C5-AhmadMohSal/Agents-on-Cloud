import "./style.css";
import axios from "axios";
import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


const Products = () => {
    const navigate = useNavigate();
  
    const [Products, setProducts] = useState("");
  
    const [message, setMessage] = useState("");
  
    const GetAllProducts = () => {
      axios
        .get(`http://localhost:5000/Products/getAllProduct`)
  
        .then((result) => {
          console.log(result, "alltheProducts");
          setProducts(result.data.result);
        })
        .catch((err) => {
          console.log(err);
          setMessage(err.response.data.message);
        });
    };
    
    useEffect(() => {
      GetAllProducts();
    }, []);
    return (
      <>
        <div className="AllProducts">
          <div className="Productscontainer">
            <>
       
              <Row xs={2} md={4} className="g-4">
                {Products &&
                  Products.map((Products, i) => (
                    <Col key={i}>
                      <Card onClick={() => {
                        //   navigate(`/OneProduct/${Products.id}`);
                          
                        }}
                        className="square rounded"
                        style={{ width: "18rem",height:"400px"}}
                        key={i}
                      >
                        <Card.Img
                          variant="center"
                          src={Products.productImage}
                          style={{ width: "18rem",height:"300px"}}

                          />
                        <Card.Body>
                          <Card.Title>{Products.title}</Card.Title>
                        </Card.Body>
                        {Products.price}
                      </Card>
                    </Col>
                  ))}
              </Row>
            </>
          </div>
        </div>
      </>
    );
  };
  
  export default Products;