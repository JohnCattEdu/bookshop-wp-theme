<template>
    <span>{{ formatted }}</span>
</template>

<script>
export default {
    props: {
        value: Number,
    },

    computed: {
        formatted () {
            return window.currencySymbol + (this.value / 100).toFixed(2);
        },
    },
}
</script>

