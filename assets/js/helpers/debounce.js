export const debounce = (func, time) => {
    let timeout = null;

    return function (...args) {
        const next = () => func.apply(this, args);

        clearTimeout(timeout)
        timeout = setTimeout(next, time);
    };
};
