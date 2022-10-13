import React from "react";
import { Button } from "react-bootstrap";
import "../style/cart.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare, faXmark } from "@fortawesome/free-solid-svg-icons";

const Cart = ({ cart, setCart, decrementCount, count, incrementCount, item }) => {
    const handleRemove = (id) => {
        const arr = cart.filter((item) => item.id !== id);
        setCart(arr);
    };

    return (
        <article>
            <div className="cart_box" key={item.id}>
                <div className="cart_img">
                    <img src={item.images[0]} alt="" />
                    <p>{item.name}</p>
                </div>

                <Button className="btn-sm" onClick={() => incrementCount(item)}>
                    +
                </Button>
                <span>{count}</span>
                <Button
                    disabled={count === 1}
                    className="btn-sm"
                    icon={faMinusSquare}
                    onClick={() => decrementCount(item)}
                >
                    -
                </Button>

                <span className="m-3" style={{ fontSize: "15pt" }}>
                    {item.price}
                </span>
                <FontAwesomeIcon
                    style={{ cursor: "pointer" }}
                    className="fa-2x"
                    icon={faXmark}
                    onClick={() => handleRemove(item.id)}
                ></FontAwesomeIcon>
            </div>
        </article>
    );
};

export default Cart;
