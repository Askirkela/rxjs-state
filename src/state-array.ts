import { State } from './index';
import { StateOptions } from './state';

export interface StateArrayOptions<T extends Array<unknown>>
    extends StateOptions<T> { }

export class StateArray<T extends Array<unknown>> extends State<T> {
    constructor(options?: Partial<StateArrayOptions<T>>) {
        super(options);
    }

    setState(newState: T) {
        let merged: T;
        if (!!this.stateSync) {
            merged = [...this.stateSync, ...newState] as T;
        } else {
            merged = [...newState] as T;
        }
        if (this.isDebugEnabled) {
            this.showDebug(merged);
        }
        this.state.next(merged);
    }
}
