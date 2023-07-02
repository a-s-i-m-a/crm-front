import { AuthStore } from './authStore';

export class RootStore {
    authStore: AuthStore;

    constructor() {
        this.authStore = new AuthStore();
    }
}

const rootStore = new RootStore();
export default rootStore;
