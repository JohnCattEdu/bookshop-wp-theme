<template>
    <div :class="stepperClasses">
        <button @click="decrement" :disabled="!canDecrement">
            <i class="material-icons">remove</i>
        </button>
        <input :value="innerValue" @input="handleChange($event.target.value)">
        <button @click="increment">
            <i class="material-icons">add</i>
        </button>
    </div>
</template>

<script>
import Vue from 'vue';
import { debounce } from '../helpers/debounce';

let shouldEmit = true;

export default {
    props: {
        value: Number,
        condensed: {
            type: Boolean,
            default: false,
        },
        debounced: {
            type: Boolean,
            default: false,
        },
        bus: Vue,
    },

    data () {
        return {
            timeout: null,
            innerValue: this.value,
        };
    },

    created () {
        if (this.bus) {
            this.bus.$on('resetStepper', () => {
                this.innerValue = this.value;
            });
        }
    },

    methods: {
        increment (e) {
            e.preventDefault();

            this.handleChange(this.innerValue + 1);
        },

        decrement (e) {
            e.preventDefault();

            if (this.value > 1) {
                this.handleChange(this.innerValue - 1);
            }
        },

        handleChange (val) {
            if (val) {
                val = val.replace(/[^\d]/g, '');
                val = parseInt(val, 10);
            }

            this.innerValue = val;
        },

        triggerEvent (val) {
            this.$emit('input', val);
        },

        debouncedTriggerEvent: debounce(function (val) {
            this.$emit('input', val);
        }, 1000),
    },

    watch: {
        innerValue (val) {
            if (!val) return;

            if (this.debounced) {
                this.debouncedTriggerEvent(val);
            } else {
                this.triggerEvent(val);
            }
        },

        value (val) {
            if (val !== this.innerValue) {
                this.innerValue = val;
            }
        },
    },

    computed: {
        canDecrement: function () {
            return this.value > 1;
        },

        stepperClasses () {
            return {
                'quantity-stepper': true,
                '--condensed': this.condensed || false,
            };
        },
    },
}
</script>
