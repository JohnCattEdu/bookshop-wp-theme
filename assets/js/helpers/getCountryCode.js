const removeFirstSlash = str => str.replace(/^\//, '');

export const getCountryCode = () => {
    const { pathname } = window.location;

    return removeFirstSlash(pathname)
        .split('/')[0];
};
