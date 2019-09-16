<template>
<div class="cards-container">
    <div class="card --items">
        <Overview
            v-if="stage === stages.OVERVIEW"
            :bus="bus"
            :subtotal="subtotal"
        />

        <BillingAddress
            v-if="stage === stages.BILLING_INFO"
            :bus="bus"
            title="Billing Information"
            :sameAddressPicker="true"
        />

        <ShippingAddress
            v-if="stage === stages.SHIPPING_INFO"
            :bus="bus"
            title="Shipping Address"
        />

        <div v-if="stage === stages.CHECKING_OUT">
            <div class="spinner --spaced" />
        </div>

        <Payment
            v-if="stage === stages.PAYMENT"
            :bus="bus"
        />

        <Paying
            v-if="stage === stages.PAYING"
            :bus="bus"
        />

        <Redirect
            v-if="stage === stages.paid.REDIRECT"
            :bus="bus"
        />
    </div>

    <div class="card --subtotal">
        <p class="label">Subtotal</p>
        <p class="value">
            <currency :value="subtotal" />
        </p>

        <ShippingCost
            v-if="checkoutData.shippingAddress"
            :bus="bus"
            :country="checkoutData.shippingAddress.country.split(',')[0]"
        />

        <div v-if="checkoutData.shippingCost">
            <p class="label">Total</p>
            <p class="value">
                <currency :value="subtotal + checkoutData.shippingCost" />
            </p>
        </div>

        <a href="#continue" class="button" @click="next" v-if="numberOfItems > 0">
            <span v-if="stage === stages.PAYMENT">
                Pay
            </span>
            <span v-else-if="stage === stages.PAYING || stage === stages.paid.REDIRECT">
                <div class="spinner --white --condensed" />
            </span>
            <span v-else>
                Continue
            </span>
        </a>
    </div>
</div>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Overview from './Checkout/Overview';
import AddressForm from './Checkout/AddressForm';
import ShippingCost from './Checkout/ShippingCost';
import Payment from './Checkout/Payment';
import Paying from './Checkout/Paying';
import Redirect from './Checkout/Paid/Redirect';

const stages = {
    OVERVIEW: 'overview',
    BILLING_INFO: 'billing info',
    SHIPPING_INFO: 'shipping info',
    CHECKING_OUT: 'checking out',
    PAYMENT: 'payment',
    PAYING: 'paying',

    paid: {
        REDIRECT: 'redirect',
    },
};

export default {
    components: {
        Overview,
        ShippingCost,
        BillingAddress: AddressForm,
        ShippingAddress: AddressForm,
        Payment,
        Paying,
        Redirect,
    },

    data () {
        return {
            stages,
            stage: stages.OVERVIEW,
            // stage: stages.PAYING,
            bus: new Vue,
            checkoutData: {},
        };
    },

    mounted () {
        this.bus.$on('next', (payload) => {
            const { stage, stages } = this;

            switch (stage) {
                case stages.OVERVIEW: {
                    this.stage = stages.BILLING_INFO;
                    break;
                }

                case stages.BILLING_INFO: {
                    if (!payload) break;
                    const { sameAddress, address } = payload;

                    this.checkoutData.billingAddress = address;

                    if (sameAddress) {
                        this.checkoutData.shippingAddress = address;
                        this.stage = stages.CHECKING_OUT;
                    } else {
                        this.stage = stages.SHIPPING_INFO;
                    }

                    break;
                }

                case stages.SHIPPING_INFO: {
                    const { address } = payload;
                    this.checkoutData.shippingAddress = address;
                    this.stage = stages.CHECKING_OUT;
                    break;
                }

                case stages.CHECKING_OUT: {
                    this.stage = stages.PAYMENT;
                    break;
                }

                case stages.PAYMENT: {
                    this.stage = stages.PAYING;
                    break;
                }

                case stages.PAYING: {
                    this.handlePayingComplete(payload);
                    break;
                }
            }
        });

        this.bus.$on('shippingCostCalculated', (cost) => {
            Vue.set(this.checkoutData, 'shippingCost', cost);
            this.checkout(this.checkoutData)
                .then(({ order, price }) => {
                    this.bus.$emit('next', { order, price });
                })
                .catch((err) => {
                    console.log(err);
                });
        });

        this.bus.$on('error', (err) => {
            console.error(err);
        });
    },

    computed: {
        ...mapGetters('cart', ['subtotal', 'numberOfItems']),
    },

    methods: {
        ...mapActions('cart', ['checkout']),

        next (e) {
            e.preventDefault();
            this.bus.$emit('continue');
        },

        handlePayingComplete (res) {
            const { stages } = this;

            switch (res.type) {
                case '3DS': {
                    this.stage = stages.paid.REDIRECT;
                    break;
                }

                case 'normal': {
                    window.location.href = res.redirect_to;
                    break;
                }
            }
        },
    },
}
</script>
