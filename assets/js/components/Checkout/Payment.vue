<template>
<form class="flex flex-wrap">
    <div class="w-full">
        <h1 class="section-title">Payment Details</h1>
    </div>

    <div class="w-2/3 pr-2">
        <div class="field --required">
            <label>Card Number</label>
            <input
                type="text"
                v-model="cardNumber"
                required
                v-mask="'#### #### #### ####'"
                placeholder="•••• •••• •••• ••••"
            />

            <ErrorMessage :errors="errors" name="cardNumber" />
        </div>
    </div>

    <div class="w-1/3 pl-2">
        <div class="field --required">
            <label>CVC</label>
            <input
                type="text"
                v-model="cvc"
                required
                v-mask="'###?#'"
                placeholder="•••"
            />

            <ErrorMessage :errors="errors" name="cvc" />
        </div>
    </div>

    <div class="w-2/3 pr-2">
        <div class="field --required">
            <label>Cardholder Name</label>
            <input
                type="text"
                v-model="cardholder"
                required
                placeholder="John Doe"
            />

            <ErrorMessage :errors="errors" name="cardholder" />
        </div>
    </div>

    <div class="w-1/3 pl-2">
        <div class="field --required">
            <label>Expiration Date</label>
            <input
                type="text"
                v-model="expiry"
                required
                v-mask="'##/##'"
                placeholder="MM/YY"
            />

            <ErrorMessage :errors="errors" name="expiry" />
        </div>
    </div>
</form>
</template>

<script>
import Vue from 'vue';
import ErrorMessage from './ErrorMessage';
import { mapActions } from 'vuex';

export default {
    components: { ErrorMessage },

    props: {
        bus: Vue,
    },

    data: () => ({
        errors: {},
        cardNumber: '',
        cvc: '',
        cardholder: '',
        expiry: '',
    }),

    mounted () {
        this.bus.$on('continue', this.continue);
    },

    beforeDestroy () {
        this.bus.$off('continue', this.continue);
    },

    methods: {
        ...mapActions('payment', ['getIdentifier']),

        continue () {
            const errors = this.validateForm();
            this.errors = errors;

            if (Object.keys(errors).length < 1) {
                this.handlePayment();
            }
        },

        validateForm () {
            const errors = {};

            if (!this.cardNumber) {
                errors.cardNumber = 'Card number is required!';
            } else if (!this.cardNumberIsValid()) {
                errors.cardNumber = 'Card number is invalid.';
            }

            if (!this.cvc) {
                errors.cvc = 'CVC is required!';
            }

            if (!this.cardholder) {
                errors.cardholder = 'Cardholder name is required!';
            }

            if (!this.expiry) {
                errors.expiry = 'Expiration date is required!';
            } else if (!this.expiryIsValid()) {
                errors.expiry = 'Expiration date is invalid.';
            }

            return errors;
        },

        handlePayment () {
            const cardDetails = this.getCardDetails();
            this.getIdentifier({ cardDetails })
                .then(() => {
                    this.bus.$emit('next');
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        getCardDetails () {
            const { cardholder, cardNumber, expiry, cvc } = this;

            return {
                cardNumber: cardNumber.replace(/ +/g, ''),
                cardholderName: cardholder,
                expiryDate: expiry.replace(/\//g, ''),
                securityCode: cvc,
            };
        },

        cardNumberIsValid () {
            const cn = this.cardNumber.replace(/[^\d]+/g, '');

            return cn.length >= 12;
        },

        expiryIsValid () {
            const expiry = this.expiry;

            return /^(0[1-9]|1[012])\/\d{2}$/.test(expiry);
        },
    },
};
</script>
