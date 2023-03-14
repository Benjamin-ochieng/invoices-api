export declare const pipe: (...fns: any[]) => (x: any) => any;
export declare const trytm: <T>(promise: Promise<T>) => Promise<[T, null] | [null, Error]>;
export declare function tryToCatch(fn: any, ...args: any[]): Promise<any[]>;
