import { StateArray } from '../src/index';

describe('StateArray', () => {
    let instance: StateArray<number[]>;
    beforeEach(() => {
        instance = new StateArray<number[]>();
    });
    it('should create a new instance', () => {
        const inst = new StateArray<number[]>();
        expect(inst).toBeTruthy();
    });
    it('should create a new instance with options', () => {
        const inst = new StateArray<number[]>({
            initialValue: [0],
            debug: true,
        });
        expect(inst).toBeTruthy();
        expect(inst.hasDebug).toBe(true);
        expect(inst.stateSync).toStrictEqual([0]);
    });
    it('should update state', () => {
        expect(instance.stateSync).toBeNull();
        instance.setState([0, 1]);
        expect(instance.stateSync).toStrictEqual([0, 1]);
    });
});
