import { getCountryCode } from './getCountryCode';
import { removeFirstSlash } from './removeFirstSlash';

const getHeaders = () => {
    const csrf = document.querySelector('meta[name="csrf-token"]');

    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrf.content,
    };
};

const getOptions = (data) => ({
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
});

const getUrl = (url) => `/${getCountryCode()}/api/${removeFirstSlash(url)}`;

export const post = async (url, data) => {
    const res = await fetch(getUrl(url), getOptions(data));

    if (res.ok) {
        return await res.json();
    }

    throw await res.json();
};
