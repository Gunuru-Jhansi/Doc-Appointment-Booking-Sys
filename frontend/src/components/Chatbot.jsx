import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MdOutlineAutoDelete } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { BsRobot } from "react-icons/bs";
import { ImCross } from "react-icons/im";

let messageId = 1;
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: messageId++, from: "bot", text: "Hi! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages((prev) => [
      ...prev,
      { id: messageId++, from: "user", text: input, deleting: false },
    ]);
    setInput("");
    setIsTyping(true);

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) {
      setMessages((prev) => [
        ...prev,
        {
          id: messageId++,
          from: "bot",
          text: "Please log in to use the chatbot.",
          deleting: false,
        },
      ]);
      setIsTyping(false);
      return;
    }

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const res = await axios.post(
        `${BACKEND_URL}/api/chatbot/query`,
        { userId, message: input },
        { headers: { token } }
      );

      // Handle doctor list replies
      if (res.data.replyType === "doctorList") {
        setMessages((prev) => [
          ...prev,
          {
            id: messageId++,
            from: "bot",
            type: "doctorList",
            data: res.data.data,
            deleting: false,
          },
        ]);
      }
      // Handle normal text reply
      else if (res.data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            id: messageId++,
            from: "bot",
            text: res.data.reply,
            deleting: false,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: messageId++,
            from: "bot",
            text: "Sorry, I didn't understand that.",
            deleting: false,
          },
        ]);
      }
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: messageId++,
          from: "bot",
          text: "Sorry, there was an error contacting the chatbot.",
          deleting: false,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = async () => {
    setMessages([
      { id: messageId++, from: "bot", text: "Hi! How can I help you today?" },
    ]);

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    if (!userId || !token) return;

    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      await axios.post(
        `${BACKEND_URL}/api/chatbot/clear-session`,
        { userId },
        { headers: { token } }
      );
    } catch (error) {
      console.error("Error clearing chatbot session:", error);
    }
  };

  const handleDelete = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, deleting: true } : msg))
    );
    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, 300);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className="fixed right-4 bottom-24 px-4 py-4 rounded-lg text-2xl bg-gray-300 dark:bg-gray-700 text-sm text-black dark:text-white shadow-lg transition-all duration-300 hover:scale-110 border-none cursor-pointer z-50"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <ImCross size={20} /> : <BsRobot size={25} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed pt-0 bg-white dark:bg-gray-800 shadow-lg rounded-lg flex flex-col z-50 transition-all duration-300
    ${isExpanded ? "inset-0 m-5" : "right-5 bottom-40 w-96 h-[500px]"}`}
        >
          <div className="flex items-center justify-between px-3 py-3 border-b border-gray-300 dark:border-gray-600 bg-primary/90 dark:bg-secondary/90 rounded-t-lg">
            <div className="flex items-center gap-2 text-white font-semibold text-lg">
              <BsRobot className="text-2xl" /> Chatbot
            </div>
            <button
              onClick={handleClearChat}
              className="text-white hover:text-red-300 transition ml-3 text-xl"
              title="Clear all messages"
            >
              <MdOutlineAutoDelete />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-white hover:text-blue-300 transition text-xl ml-2"
              title={isExpanded ? "Shrink chat" : "Expand chat"}
            >
              {isExpanded ? "🗕" : "🗖"}
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="group relative max-w-full">
                  {msg.from === "bot" && msg.type === "doctorList" && (
                    <div className="grid gap-3">
                      {msg.data.map((doc) => (
                        <div
                          key={doc._id}
                          className="flex gap-3 items-start p-3 rounded-lg bg-gray-100 dark:bg-gray-200 text-black shadow-md"
                        >
                          <img
                            src={doc.image}
                            alt={doc.name}
                            className="w-12 h-12 rounded-full object-cover border"
                          />
                          <div className="flex flex-col text-left text-sm">
                            <strong className="text-base">{doc.name}</strong>
                            <span className="text-primary">
                              {doc.speciality}
                            </span>
                            <span>
                              {doc.degree}, {doc.experience} exp.
                            </span>
                            <span className="font-semibold text-green-600">
                              ₹{doc.fees}
                            </span>
                            <p className="text-xs mt-1 text-gray-600">
                              {doc.about}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.from === "bot" && !msg.type && (
                    <span
                      className={`inline-block px-3 py-2 rounded-2xl bg-gray-300 dark:bg-gray-200 text-black break-words max-w-[280px] transition-opacity duration-300 ${
                        msg.deleting ? "opacity-0" : "opacity-100"
                      }`}
                      dangerouslySetInnerHTML={{ __html: msg.text }}
                    />
                  )}

                  {msg.from === "user" && (
                    <div className="group relative flex items-center justify-end">
                      <span
                        className={`inline-block px-3 py-2 rounded-2xl bg-primary dark:bg-secondary text-white break-words max-w-[280px] transition-all duration-300 transform ${
                          msg.deleting ? "opacity-0" : "opacity-100"
                        } group-hover:-translate-x-6`}
                      >
                        {msg.text}
                      </span>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:text-white text-red-500 hover:text-red-700"
                        title="Delete message"
                      >
                        <RxCrossCircled size={20} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2">
                <div className="inline-block px-4 py-2 rounded-2xl bg-gray-300 dark:bg-gray-200 text-black animate-pulse">
                  ...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-300 p-2 flex gap-2">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 resize-none rounded-2xl dark:bg-black dark:text-white border border-gray-300 px-3 py-2 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="bg-primary dark:bg-secondary rounded-full w-9 h-9 text-white text-lg flex items-center justify-center cursor-pointer"
              aria-label="Send message"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
