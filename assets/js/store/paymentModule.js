import { get } from '../helpers/get';
import { post } from '../helpers/post';

export const paymentModule = {
    namespaced: true,

    state: {
        msk: null,
        cardIdentifier: null,
        response: null,
    },

    mutations: {
        receivedMsk (state, msk) {
            state.msk = msk;
        },

        receivedIdentifier (state, identifier) {
            state.cardIdentifier = identifier;
        },

        receivedResponse (state, response) {
            state.response = response;
        },
    },

    actions: {
        async getMsk ({ commit }) {
            const res = await get('/pay/msk');

            commit('receivedMsk', res.msk);

            return res.msk;
        },

        async tokenize ({ dispatch }, cardDetails) {
            const merchantSessionKey = await dispatch('getMsk');

            return new Promise((resolve, reject) => {
                sagepayOwnForm({ merchantSessionKey })
                    .tokeniseCardDetails({
                        cardDetails,

                        onTokenised (result) {
                            if (result.success) {
                                resolve(result.cardIdentifier);
                            } else {
                                reject(result);
                            }
                        }
                    })
            });
        },

        async getIdentifier ({ dispatch, commit }, { cardDetails }) {
            try {
                const cardIdentifier = await dispatch('tokenize', cardDetails);
                commit('receivedIdentifier', cardIdentifier);

                return;
            } catch (e) {
                throw e;
            }
        },

        async pay ({ state, commit }, orderId) {
            let errored = false;

            try {
                const { msk, cardIdentifier } = state;
                const res = await post(`/pay/${orderId}`, { msk, cardIdentifier });

                if (res.success) {
                    commit('receivedResponse', res);
                    return res;
                } else {
                    errored = true;
                }
            } catch (e) {
                errored = e;
                console.error(e);
            }

            if (errored) {
                throw errored || undefined;
            }
        },
    },
};
