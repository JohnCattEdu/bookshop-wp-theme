import { get } from '../helpers/get';

export const countriesModule = {
    namespaced: true,

    state: {
        loaded: false,
        countries: [],
    },

    mutations: {
        set (state, countries) {
            state.countries = countries;
            state.loaded = true;
        },
    },

    actions: {
        async loadCountries ({ commit, state }) {
            if (state.loaded) {
                return;
            }

            let errored = false;

            try {
                const countries = await get('/countries', false);
                commit('set', countries);
            } catch (err) {
                errored = true;
            }

            if (errored) {
                throw undefined;
            }
        },
    },
};
