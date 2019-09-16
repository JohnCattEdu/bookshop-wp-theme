export default {
    watch: {
        shouldScrollBeDisabled: {
            immediate: true,
            handler (shouldDisable) {
                const el = document.getElementById('app');

                const bodyStyle = window.getComputedStyle(el);
                const marginRight = parseInt(bodyStyle.marginRight, 10);
                const scrollbarWidth = window.innerWidth - el.clientWidth;

                if (shouldDisable) {
                    el.style.overflowY = 'hidden';
                    el.style.marginRight = `${marginRight + scrollbarWidth}px`;
                } else {
                    el.style.overflowY = 'auto';
                    el.style.marginRight = 'auto';
                }
            },
        },
    },
}
