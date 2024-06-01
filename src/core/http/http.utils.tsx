import { createSearchParams } from 'react-router-dom';

export function preparedHttpParamsValue(value: any): string {
  if (value instanceof String) {
    return value.toString();
  }
  if (Array.isArray(value)) {
    return value.join('&');
  }

  return value.toString();
}

export function toHttpParams(data: any): URLSearchParams {
  if (!data) {
    return new URLSearchParams();
  }

  return createSearchParams(data);
}
