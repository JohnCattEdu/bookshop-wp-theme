<template>
<p v-if="errors[name]" class="error-message">
    {{ errors[name] }}
</p>
</template>

<script>
export default {
    props: {
        name: String,
        errors: Object,
    },
}
</script>
