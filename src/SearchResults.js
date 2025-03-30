import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Col, Card, Button, Row} from "react-bootstrap";


function SearchResults() {
    const [searchParams] = useSearchParams()
    const [filteredProducts, setFilteredProducts] = useState([])
    const query = searchParams.get("q")

    useEffect(() => {
        if(!query) return

        axios.get(`http://localhost:3001/products?q=${query}`)
            .then(response => setFilteredProducts(response.data))
    }, [query])

    function handleDelete(id) {
        console.log(`Simulating delete for product ID: ${id}`);
      }

    function result() {
        if(!filteredProducts) return
        return filteredProducts.map((product) => (
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

    return(
        <Container className="mt-4">
            <Row className="g-4 mt-3">
                {result()}
            </Row>
        </Container>
    )
}

export default SearchResults