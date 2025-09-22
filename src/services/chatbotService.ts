// Use environment variable with Vite's import.meta.env or fallback to localhost
const CHATBOT_API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:5000';

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
      console.log('Sending request to:', `${CHATBOT_API_URL}/get_response`);
      console.log('Message:', message);
      
      const response = await fetch(`${CHATBOT_API_URL}/get_response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.error) {
        throw new Error(data.error);
      }

      return data.response || "I didn't receive a proper response from the server.";
    } catch (error) {
      console.error('Error sending message to chatbot:', error);
      
      // Fallback response for when the backend is not available
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return "I'm currently offline. The chatbot backend may be starting up, please try again in a moment.";
      }
      
      if (error instanceof Error) {
        return `Sorry, I encountered an error: ${error.message}`;
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