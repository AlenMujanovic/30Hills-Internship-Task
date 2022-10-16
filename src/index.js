import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import ProductDetailPage from "./components/ProductDetailPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { MainMenu } from "./components/MainMenu";
import Cart from "./components/Cart";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <MainMenu></MainMenu>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/product/:pId" component={ProductDetailPage} />
            </Switch>
        </BrowserRouter>
    </React.StrictMode>
);
