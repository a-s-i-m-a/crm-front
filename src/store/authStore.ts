import { makeAutoObservable, runInAction } from 'mobx';
import axios from "axios";

export class AuthStore {
    user = null;
    loading = false;
    error = null;
    token: string | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    login = async (credentials: { email: string; password: string }) => {
        try {
            runInAction(() => {
                this.loading = true;
                this.error = null;
            });

            const response = await axios.post('http://localhost:3001/auth/login', credentials)
            runInAction(() => {
                this.token = response.data.token
                this.loading = false;
            });
        } catch (error: any) {
            runInAction(() => {
                this.error = error.response.data.message;
                this.loading = false;
            });
        }
    };

    register = async (userData: { username: string; password: string; email: string }) => {
        try {
            // Replace with your actual registration API call
            runInAction(() => {
                this.loading = true;
                this.error = null;
            });

            const response = await axios.get('http://localhost:3001/auth/login')

            runInAction(() => {
                this.user = response.data;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                // @ts-ignore
                this.error = error.message;
                this.loading = false;
            });
        }
    }
}

const authStore = new AuthStore();
export default authStore;
