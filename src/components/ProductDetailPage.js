import React from "react";
import { useLocation } from "react-router";
import { Row, Col, Container, Card } from "react-bootstrap";
import parser from "html-react-parser";

const ProductDetailPage = () => {
    const location = useLocation();
    const { product } = location.state;

    return (
        <Container>
            <Card className="mt-3">
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Row>
                        <Col xs="12" lg="8">
                            <hr />

                            <div className="description">{product.description}</div>

                            <hr />
                            <Row>
                                <Col xs="4">
                                    <b>Features:</b>
                                    <br />

                                    <div className="m-3">{parser(product.features)}</div>
                                </Col>
                                <Col xs="4">
                                    <b>Keywords:</b>
                                    <br />

                                    <div className="m-3 ">{product.keywords}</div>
                                </Col>
                                <Col xs="4">
                                    <b>Category:</b>
                                    <br />

                                    <div className="m-3">{product.category}</div>
                                </Col>
                            </Row>
                        </Col>

                        <Col xs="12" lg="4">
                            <Row>
                                <Col xs="12" className="mb-3">
                                    <img
                                        alt={"Image - " + product.name}
                                        src={product.images[0]}
                                        className="w-100"
                                    />
                                </Col>
                            </Row>

                            <Row>
                                <Col xs="12" className="text-center mb-3 form-control-lg">
                                    <b>Price: {Number(product.price).toFixed(2) + " EUR"}</b>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ProductDetailPage;
