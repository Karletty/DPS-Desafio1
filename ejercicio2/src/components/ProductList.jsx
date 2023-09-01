import React from "react";
import { useState } from "react";
import { data } from "../data";

export const ProductList = ({
     allProducts,
     setAllProducts,
     countProducts,
     setCountProducts,
     total,
     setTotal,
}) => {
     const [products, setProducts] = useState(data);
     const handleChange = (event) => {
          setProducts(preval => {
               preval[event.target.name.split("-")[1] - 1].quantity = parseInt(event.target.value);
               return preval
          });
     }
     const onAddProduct = (product, e) => {
          e.preventDefault();
          if (allProducts.find(item => item.id === product.id)) {
               const products = allProducts.map(item =>
                    item.id === product.id
                         ? { ...item, quantity: item.quantity +  parseInt(e.target[`input-${product.id}`].value)}
                         : item
               );
               setTotal(lastTotal => lastTotal + product.price * product.quantity);
               setCountProducts(lastCount => lastCount + product.quantity);
               return setAllProducts([...products]);
          }
          setTotal(lastTotal => lastTotal + product.price * product.quantity);
          setCountProducts(lastCount => lastCount + product.quantity);
          setAllProducts(lastProducts => [...lastProducts, product]);
     };
     return (
          <div className='container-items'>
               {products.map(product => (
                    <form className='item' key={product.id} onSubmit={(e) => onAddProduct(product, e)}>
                         <figure>
                              <img src={product.urlImage} alt={product.title} />
                         </figure>
                         <div className='info-product'>
                              <h2>{product.nameProduct}</h2>
                              <p className='price'>${product.price} ~ {product.title}</p>
                              <p>{product.description}</p>
                              <input min={1} type="number" defaultValue={product.quantity} name={`input-${product.id}`} onChange={(e) => handleChange(e)} />
                              <button type="submit">
                                   Añadir al carrito
                              </button>
                         </div>
                    </form>
               ))}
          </div>
     );
};