<template>
    <div>
        <h1 class="section-title">Your Cart</h1>
        <cart-items :large="true" />
    </div>
</template>

<script>
import Vue from 'vue';

export default {
    props: {
        bus: Vue,
    },

    mounted () {
        this.bus.$on('continue', this.continue);
    },

    beforeDestroy () {
        this.bus.$off('continue', this.continue);
    },

    methods: {
        continue () {
            this.bus.$emit('next');
        },
    },
}
</script>
