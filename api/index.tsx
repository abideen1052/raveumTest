// apiManager.js

const BASE_URL = "https://apis.raveum.com/v1";

export const apiManager = async (
  endpoint: string,
  method = "GET",
  body = null,
  headers = {}
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const config = {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      };

      if (body) config.body = JSON.stringify(body);

      const response = await fetch(`${BASE_URL}${endpoint}`, config);

      // Handle non-200 responses
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return reject({
          status: response.status,
          message: errorData?.message || "Something went wrong",
          error: errorData,
        });
      }

      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject({
        message: error.message || "Network error",
        error,
      });
    }
  });
};
