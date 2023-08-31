export type Product = {
     nombre: string,
     precio: number;
}
export type ShoppingCart = Product & {cantidad: number};