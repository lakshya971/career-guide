const CHATBOT_API_URL = 'http://localhost:5000';

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export class ChatbotService {
  private static instance: ChatbotService;

  private constructor() {}

  public static getInstance(): ChatbotService {
    if (!ChatbotService.instance) {
      ChatbotService.instance = new ChatbotService();
    }
    return ChatbotService.instance;
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response = await fetch(`${CHATBOT_API_URL}/get_response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      return data.response;
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      
      // Fallback response for when the backend is not available
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return "I'm currently offline. Please make sure the chatbot server is running on port 5000.";
      }
      
      return "Sorry, I'm having trouble processing your request right now. Please try again.";
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${CHATBOT_API_URL}/health`);
      return response.ok;
    } catch (error) {
      return false;
    }
  }
}

export const chatbotService = ChatbotService.getInstance();