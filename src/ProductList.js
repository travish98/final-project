import React, { useContext } from "react";
import { ProductContext } from "./ProductContext";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import './CSS/ProductList.css'


function ProductList(props) { 

    let navigate = useNavigate()

    let { deleteProduct, } = useContext(ProductContext)

    function handleDelete(id) {
        deleteProduct(id)
    }


    function productList(products) {
        if (products === null) return
        return products.map((product) => {
            return (
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
            )
        })
    }
    
    

    return(
        <div className="ms-5 mt-3">
            <h1>Products</h1>
            <ProductContext.Consumer>
                {({ products }) => (
                <Row className="gx-0 gy-4">
                    {productList(products)}
                </Row>
                            )}
            </ProductContext.Consumer>
        </div>
    )
}

export default ProductList