// ViewModel.js
import { ChatModel, Message } from '../models/chatModel'; 
import axios from 'axios';
import { API_BASE_URL } from '../../config/app-config';

export class ChatViewModel {
  constructor() {
    this.model = new ChatModel();
    this.onMessagesChanged = null;
  }

  async sendMessage(content) {
    const userMessage = new Message('user', content);
    this.model.addMessage(userMessage);
    this.notifyMessagesChanged();

    try {
      const response = await axios.post(`${API_BASE_URL}/api/prompt`, {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are 2ny shoppingmall admin, and you are korean" },
          ...this.model.getMessages().map(m => ({ role: m.role, content: m.content }))
        ]
      });

      const botResponse = new Message('assistant', response.data.choices[0].message.content);
      this.model.addMessage(botResponse);
      this.notifyMessagesChanged();
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., add an error message to the chat)
    }
  }

  getMessages() {
    return this.model.getMessages();
  }

  setOnMessagesChanged(callback) {
    this.onMessagesChanged = callback;
  }

  notifyMessagesChanged() {
    if (this.onMessagesChanged) {
      this.onMessagesChanged(this.getMessages());
    }
  }
}
