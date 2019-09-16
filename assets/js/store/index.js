import Vue from 'vue';
import Vuex from 'vuex';

import { cartModule } from './cartModule';
import { toasterModule } from './toasterModule';
import { countriesModule } from './countriesModule';
import { paymentModule } from './paymentModule';
import { statesModule } from './statesModule';

Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        cart: cartModule,
        toaster: toasterModule,
        countries: countriesModule,
        payment: paymentModule,
        states: statesModule,
    },
});
