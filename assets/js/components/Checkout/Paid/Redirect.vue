<template>
    <div>
        <p>You should be redirected to your card providers 3-D Secure screen in a few seconds...</p>

        <div class="spinner --spaced"></div>

        <form :action="response.redirect_to" method="POST" ref="form">
            <input type="hidden" name="PaReq" :value="response.pa_req">
            <input type="hidden" name="TermUrl" :value="response.return_to">
            <input type="hidden" name="MD" :value="response.transaction_id">
        </form>
    </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from 'vuex';

export default {
    props: {
        bus: Vue,
    },

    computed: {
        ...mapState('payment', ['response']),
    },

    mounted () {
        this.$refs.form.submit();
    },
}
</script>
