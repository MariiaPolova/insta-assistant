const updateOptions = () => {
  if (typeof window === "undefined") return {};

  if (!window.localStorage.user) return {};

  if (Object.keys(window.localStorage.user).length === 0) return {};

  const user = JSON.parse(window.localStorage.user);

  if (!!user.token) {
    return {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    };
  }
};

async function fetcher (url) {
  try {
    const res = await fetch(url)
    return res.json();
  } catch (error) {
    throw new Error(error.message);
  }
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export { API_URL };

export default fetcher;