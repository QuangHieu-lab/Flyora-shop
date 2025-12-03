import axios from "axios";

const CHATBOT_API_URL =
  "https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/chatbot";

/**
 * Gửi câu hỏi đến chatbot (Lambda chỉ nhận trường `question`)
 * @param {string} question - Nội dung câu hỏi
 * @returns {Promise} Phản hồi từ chatbot
 */
export const sendChatbotQuestion = async (question) => {
  try {
    const payload = { question };

    const response = await axios.post(CHATBOT_API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 20000,
      withCredentials: false,
    });

    return response.data;
  } catch (error) {
    // Ghi log chi tiết để dễ debug
    if (error.response) {
      console.error(
        "Chatbot API error - Response:",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error(
        "Chatbot API error - No response (CORS/Network):",
        error.message
      );
    } else {
      console.error("Chatbot API error - Setup:", error.message);
    }
    throw error;
  }
};





