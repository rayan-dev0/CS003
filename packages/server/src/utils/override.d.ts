export {}

declare global {
    namespace Express {
        export interface Request {
            seller?: string
        }
    }
}