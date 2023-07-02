import {createContext} from 'react';

import {RootStore} from './rootStore';

export const appStoreContext = createContext(new RootStore());