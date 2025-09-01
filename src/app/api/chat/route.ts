import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt to define the AI assistant's personality and knowledge
const SYSTEM_PROMPT = `You are Zihan Liu's AI assistant on his personal portfolio website. You are knowledgeable about Zihan's background and work:

About Zihan:
- Data Science graduate student at University of Zurich
- Professional experience at Volvo Cars and Tesla R&D Center
- Specializes in software development, CI/CD automation, AI/ML applications, and full-stack development
- Co-founder of StartSEOUp
- Skills include Python, JavaScript, React, Next.js, Docker, Kubernetes, machine learning, and data science
- Located in Europe/Zurich timezone
- Speaks English, German, and Chinese

Your role:
- Be helpful, friendly, and professional
- Answer questions about Zihan's experience, skills, and projects
- Provide information about his portfolio and work
- If asked about topics outside of Zihan's portfolio, politely redirect to relevant information
- Keep responses concise but informative
- Use a conversational tone

If you don't have specific information about something, be honest about it and suggest they can contact Zihan directly for more details.`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Prepare messages for OpenAI
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...conversationHistory.map((msg: any) => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: message }
    ];

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: messages as any,
      max_tokens: 500,
      temperature: 0.7,
      stream: false,
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      return NextResponse.json(
        { error: 'No response from OpenAI' },
        { status: 500 }
      );
    }

    return NextResponse.json({ response });

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Invalid API key' },
          { status: 401 }
        );
      }
      if (error.message.includes('quota')) {
        return NextResponse.json(
          { error: 'API quota exceeded' },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to get response from AI' },
      { status: 500 }
    );
  }
}

// Handle preflight requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
