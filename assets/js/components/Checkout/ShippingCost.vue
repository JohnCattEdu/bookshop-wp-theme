<template>
    <div>
        <p class="label">Shipping Cost</p>
        <p class="value">
            <template v-if="shippingCost">
                <currency :value="shippingCost" />
            </template>
            <span v-else>Calculating...</span>
        </p>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';
import { get } from '../../helpers/get';

export default {
    props: {
        country: String,
        bus: Vue,
    },

    data: () => ({
        shippingCost: null,
    }),

    methods: {
        ...mapActions('toaster', ['toast']),
    },

    mounted () {
        get(`/shipping/calculate/${this.country}`)
            .then(data => {
                this.shippingCost = data.shipping_cost;
                this.bus.$emit('shippingCostCalculated', this.shippingCost);
            })
            .catch(err => {
                this.toast('Something went wrong!');
                this.bus.$emit('error', err);
            });
    },
}
</script>

