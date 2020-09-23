export class PromiseUtils {
    public static wait(ms: number): Promise<void> {
        return new Promise<void>(resolve => setTimeout(() => resolve(), ms));
    }
}