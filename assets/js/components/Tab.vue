<template>
    <div class="tab">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
    },
}
</script>
