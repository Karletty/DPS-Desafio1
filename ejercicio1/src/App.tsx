import { FormEvent, useEffect, useState } from "react";
import productsData from "./data.json";
import "./styles.css"
import { Product, ShoppingCart as ShoppingCartType } from "./types";
import { Button, Form } from "react-bootstrap";
import Select, { MultiValue } from "react-select";

const App = () => {
     const [products] = useState<Product[]>(productsData)
     const [shoppingCart, setShoppingCart] = useState<ShoppingCartType[]>([]);
     const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

     const options = products.map(product => ({
          value: product,
          label: product.nombre
     }));

     const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setShoppingCart(prev => {
               selectedProducts.forEach(product => {
                    let position = prev.findIndex(p => p.nombre === product.nombre);
                    if (position >= 0) {
                         prev[position] = { ...prev[position], cantidad: prev[position].cantidad + 1 }
                    } else {
                         prev.push({ ...product, cantidad: 1 })
                    }
               });
               setSelectedProducts([]);
               return prev;
          });
     }

     const handleSelectChange = (newValues: MultiValue<{
          value: Product;
          label: string;
     }
     >) => {
          setSelectedProducts(newValues.map(val => val.value));
     }

     useEffect(() => { }, [shoppingCart])

     return (
          <main className="p-5">
               <h1>Lista de Compras</h1>
               <Form className="d-flex flex-wrap gap-3 w-100 my-4" onSubmit={handleSubmit}>
                    <div className="fluid-element input-container">
                         <Select isMulti name="cart-product" options={options} closeMenuOnSelect={false} onChange={handleSelectChange} className="basic-multi-select"
                              classNamePrefix="select" value={selectedProducts.map(product => ({
                                   value: product,
                                   label: product.nombre
                              }))} />
                    </div>
                    <Button className="fluid-element" variant="primary" type="submit">
                         <i className="bi bi-plus-square-fill me-2"></i>
                         Agregar
                    </Button>
               </Form>

               {shoppingCart.length? <table className="table table-borderless">
                    <tbody>
                         {shoppingCart.map((product, i) => <tr key={product.nombre}>
                              <td>{product.nombre}</td>
                              <td>
                                   <Form.Control min={1} type="number" value={product.cantidad} onChange={(e) => {
                                        setShoppingCart(prev => {
                                             const newArr = [...prev]
                                             newArr[i].cantidad = Number(e.target.value);
                                             return newArr;
                                        });
                                   }
                                   } />
                              </td>
                              <td>${product.precio.toFixed(2)}</td>
                              <td>${(product.precio * product.cantidad).toFixed(2)}</td>
                              <td>
                                   <Button className="fluid-element" variant="primary" type="submit" onClick={() => {
                                        setShoppingCart(prev => {
                                             const newArr = [...prev];
                                             newArr.splice(i, 1);
                                             return newArr;
                                        })
                                   }}><i className="bi bi-x-square-fill"></i></Button>
                              </td>
                         </tr>)}
                    </tbody>
                    <tfoot>
                         <tr>
                              <th className="text-end" colSpan={3}>TOTAL</th>
                              <td colSpan={2}>${shoppingCart.reduce((tot, product) => {
                                   return tot + product.precio * product.cantidad;
                              }, 0).toFixed(2)}</td>
                         </tr>
                    </tfoot>
               </table>: "No hay productos en la lista de compras"}
          </main>
     );
}

export default App;
