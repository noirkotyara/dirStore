declare namespace Express {
  export interface Response {
    locals: {
      user: {
        userId: string
      };
    };

  }

  export interface Request {
    headers: {
      "x-access-token": string;
    };
  }
}