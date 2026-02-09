
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getProductRecommendation(query: string, availableProducts: Product[]) {
    const productsString = JSON.stringify(availableProducts.map(p => ({ id: p.id, name: p.name, description: p.description, price: p.price })));
    
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert shopping assistant for GenCart. 
      Based on the user's query: "${query}", suggest the best 1-2 products from this list: ${productsString}.
      Explain why they are a good fit. Use a friendly, professional tone.`,
      config: {
        temperature: 0.7,
      }
    });

    return response.text;
  }

  async generateProductDeepDive(product: Product) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a detailed and persuasive sales pitch for this product: ${JSON.stringify(product)}. 
      Highlight its technical specifications, lifestyle benefits, and why it's a better choice than competitors.
      Use bullet points for features.`,
    });
    return response.text;
  }
  
  async chatWithAssistant(history: { role: 'user' | 'model', parts: { text: string }[] }[], message: string) {
    const chat = this.ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are the GenCart AI Assistant. Help users find products, answer questions about shopping, and provide helpful advice. Be concise and use emojis where appropriate."
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  }
}

export const geminiService = new GeminiService();
