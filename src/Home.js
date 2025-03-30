import react, { useState, useContext } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import './CSS/Home.css';
import { ProductContext } from "./ProductContext";


function Home() {

    const { products, deleteProduct } = useContext(ProductContext)
    const navigate = useNavigate()

    const topProducts = products.filter((_, index) => index < 3)

    function handleDelete(id) {
        deleteProduct(id)
            .then(() => navigate("/products"))
    }

    function renderTopProducts() {
        return topProducts.map(product => (
            <Col key={product.id} md={4}>
            <Card className="align-self-start h-100">
                <div className="pb-1 ps-1 pe-1">
                    <Card.Img variant="top" src={product.image} className="card-img-custom" />
                </div>
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted" >{product.price}</Card.Subtitle>
                    <Link to={`/products/${product.id}`} className="btn btn-secondary btn-sm mx-2">View</Link>
                    <Link to={`/products/${product.id}/edit`} className="btn btn-primary btn-sm mx-2">Edit</Link>
                    <Button variant="danger" size="sm" className="mx-2" onClick={() => handleDelete(product.id)}>Delete</Button>
                </Card.Body>
            </Card>
        </Col>
        ))
    }

    return (
        <>
            <div className="home">
                <h1 className="my-4">Products</h1>
                <Row>
                    {renderTopProducts()}
                </Row>

            </div>
        </>
    )
}

export default Home;