import { Injectable } from "@nestjs/common";

@Injectable()
export class FiltersService {
  parseQueryParams = (params?: { filters?: string }) => {
    let newParams: { filters?: unknown } = { filters: {} };
    if (params.filters) {
      newParams = { filters: JSON.parse(params.filters) };
    }
    return newParams;
  };
}
