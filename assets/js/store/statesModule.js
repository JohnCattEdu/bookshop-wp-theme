import { get } from '../helpers/get';

export const statesModule = {
    namespaced: true,

    state: {
        loaded: false,
        states: [],
    },

    mutations: {
        set (state, states) {
            state.states = states;
            state.loaded = true;
        },
    },

    actions: {
        async loadStates ({ commit, state }) {
            if (state.loaded) {
                return;
            }

            let errored = false;

            try {
                const states = await get('/states', false);
                commit('set', states);
            } catch (err) {
                errored = true;
            }

            if (errored) {
                throw undefined;
            }
        },
    },
};
