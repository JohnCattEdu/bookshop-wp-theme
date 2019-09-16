<template>
    <div class="book-3d" :style="cssVars">
        <div class="book">
            <div class="front"></div>
            <div class="back"></div>
            <div class="spine"></div>

            <div class="pages side"></div>
            <div class="pages top"></div>
            <div class="pages bottom"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        image: String,
        width: Number,
        height: Number,
        depth: {
            type: Number,
            default: 30,
        },
        spineColor: {
            type: String,
            default: '#4e4e4e',
        },
    },

    computed: {
        cssVars () {
            const { width, height, depth, image, spineColor } = this;

            return `
                --width: ${width}px;
                --height: ${height}px;
                --depth: ${depth}px;
                --cover: url('${image}');
                --spine-color: ${spineColor};
            `;
        },
    },
}
</script>

