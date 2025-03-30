import React, { useState } from "react";
import { Navbar, Nav, Container, Stack, Form } from "react-bootstrap";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Logo from './Assets/Logo.png'

function NavBar() {

    const [searchTerm, setSearchTerm] = useState('')
    const navigate = useNavigate()

    function handleSearch(event) {
        event.preventDefault()
        if(!searchTerm.trim()) return
        
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`)
        setSearchTerm("")

    }


    return (
        <>

        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand className="d-flex align-items-center">
                    <img src={Logo} alt="Logo" width="40" height="40" className="d-inline-block align-top me-2" />
                    <strong>Buy/Sell Games</strong>
                </Navbar.Brand>


                <div className="d-flex algn-items-center gap-3">
                    <Nav className="me-auto">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/about" className="nav-link">About</Link>
                        <Link to="/products" className="nav-link">Products</Link>
                        <Link to="/add" className="nav-link">Create</Link>
                    </Nav>

                    <Form className="d-flex" onSubmit={handleSearch}>
                        <Form.Control type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    </Form>
                </div>
            
            </Container>
        </Navbar>

        <Stack className="min-vh-100 d-flex flex column">
            <Outlet />
        </Stack>

        </>
    )
}

export default NavBar;