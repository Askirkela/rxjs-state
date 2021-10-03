import { State } from '../src/index';

describe('State', () => {
    let instance: State<{ a: number }>;
    beforeEach(() => {
        instance = new State<{ a: number }>();
    });
    it('should create a new instance', () => {
        const inst = new State<{ a: number }>();
        expect(inst).toBeTruthy();
    });
    it('should create a new instance with options', () => {
        const inst = new State<{ a: number }>({
            initialValue: { a: 0 },
            debug: true,
        });
        expect(inst).toBeTruthy();
        expect(inst.hasDebug).toBe(true);
        expect(inst.stateSync).toStrictEqual({ a: 0 });
    });
    it('should update state', () => {
        expect(instance.stateSync).toBeNull();
        instance.setState({ a: 1 });
        expect(instance.stateSync).toStrictEqual({ a: 1 });
    });
});
