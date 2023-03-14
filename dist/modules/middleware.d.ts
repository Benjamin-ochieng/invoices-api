export declare const validateInputs: (method: any) => (import("express-validator").ValidationChain | (import("express-validator/src/base").Middleware & {
    run: (req: import("express-validator/src/base").Request) => Promise<import("express-validator").Result<any>>;
}))[];
export declare const handleInputErrors: (req: any, res: any, next: any) => any;
