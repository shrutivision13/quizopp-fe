import { useCallback } from 'react';

const useCookie = () => {
    const getCookie = useCallback((name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }, []);

    return { getCookie };
};

export default useCookie;
