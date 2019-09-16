<template>
    <div class="select-wrapper">
        <select name="country" id="country" :value="value" @input="$emit('input', $event.target.value)">
            <option value="" :disabled="countries.length > 0">Please Choose</option>
            <option
                v-for="country in countries"
                :key="country.code"
                :value="`${country.code},${country.name}`"
            >
                {{ country.name }}
            </option>
        </select>

        <div class="icon-wrapper">
            <i class="material-icons">keyboard_arrow_down</i>
        </div>
    </div>
</template>

<script>
import { get } from '../../helpers/get';
import { mapActions, mapState } from 'vuex';

export default {
    props: ['value'],

    computed: {
        ...mapState('countries', ['countries']),
    },

    methods: {
        ...mapActions('countries', ['loadCountries']),
    },

    mounted () {
        this.loadCountries();
    }
}
</script>
