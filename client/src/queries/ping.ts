import { baseFetch } from '@/libs/base-fetch';

const ping = async () => {
  const res = await baseFetch(`/ping`);
  return res.json();
};

export default ping;
