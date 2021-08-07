const axios = require("axios").default;

export default async function fetcher(...args: any[]) {
  const res = await axios(...args);

  return res.data;
}
