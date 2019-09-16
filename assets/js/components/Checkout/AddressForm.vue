<template>
<form class="flex flex-wrap">
    <div class="w-full">
        <h1 class="section-title">{{ title }}</h1>
    </div>

    <div class="w-1/2 pr-2">
        <div class="field --required">
            <label for="first_name">First Name</label>
            <input
                type="text"
                name="first_name"
                id="first_name"
                v-model="firstName"
                required
                @input="checkField('firstName')"
            >

            <ErrorMessage :errors="errors" name="firstName" />
        </div>
    </div>

    <div class="w-1/2 pl-2">
        <div class="field --required">
            <label for="last_name">Last Name</label>
            <input
                type="text"
                name="last_name"
                id="last_name"
                v-model="lastName"
                required
                @input="checkField('lastName')"
            >

            <ErrorMessage :errors="errors" name="lastName" />
        </div>
    </div>

    <div class="w-1/2 pr-2" v-if="sameAddressPicker">
        <div class="field --required">
            <label for="email">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                v-model="email"
                required
                @input="checkField('email')"
            >

            <ErrorMessage :errors="errors" name="email" />
        </div>
    </div>

    <div :class="sameAddressPicker ? 'w-1/2 pl-2' : 'w-full'">
        <div class="field">
            <label for="company_name">Company Name</label>
            <input
                type="text"
                name="company_name"
                id="company_name"
                v-model="companyName"
                @input="checkField('companyName')"
            >

            <ErrorMessage :errors="errors" name="companyName" />
        </div>
    </div>

    <div class="w-full">
        <div class="field --required">
            <label for="address_line_1">Address Line 1</label>
            <input
                type="text"
                name="address_line_1"
                id="address_line_1"
                v-model="addressLine1"
                required
                @input="checkField('addressLine1')"
            >

            <ErrorMessage :errors="errors" name="addressLine1" />
        </div>

        <div class="field">
            <label for="address_line_2">Address Line 2</label>
            <input
                type="text"
                name="address_line_2"
                id="address_line_2"
                v-model="addressLine2"
                @input="checkField('addressLine2')"
            >

            <ErrorMessage :errors="errors" name="addressLine2" />
        </div>

        <div class="field --required">
            <label for="city">Town/City</label>
            <input
                type="text"
                name="city"
                id="city"
                v-model="city"
                required
                @input="checkField('city')"
            >

            <ErrorMessage :errors="errors" name="city" />
        </div>

        <div class="field">
            <label for="country">Country</label>
            <CountryPicker v-model="country" @input="checkField('country')" />

            <ErrorMessage :errors="errors" name="country" />
        </div>

        <div class="field --required" v-if="!country.startsWith('US')">
            <label for="state">County/State/Province</label>
            <input
                type="text"
                name="state"
                id="state"
                v-model="state"
                required
                @input="checkField('state')"
            >

            <ErrorMessage :errors="errors" name="state" />
        </div>

        <div class="field --required" v-if="country.startsWith('US')">
            <label for="state">State</label>
            <StatePicker v-model="state" @input="checkField('state')" />

            <ErrorMessage :errors="errors" name="state" />
        </div>

        <div class="field --required" v-if="!country.startsWith('IE')">
            <label for="postcode">Postcode/ZIP</label>
            <input
                type="text"
                name="postcode"
                id="postcode"
                v-model="postcode"
                required
                @input="checkField('postcode')"
            >

            <ErrorMessage :errors="errors" name="postcode" />
        </div>
    </div>

    <div class="w-full" v-if="sameAddressPicker">
        <div class="field">
            <div class="radio-wrapper">
                <label for="same">
                    <input type="radio" name="same" id="same" :value="true" v-model="sameAddress">
                    Use the same addressing for shipping
                </label>

                <label for="different">
                    <input type="radio" name="different" id="different" :value="false" v-model="sameAddress">
                    Use a different address for shipping
                </label>
            </div>
        </div>
    </div>
</form>
</template>

<script>
import Vue from 'vue';
import CountryPicker from './CountryPicker';
import StatePicker from './StatePicker';
import ErrorMessage from './ErrorMessage';

export default {
    components: { CountryPicker, ErrorMessage, StatePicker },

    props: {
        bus: Vue,
        title: String,
        sameAddressPicker: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        errors: {},
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postcode: '',
        country: '',
        sameAddress: true,
    }),

    mounted () {
        this.bus.$on('continue', this.continue);
    },

    beforeDestroy () {
        this.bus.$off('continue', this.continue);
    },

    methods: {
        checkField (name) {
            if (this.errors[name] && this[name]) {
                const { [name]: remove, ...errors } = this.errors;

                this.errors = errors;
            }
        },

        continue () {
            const errors = this.validateForm();
            this.errors = errors;

            if (Object.keys(errors).length < 1) {
                const { sameAddress, ...address } = this.$data;

                this.bus.$emit('next', { sameAddress, address });
            }
        },

        validateForm () {
            const errors = {};

            if (!this.firstName) {
                errors.firstName = 'First name is required!';
            }

            if (!this.lastName) {
                errors.lastName = 'Last name is required!';
            }

            if (this.sameAddressPicker && !this.email) {
                errors.email = 'Email is required!';
            }

            if (!this.addressLine1) {
                errors.addressLine1 = 'Address Line 1 is required!';
            }

            if (!this.city) {
                errors.city = 'Town/City is required!';
            }

            if (!this.state) {
                errors.state = 'County/State/Province is required!';
            }

            if (!this.country.startsWith('IE') && !this.postcode) {
                errors.postcode = 'Postcode/ZIP is required!';
            }

            if (!this.country) {
                errors.country = 'Country is required!';
            }

            return errors;
        },
    },

    watch: {
        country (val, oldVal) {
            if (oldVal.startsWith('US') && val !== oldVal) {
                this.state = '';
            }
        },
    },
}
</script>

