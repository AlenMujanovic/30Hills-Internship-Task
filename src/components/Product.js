import React from "react";
import { Col, Card, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ products, addToCart }) => {
    const renderedProducts = products.map((product) => {
        return (
            <Col lg="4" md="6" sm="6" xs="12" key={product.id}>
                <Card className="mb-3">
                    <Card.Header>
                        <img className="w-100" src={products[0].images[0]} alt={product.name} />
                    </Card.Header>
                    <Card.Body>
                        <Card.Title as="p" className="h5">
                            <strong>{product.name}</strong>
                        </Card.Title>
                        <Card.Text>{product.description.substring(0, 95) + "..."}</Card.Text>
                        <Card.Text>{Number(product.price).toFixed(2)} EUR</Card.Text>
                        <Card.Text className="h6">Category: {product.category}</Card.Text>
                        {product.name.length <= 25 ? <br /> : ""}

                        <Row className="pt-5">
                            <Col xs="4" sm="4">
                                <Link
                                    to={{
                                        pathname: `/product/${product.id}`,
                                        state: { product },
                                    }}
                                    className="btn btn-primary btn-block btn-sm"
                                >
                                    Details
                                </Link>
                            </Col>

                            <Col xs="6" sm="6">
                                <Button
                                    variant="success"
                                    onClick={() => addToCart(product)}
                                    className="btn  btn-block btn-sm"
                                >
                                    Buy
                                </Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        );
    });

    return <Row>{renderedProducts}</Row>;
};

export default Product;
