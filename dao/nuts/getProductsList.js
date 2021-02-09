import { get } from 'axios';

import { config } from './config';

const { apiHost, accessToken } = config;

export async function getProductsList(offset = 0, limit = 10) {
  const url = `${apiHost}/nuts-custom-demo-1/products`;
  const list = await get(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    params: {
      offset,
      limit,
    }
  });

  return list.data;
} 
