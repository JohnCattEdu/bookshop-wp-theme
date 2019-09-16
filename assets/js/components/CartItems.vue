<template>
    <div :class="{ 'cart-items': true, '--large': large }">
        <template v-if="items.length">
            <div v-for="item in items" :key="item.id" :class="{
                item: true,
                '--shake': isShaking(item.id),
            }">
                <div class="remove-btn">
                    <a href="#remove" @click="handleRemoveClick($event, item.id)">
                        <i class="material-icons">remove_circle</i>
                    </a>
                </div>

                <div class="img-container">
                    <img :src="item.product.image || '/img/book.png'" :alt="item.product.name" />
                </div>

                <div class="info-container">
                    <p class="title">{{ item.product.name }}</p>
                    <p class="subtotal">
                        <currency :value="item.unitPrice * item.quantity" />
                    </p>
                    <p class="unit-price">
                        <currency :value="item.unitPrice" />/each
                    </p>

                    <div class="stepper-wrapper">
                        <quantity-stepper
                            v-model="item.quantity"
                            @input="isUpdating(item.id) ? null : handleQuantityChange($event, item.id)"
                            :bus="bus"
                            :debounced="true"
                            :condensed="!large"
                        />

                        <template v-if="isUpdating(item.id)">
                            <div class="loading">
                                <i class="material-icons">hourglass_empty</i>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </template>

        <p v-else>No items in your cart.</p>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import { delay } from '../helpers/delay';

export default {
    props: {
        large: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        bus: new Vue(),
        shaking: [],
        updating: [],
    }),

    computed: mapState('cart', ['items']),

    methods: {
        ...mapActions('cart', ['removeItem', 'changeQuantity']),

        handleRemoveClick (e, id) {
            e.preventDefault();

            this.removeItem(id);
        },

        handleQuantityChange (quantity, id) {
            // Trigger the 'updating' icon
            this.updating.push(id);
            console.log('updating');

            // Trigger the API request
            this.changeQuantity({ id, quantity })
                .catch(() => {
                    console.log('caught');
                    // Something wen't wrong, so alert the user
                    // by shaking the item
                    this.shake(id);

                    this.bus.$emit('resetStepper');
                })
                .then(() => {
                    console.log('done');
                    // We're done with our updating, so remove the icon
                    this.updating = this.updating.filter(i => i !== id);
                });
        },

        shake (id) {
            this.shaking.push(id);

            delay(300).then(() => {
                this.shaking = this.shaking.filter(i => i !== id);
            });
        },

        isUpdating (id) {
            return this.updating.includes(id);
        },

        isShaking (id) {
            return this.shaking.includes(id);
        },
    },
}
</script>

