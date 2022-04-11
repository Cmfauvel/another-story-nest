import { Injectable } from '@nestjs/common';

@Injectable()
export class FiltersService {
  parseQueryParams = (params?: { filters?: string }) => {
    console.log(params);
    let newParams: { filters?: any } = { filters: {} };
    if (params.filters) {
      newParams = { filters: JSON.parse(params.filters) };
      console.log(newParams);
    }
    return newParams;
  };
}
