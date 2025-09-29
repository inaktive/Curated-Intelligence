import { Injectable, signal } from '@angular/core';
import { GoogleGenAI } from '@google/genai';
import { ContentItem } from '../models/content-item.model';

@Injectable({ providedIn: 'root' })
export class GeminiService {
  private ai: GoogleGenAI | null = null;
  public error = signal<string | null>(null);

  constructor() {
    try {
      // In a real app, the API key must come from a secure backend.
      // We assume process.env.API_KEY is available in the execution environment.
      if (typeof process === 'undefined' || !process.env['API_KEY']) {
        const errorMessage = 'API key not found. Please set the API_KEY environment variable.';
        console.error(errorMessage);
        this.error.set(errorMessage);
        return;
      }
      this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    } catch (e) {
      console.error('Error initializing Gemini Service:', e);
      this.error.set('Failed to initialize the AI service. Please check your API key and configuration.');
    }
  }

  async generateCuratorNote(item: ContentItem): Promise<string> {
    if (!this.ai) {
      return this.error() || 'AI Service is not available.';
    }
    if(this.error()) {
        return this.error() as string;
    }


    const prompt = `You are an expert analyst for a premium intelligence service. Your audience consists of busy executives and researchers.
    Write a concise "Curator's Note" (3-4 sentences) for the following piece of content.
    Focus on the core insight, its significance, and why it's valuable to a discerning reader. Avoid fluff and generic summaries.

    Content Details:
    - Title: ${item.title}
    - Source: ${item.source}
    - Category: ${item.category}
    - Summary: ${item.summary}

    Generate the Curator's Note:`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text.trim();
    } catch (error) {
      console.error('Error generating curator note:', error);
      return 'Could not generate curator\'s note at this time. The AI service may be unavailable or experiencing issues.';
    }
  }
}
