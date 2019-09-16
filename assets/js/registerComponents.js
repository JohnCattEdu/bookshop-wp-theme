import Vue from 'vue';

import QuantityStepper from './components/QuantityStepper';
import AddToCartForm from './components/AddToCartForm';
import Currency from './components/Currency';
import ShoppingCart from './components/ShoppingCart';
import Toaster from './components/Toaster';
import Checkout from './components/Checkout';
import CartItems from './components/CartItems';
import Slider from './components/Slider';
import Sorter from './components/Sorter';
import Tabber from './components/Tabber';
import Tab from './components/Tab';

export const registerComponents = () => {
    Vue.component('quantity-stepper', QuantityStepper);
    Vue.component('add-to-cart-form', AddToCartForm);
    Vue.component('currency', Currency);
    Vue.component('shopping-cart', ShoppingCart);
    Vue.component('toaster', Toaster);
    Vue.component('checkout', Checkout);
    Vue.component('cart-items', CartItems);
    Vue.component('slider', Slider);
    Vue.component('sorter', Sorter);
    Vue.component('tabber', Tabber);
    Vue.component('tab', Tab);
};
