import Vue from 'vue';
import { store } from './store';
import { registerComponents } from './registerComponents';
import { registerDirectives } from './registerDirectives';

registerDirectives();
registerComponents();

new Vue({
    el: '#app',
    store,
});
