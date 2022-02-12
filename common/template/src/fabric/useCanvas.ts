import { useCallback, useEffect, useRef } from 'react';
import { fabric } from './fabric';

const DEV_MODE = process.env.NODE_ENV === 'development';

const NOOP = () => { };

/**
 * Create fabric.Canvas ref
 * Supports restoring canvas state after reload when in DEV mode
 * We use a ref function and not a ref object because fabric.Canvas 
 * needs to be informed of changes made to the canvas element it works with
 * 
 * @param {(canvas: fabric.Canvas) => void | (() => void)} [init] callback invoked after canvas has been initialized (runs every time the canvas element ref changes)\
 * return a disposer if the callback needs cleanup (e.g. unregister events).
 * @param {boolean} [saveState=true] save canvas state between app refresh cycles, has effect only in DEV mode
 */
export function useCanvas(init?: (canvas: fabric.Canvas) => void | (() => void), saveState = true, deps?: any[]) {
    const elementRef = useRef<HTMLCanvasElement>(null);
    const fc = useRef<fabric.Canvas | null>(null);
    const disposer = useRef<(() => any) | null | void>(null);
    const data = useRef<any>(null);
    const cb = useRef<string>(null);
    const callback = useCallback(init, deps);

    const dispose = useCallback((blockSaving?: boolean) => {
        // save state
        if (!blockSaving && DEV_MODE && saveState && fc.current) {
            data.current = fc.current.toJSON();
        }
        typeof disposer.current === 'function' && disposer.current();
        disposer.current = null;
        fc.current?.dispose();
        fc.current = null;
    }, [saveState, disposer, fc]);

    const setRef = useCallback((ref: HTMLCanvasElement | null) => {
        dispose();
        elementRef.current = ref;
        if (!ref) return;
        // set ref and invoke callback
        const canvas = new fabric.Canvas(ref);
        fc.current = canvas;
        disposer.current = callback(canvas);
        // restore state
        DEV_MODE && saveState && canvas.loadFromJSON(data.current, NOOP);
    }, [fc, saveState, dispose, callback]);

    //  invalidates canvas once init callback changes
    useEffect(() => {
        if (!DEV_MODE) return;
        const canvas = fc.current;
        if (cb.current !== callback.toString() && canvas) {
            typeof disposer.current === 'function' && disposer.current();
            canvas.clear();
            disposer.current = callback(canvas);
        }
        cb.current = callback.toString();
    }, [fc, callback, cb]);

    return [fc, setRef] as [typeof fc, typeof setRef];
}
