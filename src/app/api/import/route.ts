import { NextRequest, NextResponse } from 'next/server';
import { parseRawChat } from '@/lib/chatParser';

// In-memory storage
let conversations: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const { rawText } = await req.json();

    if (!rawText || rawText.trim().length === 0) {
      return NextResponse.json(
        { error: 'No text provided' },
        { status: 400 }
      );
    }

    const conversation = parseRawChat(rawText);
    conversations.push(conversation);

    return NextResponse.json({
      success: true,
      conversation,
      totalConversations: conversations.length
    });
  } catch (error) {
    console.error('Import error:', error);
    return NextResponse.json(
      { error: 'Failed to import conversation' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    conversations,
    total: conversations.length
  });
}