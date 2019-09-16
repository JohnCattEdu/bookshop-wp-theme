import { getCountryCode } from './getCountryCode';
import { removeFirstSlash } from './removeFirstSlash';

const getOptions = () => ({
    method: 'GET',
});

const getUrl = (url, withCountry) => {
    const prefix = withCountry ? `/${getCountryCode()}` : '';

    return `${prefix}/api/${removeFirstSlash(url)}`;
};

export const get = async (url, withCountry = true) => {
    const res = await fetch(getUrl(url, withCountry), getOptions());

    if (res.ok) {
        return await res.json();
    }

    throw await res.json();
};
