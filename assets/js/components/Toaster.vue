<template>
    <div class="toaster">
        <div v-for="toast in toasts" :key="toast.id" :class="getClasses(toast)">
            <p>{{toast.text}}</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { delay } from '../helpers/delay';

export default {
    computed: {
        ...mapGetters('toaster', ['toasts']),
    },

    methods: {
        getClasses (toast) {
            return {
                'toast': true,
                '--appearing': !toast.leaving,
                '--disappearing': toast.leaving,
            };
        },
    },
}
</script>

