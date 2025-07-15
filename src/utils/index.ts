import { Request, Response, NextFunction } from 'express';

export const withNextBlock =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (callback: (request: Request, response: Response, next: NextFunction) => any) =>
    (request: Request, response: Response, next: NextFunction) => {
      try {
        return callback(request, response, next);
      } catch (error) {
        next(error);
      }
    };

// Usage example:
// userRouter.get('/', withNextBlock(getUser));
