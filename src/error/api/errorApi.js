import axios from 'axios';

export const testError = async (code) => {
  try {
    await axios.get(`/test${code}`);
  } catch (error) {
    if (error.response) {
      return {
        statusCode: error.response.status,
        message: error.response.data
      };
    }
    return {
      statusCode: 500,
      message: "서버와 통신할 수 없습니다."
    };
  }
};