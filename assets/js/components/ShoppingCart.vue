<template>
    <div class="cart-container" v-if="!isOnCheckoutPage">
        <a href="#" @click="showCart" class="action">
            <i class="material-icons">shopping_cart</i>

            <div class="badge" v-if="numberOfItems > 0">
                <span>{{ numberOfItems }}</span>
            </div>
        </a>

        <div :class="scrimClasses" />

        <div :class="cartClasses" v-on-click-outside="closeCart">
            <header>
                <p class="title">Your Cart</p>

                <a href="#close" class="close-icon" @click="closeCart">
                    <i class="material-icons">close</i>
                </a>
            </header>

            <section>
                <cart-items />
            </section>

            <footer>
                <div class="row">
                    <p>Subtotal</p>
                    <currency :value="subtotal" />
                </div>

                <a :href="checkoutUrl" class="button" v-if="numberOfItems > 0">Checkout</a>
            </footer>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import disableScrolling from '../mixins/disableScrolling';
import { delay } from '../helpers/delay';
import { getCountryCode } from '../helpers/getCountryCode';

export default {
    mixins: [disableScrolling],

    data: () => ({
        cartOpen: false,
    }),

    methods: {
        showCart (e) {
            e.preventDefault();
            e.stopPropagation();

            this.cartOpen = true;
        },

        closeCart (e) {
            e && e.preventDefault();

            this.cartOpen = false;
        },
    },

    computed: {
        ...mapGetters('cart', ['numberOfItems', 'subtotal']),

        cartClasses () {
            return {
                'cart-popup': true,
                '--shown': this.cartOpen,
            };
        },

        scrimClasses () {
            return {
                'scrim': true,
                '--shown': this.cartOpen,
            };
        },

        shouldScrollBeDisabled () {
            return this.cartOpen;
        },

        checkoutUrl () {
            return `/${getCountryCode()}/checkout`;
        },

        isOnCheckoutPage () {
            return this.checkoutUrl == window.location.pathname;
        },
    },

    watch: {
        numberOfItems () {
            if (!this.cartOpen) {
                this.cartOpen = true;
            }
        },
    },
}
</script>
