import {computed} from 'mobx';
import {api} from "./api";
import {Product} from "./productsStore";


export interface SellProduct extends Product{
    selectedSize?: string;
}

export class CartStore {
     cartItems: SellProduct[] = [];

     async sellProducts() {
        try {
            for (const product of this.cartItems) {
                const sellData = {
                    soldSize: product.selectedSize ? product.selectedSize : product.sizes[0],
                    barcode: product.barcode,
                };

                await api.post('/sell', sellData);


            }
        } catch (error) {
            // Handle any errors that occur during the sell process
            console.error('Error selling products:', error);
        }
    }

    clearCart() {
         this.cartItems = []
    }

     addToCart(product: SellProduct) {
         const existingProduct = this.cartItems.find((item) => item.id === product.id);

         if (existingProduct) {
             return;
         }

         this.cartItems.push(product);
    }

     removeFromCart(index: number) {
        this.cartItems = this.cartItems.slice(0, index).concat(this.cartItems.slice(index + 1));
    }


    @computed get calculateTotalPrice() {
        return this.cartItems.reduce((total, product) => total + Number(product.soldPrice), 0);
    }

    fetchProductByBarcode(barcode: string): Promise<Product | null> {
        return api
            .get(`/products?query=${barcode}`)
            .then((response) => {
                const products: Product[] = response.data;
                if (products && products.length > 0) {
                    return products[0]; // Assuming the first product found by barcode is added to the cart
                }
                return null;
            })
            .catch((error) => {
                console.error('Error fetching product:', error);
                return null;
            });
    }
}
