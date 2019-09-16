export default {
    bind (el, binding) {
        el.clickOutsideHandler = (e) => {
            if (!el.contains(e.target)) {
                binding.value();
            }
        };

        document.addEventListener('click', el.clickOutsideHandler);
    },

    unbind (el) {
        document.removeEventListener('click', el.clickOutsideHandler);
    },
}
