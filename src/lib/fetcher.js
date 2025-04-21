import axios from 'axios'

export default async function fetcher(...args) {
    const res = await axios(...args);
  
    return res.data
  }