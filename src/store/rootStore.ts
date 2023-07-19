import { AuthStore } from './authStore';
import {ProductStore} from './productsStore'
import {StatisticStore} from "./statisticStore";
import {HistoryStore} from "./historyStore";
import {CartStore} from "./cartSore";

export class RootStore {
    authStore: AuthStore;
    productStore: ProductStore;
    statisticStore: StatisticStore;
    historyStore: HistoryStore;
    cartStore: CartStore;

    constructor() {
        this.authStore = new AuthStore();
        this.productStore = new ProductStore();
        this.statisticStore = new StatisticStore();
        this.historyStore = new HistoryStore();
        this.cartStore = new CartStore();
    }
}

const rootStore = new RootStore();
export default rootStore;
