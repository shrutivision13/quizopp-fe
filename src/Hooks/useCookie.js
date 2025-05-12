import { useCallback } from 'react';

const useCookie = () => {
    const getCookie = useCallback((name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }, []);

    const deleteCookie = useCallback((name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }, []);

    const setCookie = useCallback((name, value, maxAgeInSeconds = 7 * 24 * 60 * 60) => {
        document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeInSeconds}`;
    }, []);

    return { getCookie, deleteCookie, setCookie };
};

export default useCookie;
