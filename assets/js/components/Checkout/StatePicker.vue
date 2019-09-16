<template>
    <div class="select-wrapper">
        <select name="state" id="state" :value="value" @input="$emit('input', $event.target.value)">
            <option value="" :disabled="states.length > 0">Please Choose</option>
            <option
                v-for="state in states"
                :key="state.code"
                :value="state.code"
            >
                {{ state.name }}
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
        ...mapState('states', ['states']),
    },

    methods: {
        ...mapActions('states', ['loadStates']),
    },

    mounted () {
        this.loadStates();
    },
}
</script>

