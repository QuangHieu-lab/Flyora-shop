import React, { useState, useEffect, useRef } from "react";
import { FaTimes, FaPaperPlane, FaComments } from "react-icons/fa";
import { sendChatbotQuestion } from "../../api/Chatbot";

const FALLBACK_MESSAGE = "Xin lỗi, tôi không thể xử lý yêu cầu này lúc này.";

const extractBotResponseText = (response) => {
  const tryFields = (obj) => {
    if (!obj || typeof obj !== "object") return null;
    const keys = ["answer", "message", "response", "reply", "text"];
    for (const key of keys) {
      const value = obj[key];
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }
    }
    return null;
  };

  // Nếu response là string
  if (typeof response === "string") {
    return response.trim() || FALLBACK_MESSAGE;
  }

  // Thử lấy trực tiếp từ response
  let text = tryFields(response);
  if (text) return text;

  // Nếu response có body (AWS Lambda thường trả về body là string JSON)
  if (response?.body) {
    if (typeof response.body === "string") {
      try {
        const parsedBody = JSON.parse(response.body);
        text = tryFields(parsedBody) || (typeof parsedBody === "string" ? parsedBody : null);
        if (text) return text;
      } catch (error) {
        console.warn("Không thể parse response.body:", error);
      }
    } else if (typeof response.body === "object") {
      text = tryFields(response.body);
      if (text) return text;
    }
  }

  // Thử parse nếu response.data tồn tại
  if (response?.data) {
    if (typeof response.data === "string") {
      try {
        const parsedData = JSON.parse(response.data);
        text = tryFields(parsedData) || (typeof parsedData === "string" ? parsedData : null);
        if (text) return text;
      } catch (error) {
        console.warn("Không thể parse response.data:", error);
      }
    } else if (typeof response.data === "object") {
      text = tryFields(response.data);
      if (text) return text;
    }
  }

  return FALLBACK_MESSAGE;
};

function ChatbotBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Xin chào! Flyora Team có thể giúp gì cho bạn?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const conversationHistoryRef = useRef([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    // Cập nhật lịch sử cuộc trò chuyện
    conversationHistoryRef.current = [
      ...conversationHistoryRef.current,
      { role: "user", content: inputMessage.trim() },
    ];

    try {
      const response = await sendChatbotQuestion(inputMessage.trim());
      const botResponseText = extractBotResponseText(response);

      const botMessage = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Cập nhật lịch sử với phản hồi của bot
      conversationHistoryRef.current = [
        ...conversationHistoryRef.current,
        { role: "assistant", content: botResponseText },
      ];
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden mb-4 w-[380px] h-[500px] flex flex-col border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaComments className="text-xl" />
              <div>
                <h3 className="font-semibold text-lg">FLYORA SHOP</h3>
                <p className="text-xs text-green-100">
                  Chúng tôi luôn sẵn sàng hỗ trợ bạn
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${message.sender === "user"
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-800 border border-gray-200"
                    }`}
                >
                  <p className="text-sm whitespace-pre-wrap">
                    {message.text}
                  </p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-white border-t border-gray-200"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Nhập tin nhắn của bạn..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputMessage.trim()}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <FaPaperPlane size={16} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className={`w-[70px] h-[70px] flex items-center justify-center rounded-full border-4 border-white bg-gradient-to-r from-green-500 to-green-600 shadow-2xl transition-transform duration-200 hover:scale-110 ${open ? "scale-90" : "scale-100"
            }`}
          aria-label="Mở chatbot"
        >
          <FaComments size={28} className="text-white" />
        </button>
      )}
    </div>
  );
}

export default ChatbotBox;
