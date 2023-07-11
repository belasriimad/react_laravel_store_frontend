import { useEffect } from 'react';

export default function useTitle(title) {

    useEffect(() => {
        document.title = `React Store - ${title}`;
    }, [title]);

    return null;
}
