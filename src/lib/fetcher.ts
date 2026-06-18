import axios, { type AxiosRequestConfig } from "axios";

export default async function fetcher<T = unknown>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> {
  const res = await axios.get<T>(url, config);
  return res.data;
}
