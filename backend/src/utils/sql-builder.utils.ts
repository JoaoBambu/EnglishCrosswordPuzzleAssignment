export function addQueryParam(fiels:string[], values:unknown[], field:string, value:unknown) {
  fiels.push(field);
  values.push(value);
}

export function addQueryParamIfPresent(fiels:string[], values:unknown[], field:string, value:unknown) {
  if (value !== undefined) {
    fiels.push(field);
    values.push(value);
  }
}