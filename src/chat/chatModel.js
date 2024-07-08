export class Message {
    constructor(role, content) {
      this.role = role;
      this.content = content;
    }
  }
  
  export class ChatModel {
    constructor() {
      this.messages = [];
    }
  
    addMessage(message) {
      this.messages.push(message);
    }
  
    getMessages() {
      return this.messages;
    }
  }