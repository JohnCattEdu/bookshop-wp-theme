<template>
    <div class="spinner --spaced" />
</template>

<script>
import Vue from 'vue';
import { mapState, mapActions } from 'vuex';

export default {
    props: {
        bus: Vue,
    },

    mounted () {
        this.pay(this.order)
            .then((res) => {
                this.bus.$emit('next', res);
            })
            .catch((err) => {
                console.log('o shit');
            });
    },

    methods: {
        ...mapActions('payment', ['pay']),
    },

    computed: {
        ...mapState('cart', ['order']),
    },
}
</script>
