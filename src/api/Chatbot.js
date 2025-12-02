import axios from "axios";

const CHATBOT_API_URL = "https://4zhj8ihfhh.execute-api.ap-southeast-1.amazonaws.com/dev/chatbot";

/**
 * Gửi tin nhắn đến chatbot
 * @param {string} message - Nội dung tin nhắn
 * @param {Array} conversationHistory - Lịch sử cuộc trò chuyện (optional)
 * @returns {Promise} Phản hồi từ chatbot
 */
export const sendChatbotMessage = async (message, conversationHistory = []) => {
    try {
        const response = await axios.post(CHATBOT_API_URL, {
            message,
            conversationHistory,
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Chatbot API error:", error);
        throw error;
    }
};

