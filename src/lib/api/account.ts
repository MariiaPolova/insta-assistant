import requester from "../helpers/requester";

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


const AccountAPI = {
  create: async (username) => {
    try {
      const response = await requester('POST',
        `${SERVER_BASE_URL}/api/accounts`, { username });
      return response;
    } catch (error) {
      return error.response;
    }
  },
  populate: async (username) => {
    try {
      const response = await requester('POST',
        `${SERVER_BASE_URL}/api/populate/${username}/posts`);
      return response;
    } catch (error) {
      return error.response;
    }
  }
  ,
};

export default AccountAPI;