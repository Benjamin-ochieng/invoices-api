export declare const comparePassword: (password: any, hash: any) => any;
export declare const hashPassword: (password: any) => any;
export declare const createJWT: (user: any) => any;
export declare const verifyToken: (token: any) => Promise<unknown>;
export declare const signup: (req: any, res: any, next: any) => Promise<void>;
export declare const signin: (req: any, res: any, next: any) => Promise<any>;
export declare const protect: (req: any, res: any, next: any) => Promise<any>;
export declare const resetPassword: (req: any, res: any, next: any) => Promise<void>;
