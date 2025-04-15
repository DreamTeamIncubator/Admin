import {useEffect, useRef} from 'react';

export const useDebounce = <T>(callback: (...args: T[])=>void, delay: number) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    function debouncedFunction (...args: T[]) {
        if(timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        timeoutRef.current = setTimeout(()=>{
            console.log('debounced callback fired with args:', args)
            callback(...args)
        }, delay)
    }

    useEffect(()=>{
            return () => {
                if(timeoutRef.current) {
                    clearTimeout(timeoutRef.current)
                }
            }
    }, [])

    return debouncedFunction
}