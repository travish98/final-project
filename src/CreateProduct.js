import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "./ProductContext";
import { Button, Form } from "react-bootstrap";


function CreateProduct() {

    let params = useParams()
    let [ product, setProduct ] = useState({
        id: params.id,
        name: "",
        description: "",
        condition: "",
        price: "",
        image: ""
    })

    let { getProduct, addProduct, updateProduct } = useContext(ProductContext)
    let navigate = useNavigate()
    let { id, name, description, condition, price, image } = product
    
    useEffect(() => {
        if(!params.productId) return
        async function fetch() {
            await getProduct(params.productId)
                .then((product) => setProduct(product))
        }
        fetch()
    }, [params.productId])

    function handleChange(event) {
        setProduct((prevValue) => {
            return { ...prevValue, [event.target.name]: event.target.value }
        })
    }

    function addOrUpdate() {
        if (id === undefined) {
            return addProduct(product)
        } else {
            return updateProduct(product)
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        addOrUpdate()
            .then((product) =>
                navigate(`/products/${product.id}`)
        )
    }

    return (

        <Form onSubmit={handleSubmit} className="mx-3 mt-3">

            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={name} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" value={description} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Condition</Form.Label>
                <Form.Select type="text" name="condition" value={condition} onChange={handleChange}>
                    <option value="">Select a condition</option>
                    <option value="Poor">Poor</option>
                    <option value="Good">Good</option>
                    <option value="Great">Great</option>
                    <option value="Pristine">Pristine</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control placeholder="$" type="text" name="price" value={price} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control placeholder="Type an image URL" type="text" name="image" value={image} onChange={handleChange} />
            </Form.Group>

            <Button type="submit">Save</Button>

        </Form>
    )

}

export default CreateProduct