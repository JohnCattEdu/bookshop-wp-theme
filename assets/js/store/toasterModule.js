import Vue from 'vue';
import uuid from 'uuid/v4';
import { delay } from '../helpers/delay';

const createToast = (id, text) => ({
    id,
    text,
    leaving: false,
});

export const toasterModule = {
    namespaced: true,

    state: {
        toastMap: {},
    },

    mutations: {
        add (state, { id, text }) {
            Vue.set(state.toastMap, id, createToast(id, text));
        },

        startLeaving (state, { id }) {
            Vue.set(state.toastMap[id], 'leaving', true);
        },

        remove (state, { id }) {
            Vue.delete(state.toastMap, id);
        },
    },

    actions: {
        toast ({ commit }, text = 'Something went wrong...') {
            const id = uuid();

            commit('add', { id, text });
            delay(2500).then(() => {
                commit('startLeaving', { id });

                delay(200).then(() => {
                    commit('remove', { id });
                });
            });
        },
    },

    getters: {
        toasts: state => Object.values(state.toastMap),
    },
}
