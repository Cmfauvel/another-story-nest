import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class FiltersMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {

    /* const query = JSON.parse(req.query as string);
    console.log(query); */
    //req.query = { filters: JSON.parse(req.query.filters) }
    next();
  }
}
