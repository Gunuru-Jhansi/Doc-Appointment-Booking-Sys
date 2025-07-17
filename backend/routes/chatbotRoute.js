import express from "express";
import { chatbotQuery  } from "../controllers/chatbotController.js";
import authUser from "../middlewares/authUser.js";

const chatbotRouter = express.Router();

chatbotRouter.post("/query", authUser, chatbotQuery);
// chatbotRouter.post("/chatbot/clear-session", clearChatbotSession);


export default chatbotRouter;
