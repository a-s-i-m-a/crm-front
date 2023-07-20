import { makeAutoObservable } from 'mobx';
import {api} from "./api";


export interface Product {
    id: number;
    isInStock: boolean;
    count: number;
    sizes: string[];
    color: string;
    soldPrice: number;
    boughtPrice: number;
    title: string;
    barcode: string;
}

export class ProductStore {
    products: Product[] = [];
    currentPage = 1;
    totalPages = 1;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchProducts(query:string = '') {
        try {
            const response = await api.get(`/products?query=${query}`, {
                params: { page: this.currentPage },
            });
            const { totalPages } = response.data;
            this.products = response.data;
            this.totalPages = totalPages;
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    async addProduct(newProduct: Partial<Product>) {
        try {
            const response = await api.post('/products', newProduct);


            const addedProduct= response.data
            this.products.push(addedProduct);
        } catch (error) {
            console.error('Error adding product:', error);
            // Handle error here, e.g., show an error message to the user
        }
    }

    async editProduct( updatedProduct:Product) {
        try {
            const response = await api.put(`/products/${updatedProduct.id}`, updatedProduct);
            const editedProduct = response.data;
            const index = this.products.findIndex((product) => product.id === editedProduct.id);
            if (index !== -1) {
                this.products[index] = editedProduct;
            }
        } catch (error) {
            console.error('Error editing product:', error);
        }
    }

    async deleteProduct(id:number|undefined) {
        try {
            await api.delete(`/products/${id}`);
            this.products = this.products.filter((product) => product.id !== id);
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    setCurrentPage(page: number) {
        this.currentPage = page;
        this.fetchProducts('');
    }
}

