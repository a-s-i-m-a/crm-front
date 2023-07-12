import { makeAutoObservable } from 'mobx';
import {api} from "./api";

export class StatisticStore {
    statistics = {
        totalCount: 0,
        totalSoldPrice: 0,
        totalBoughtPrice: 0,
        profit: 0,
    };

    products = [];

    constructor() {
        makeAutoObservable(this);
    }

    async fetchStatistics() {
        try {
            const response = await api.get('/statistics/products');
            this.statistics = response.data;
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    }

}
