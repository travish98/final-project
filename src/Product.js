import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "./ProductContext";
import { useParams, useNavigate, Link } from "react-router-dom";
import './CSS/Product.css'
import { Button, Card, Container } from "react-bootstrap";


function Product(props) {

    let params = useParams()
    let navigate = useNavigate()

    let { getProduct, deleteProduct} = useContext(ProductContext)
    let [product, setProduct] = useState()

    useEffect(() => {
        async function fetch() {
            await getProduct(params.productId)
                .then((product) => setProduct(product)) 
        }
        fetch()
    }, [params.productId])

    function handleDelete(id) {
        deleteProduct(id)
            .then(() => navigate("/products"))
    }

    function loading() {
        return (
            <div className="spinner-container">
                <div className="spinner"></div>
            </div>
        )
    }

    function productCard () {
        let { id, name, price, description, condition, image } = product

        return (

            <Container className="product">
                <Card className="align-self-start w-50">
                    <Card.Img variant="top" src={image} alt={name} />
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{price}</Card.Subtitle>
                        <Card.Text>
                            <strong>Description: </strong><span>{description}</span>
                        </Card.Text>
                        <Card.Text>
                        <strong>Condition: </strong><span>{condition}</span>
                        </Card.Text>
                        <Link to={`/products/${product.id}/edit`} className="btn btn-primary mx-3">Edit</Link>
                        <Button variant="danger" onClick={() => handleDelete(id)}>Delete</Button>
                    </Card.Body>
                </Card>
            </Container>
        )

    }

    if (product === undefined) {
        return loading()
    }
    return product.id !== parseInt(params.productId) ? loading() : productCard()
}

export default Product