import { AuthStore } from './authStore';
import {ProductStore} from './productsStore'
import {StatisticStore} from "./statisticStore";

export class RootStore {
    authStore: AuthStore;
    productStore: ProductStore;
    statisticStore: StatisticStore;

    constructor() {
        this.authStore = new AuthStore();
        this.productStore = new ProductStore();
        this.statisticStore = new StatisticStore();
    }
}

const rootStore = new RootStore();
export default rootStore;
