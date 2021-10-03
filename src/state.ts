import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Options for State class
 */
export interface StateOptions<T extends Object> {
    /** Initial value */
    initialValue: T;
    /** Activate debug */
    debug?: boolean;
}
const defaultOptions: StateOptions<any> = {
    initialValue: null,
    debug: false,
};

/**
 * A class to manage object state
 *
 * Reliable with flat objects
 */
export class State<T extends Object> {
    /** Source of thruth */
    protected state: BehaviorSubject<T>;
    /** Observable for state */
    state$: Observable<T>;
    /** Get synchronous state value */
    get stateSync(): T {
        return this.state.getValue();
    }
    /** Is debug enabled */
    protected isDebugEnabled = false;
    get hasDebug() {
        return this.isDebugEnabled;
    }

    /** Constructor
     * @param options See {@link StateOptions}
     */
    constructor(options?: Partial<StateOptions<T>>) {
        options = { ...defaultOptions, ...options };
        this.state = new BehaviorSubject<T>(
            !!options.initialValue
                ? options.initialValue
                : defaultOptions.initialValue
        );
        this.state$ = this.state.asObservable();
        this.isDebugEnabled = options.debug || false;
    }

    /**
     * Set state
     *
     * Merge new state with current state
     * @param newState A partial state
     */
    setState(newState: Partial<T>): void {
        const merged = { ...this.stateSync, ...newState };
        this.showDebug(merged);
        this.state.next(merged);
    }

    protected showDebug(merged: T & Partial<T>) {
        if (this.isDebugEnabled) {
            console.group('[rxjs-state] Set state');
            console.log('- Old state:', this.stateSync);
            console.log('- New state:', merged);
            console.groupEnd();
        }
    }
}
