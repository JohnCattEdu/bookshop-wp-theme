<template>
    <transition-group class="slider" tag="div" name="slide">
        <div
            v-for="slide in [currentSlide]"
            :key="slide.id"
            class="slide"
            :style="`background: ${slide.background_color}`"
            @mouseover="stopRotation"
            @mouseout="startRotation"
        >
            <div class="slide-container">
                <div class="info">
                    <h2 class="title">{{slide.title}}</h2>
                    <h3 class="subtitle" v-if="slide.subtitle">{{slide.subtitle}}</h3>
                    <p class="text">{{slide.text}}</p>

                    <a :href="getItemUrl(slide.product)" class="view">
                        View
                    </a>
                </div>

                <div class="book-cover">
                    <Book
                        :image="slide.product.image"
                        :width="150"
                        :height="200"
                    />
                </div>
            </div>
        </div>
    </transition-group>
</template>

<script>
import Book from './Slider/Book';
import { getCountryCode } from '../helpers/getCountryCode';

export default {
    components: { Book },

    props: {
        slides: Array,
    },

    data () {
        return {
            index: 0,
            timer: null,
        };
    },

    /**
     * Starts the slider.
     */
    mounted () {
        this.startRotation();
    },

    /**
     * Stops the timer on destroy.
     */
    beforeDestroy () {
        this.stopRotation();
    },

    methods: {
        /**
         * Starts the rotation.
         */
        startRotation () {
            this.timer = setInterval(this.next, 3000);
        },

        /**
         * Cancels the rotation.
         */
        stopRotation () {
            if (this.timer) {
                clearTimeout(this.timer);
                this.timer = null;
            }
        },

        /**
         * Goes forward by one slide.
         */
        next () {
            this.index += 1;
        },

        /**
         * Goes back by one slide.
         */
        prev () {
            this.index -= 1;
        },

        getItemUrl (product) {
            const countryCode = getCountryCode();

            return `/${countryCode}/book/${product.slug}`;
        },
    },

    computed: {
        /**
         * Gets the current slide to show.
         */
        currentSlide () {
            const index = Math.abs(this.index);
            const totalSlides = this.slides.length;

            return this.slides[index % totalSlides];
        },
    },
}
</script>

