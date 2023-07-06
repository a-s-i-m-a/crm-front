import { AuthStore } from './authStore';
import {ProductStore} from './productsStore'

export class RootStore {
    authStore: AuthStore;
    productStore: ProductStore;

    constructor() {
        this.authStore = new AuthStore();
        this.productStore = new ProductStore();
    }
}

const rootStore = new RootStore();
export default rootStore;
