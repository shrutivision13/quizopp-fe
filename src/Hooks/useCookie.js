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

    return { getCookie, deleteCookie };
};

export default useCookie;
