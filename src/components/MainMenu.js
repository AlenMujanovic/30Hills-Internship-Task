import React from "react";
import { Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export class MainMenu extends React.Component {
    render() {
        return (
            <Container className="mb-1">
                <Nav variant="tabs">
                    <Nav.Link as={NavLink} to="/" exact>
                        Products
                    </Nav.Link>
                </Nav>
            </Container>
        );
    }
}
