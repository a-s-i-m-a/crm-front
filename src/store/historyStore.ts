import { makeAutoObservable } from 'mobx';
import {api} from "./api";
import {toast} from "react-toastify";

export interface ProductHistory  {
    id: string,
    sellDate: string,
    soldSize: string,
    title: string,
    color: string,
    productId: string,
    barcode: string
}

export class HistoryStore {
    history: ProductHistory[] = [];
    currentPage = 1;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchHistory(timePeriod: string, search: string) {
        try {
            const response = await api.get(
                `/sell/history?page=${this.currentPage}&limit=${10}&timePeriod=${timePeriod}&search=${encodeURIComponent(search)}`
            );
            this.history = response.data;
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    }

    setCurrentPage(page: number) {
        this.currentPage = page;
        this.fetchHistory('all', '');
    }

    async returnProduct(barcode: string, soldSize: string) {
        try {
            const response = await api.put(`/sell/return/${barcode}/${soldSize}`);

            if (!response) {
                throw new Error('Failed to return product');
            }

            toast.success('Product returned successfully');
            this.fetchHistory('all', '');
        } catch (error) {
            toast.error('Failed to return product');

            console.error(error);
        }
    }
}
