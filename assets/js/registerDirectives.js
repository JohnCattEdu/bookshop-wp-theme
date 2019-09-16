import Vue from 'vue';

import { VueMaskDirective } from 'v-mask';

import onClickOutside from './directives/onClickOutside';

export const registerDirectives = () => {
    Vue.directive('on-click-outside', onClickOutside);
    Vue.directive('mask', VueMaskDirective);
};
