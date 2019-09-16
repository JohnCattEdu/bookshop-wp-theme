<template>
    <form class="add-to-cart" @submit="handleSubmit">
        <button :class="btnClasses" types="submit">
            <template v-if="posting">
                Adding...
            </template>
            <template v-else>
                Add to Cart
                <span class="separator">&mdash;</span>
                <currency :value="price * quantity" />
            </template>
        </button>

        <quantity-stepper v-model="quantity" />
    </form>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    props: {
        price: Number,
        initialQuantity: {
            type: Number,
            default: 1
        },
        productSlug: String,
    },

    data () {
        return {
            quantity: this.initialQuantity,
            posting: false,
        };
    },

    methods: {
        ...mapActions('cart', ['addItem']),

        handleSubmit (e) {
            e.preventDefault();
            this.posting = true;

            const slug = this.productSlug;
            const quantity = this.quantity;

            this.addItem({ slug, quantity })
                .then(() => {
                    this.posting = false;
                });
        },
    },

    computed: {
        btnClasses () {
            return {
                'buy': true,
                '--working': this.posting,
            };
        },
    },
}
</script>

