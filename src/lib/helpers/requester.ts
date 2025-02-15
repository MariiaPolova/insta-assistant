
type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function requester (method: Method, url: string, body?: any) {
  try {
    const res = await fetch(url, { method, body });
    return res.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

export default requester;