import requester from "../helpers/requester";

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_API_URL;


const PostAPI = {
  addToList: async (postId, listId) => {
    try {
      const response = await requester('PUT',
        `${SERVER_BASE_URL}/api/add/${postId}/toList/${listId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  },
  removeFromList: async (postId, listId) => {
    try {
      const response = await requester('PUT',
        `${SERVER_BASE_URL}/api/remove/${postId}/fromList/${listId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  },
  deletePost: async (postId) => {
    try {
      const response = await requester('DELETE',
        `${SERVER_BASE_URL}/api/posts/${postId}`);
      return response;
    } catch (error) {
      return error.response;
    }
  },
  getDetailed: async (username) => await requester('GET', `${SERVER_BASE_URL}/profiles/${username}`),
};

export default PostAPI;