import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Col, Container, Card, Form, Button } from "react-bootstrap";
import Product from "./Product";
import Cart from "./Cart";
import "../style/cart.css";

const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [productTitle, setProductTitle] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPriceOrder, setProductPriceOrder] = useState("");

    useEffect(() => {
        axios.get("/api/products.json").then((res) => {
            setProducts(res.data.products.data.items);
        });
    }, []);

    const addToCart = (el) => {
        const cartCopy = cart.slice();

        const index = cartCopy.findIndex((product) => el.id === product.id);

        if (index === -1) {
            cartCopy.push({ ...el, count: 1 });
        } else {
            const pr = cartCopy[index];
            cartCopy[index] = { ...pr, count: pr.count + 1 };
        }

        setCart(cartCopy);
    };

    const decrementCount = (el) => {
        const cartCopy = cart.slice();

        const index = cartCopy.findIndex((product) => el.id === product.id);

        const pr = cartCopy[index];
        cartCopy[index] = { ...pr, count: pr.count - 1 };

        setCart(cartCopy);
    };

    const getCartTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.count, 0);
    };

    const handleCheckOut = () => {
        setCart([]);
        alert("You have successfully completed you purchase!");
    };

    const uniqueCategories = [...new Set(products.map((item) => item.category))];

    const filterMethods = [
        (item) => item.category.includes(selectedCategory),
        (item) => item.name.toLowerCase().indexOf(productTitle.toLowerCase()) !== -1,
        (item) => item.description.toLowerCase().indexOf(productDescription.toLowerCase()) !== -1,
    ];

    let filteredArray = products.filter((item) => {
        for (let i = 0; i < filterMethods.length; i++) {
            if (!filterMethods[i](item)) {
                return false;
            }
        }
        return true;
    });

    if (productPriceOrder === "ASC") {
        filteredArray.sort((a, b) => a.price - b.price);
    } else {
        filteredArray.sort((a, b) => b.price - a.price);
    }

    const printFilters = () => {
        return (
            <>
                <Form.Group>
                    <Form.Label htmlFor="productTitle">Search by Title:</Form.Label>
                    <Form.Control
                        type="text"
                        id="productTitle"
                        value={productTitle}
                        onChange={(e) => setProductTitle(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="productDescription">Search by Description:</Form.Label>
                    <Form.Control
                        type="text"
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="productDescription">Sort by Price:</Form.Label>
                    <Form.Select onClick={(e) => setProductPriceOrder(e.target.value)}>
                        <option>Open this select menu</option>
                        <option value="ASC">Sort by price - ascending</option>
                        <option value="DESC">Sort by price - descending</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label htmlFor="category-list">Category:</Form.Label>
                    <Form.Control
                        as="select"
                        id="category-list"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">All</option>
                        {uniqueCategories.map((item) => (
                            <option value={item}>{item}</option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <br />
            </>
        );
    };

    return (
        <>
            <Container>
                <Card>
                    <Card.Body>
                        {cart.map((el) => (
                            <Cart
                                item={el}
                                cart={cart}
                                setCart={setCart}
                                incrementCount={addToCart}
                                decrementCount={decrementCount}
                                count={el.count}
                            />
                        ))}
                        <article>
                            <div className="total">
                                <span>Total Price of your Cart: {getCartTotal().toFixed(2)}EUR</span>

                                {getCartTotal() > 0 ? (
                                    <Button className="mt-1 btn-sm" onClick={() => handleCheckOut()}>
                                        Buy
                                    </Button>
                                ) : (
                                    ""
                                )}
                            </div>
                        </article>
                    </Card.Body>
                </Card>
            </Container>
            <Container>
                <Card>
                    <Card.Body>
                        <Row>
                            <Col xs="12" md="4" lg="3">
                                {printFilters()}
                            </Col>

                            <Col xs="12" md="8" lg="9">
                                <Product
                                    products={filteredArray === false ? products : filteredArray}
                                    addToCart={addToCart}
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};
export default App;
