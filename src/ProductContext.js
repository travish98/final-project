import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

    let url = "http://localhost:3001/products";

    useEffect(() => {
        async function getProducts() {
            await refreshProducts()
        }
        getProducts()
    }, [])

    function refreshProducts() {
        return axios.get(url)
            .then((response) => {
                setProducts(response.data)
            })
    }

    function getProduct(id) {
        return axios.get(`${url}/${id}`)
            .then(response => 
                new Promise((resolve) => resolve(response.data))
            )
    }

    function deleteProduct(id) {
       return axios.delete(`${url}/${id}`)
            .then(() => (refreshProducts()))
    }

    function addProduct(product) {
        return axios.post(url, product)
            .then(response => {
                refreshProducts()
               return new Promise((resolve) => resolve(response.data))
            })
    }

    function updateProduct(product) {
        return axios.put(`${url}/${product.id}`, product)
            .then(response => {
                refreshProducts()
                return new Promise((resolve) => resolve(response.data))
            })
    }

    


  return (
    <ProductContext.Provider value={{ products, refreshProducts, getProduct, deleteProduct, addProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

