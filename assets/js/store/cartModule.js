import { post } from '../helpers/post';

export const cartModule = {
    namespaced: true,

    state: {
        items: JSON.parse(JSON.stringify(window.cartItems)),
        latestQuantity: {},
        order: null,
    },

    mutations: {
        set (state, cart) {
            state.items = cart;
        },

        setLatestQuantity (state, { id, quantity }) {
            state.latestQuantity[id] = quantity;
        },

        receivedOrder (state, order) {
            state.order = order;
        },
    },

    getters: {
        numberOfItems: state => state.items.reduce((acc, item) => {
            return acc + item.quantity;
        }, 0),

        subtotal: state => state.items.reduce((acc, item) => {
            return acc + (item.unitPrice * item.quantity);
        }, 0),
    },

    actions: {
        async changeQuantity ({ commit, dispatch, state }, { id, quantity }) {
            // Cancel if the quantity isn't actually different
            if (state.latestQuantity[id] === quantity) {
                return;
            }

            // Keep track of if we failed
            let errored = false;

            try {
                const { cart } = await post(`/cart/update/${id}`, { quantity });
                commit('set', cart);
                commit('setLatestQuantity', { id, quantity });
            } catch ({ error, cart }) {
                dispatch('toaster/toast', error, { root: true });
                commit('set', cart);
                errored = true;
            }

            if (errored) {
                throw undefined;
            }
        },

        async addItem ({ commit, dispatch }, { slug, quantity }) {
            try {
                const { cart } = await post(`/cart/add/${slug}`, { quantity });
                commit('set', cart);
            } catch ({ error, cart }) {
                dispatch('toaster/toast', error, { root: true });
                commit('set', cart);
            }
        },

        removeItem ({ commit }, id) {
            return post(`/cart/remove/${id}`)
                .then(({ cart }) => {
                    commit('set', cart);
                });
        },

        async checkout ({ dispatch, commit }, data) {
            let errored = false;

            try {
                const res = await post(`/cart/checkout`, data);
                commit('receivedOrder', res.order);

                return res;
            } catch ({ error }) {
                dispatch('toaster/toast', error, { root: true });
                errored = true;
            }

            if (errored) {
                throw undefined;
            }
        },
    },
};
