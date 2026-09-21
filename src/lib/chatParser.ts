export interface ParsedMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ParsedConversation {
  id: string;
  title: string;
  messages: ParsedMessage[];
  createdAt: Date;
  messageCount: number;
}

const ASSISTANT_INDICATORS = [
  /^here['']s/i,
  /^let me/i,
  /^you can/i,
  /^i can/i,
  /^this will/i,
  /^create/i,
  /^paste/i,
  /^run/i,
  /^the (following|code|solution)/i,
  /^```/,
  /^export/,
  /^import/,
  /^function/,
  /^const /,
  /^(push|git|npm|bash|docker):/i,
];

const USER_INDICATORS = [
  /^(you|how|can|why|what|where|when|who|help|make|create|build|fix).*\?$/i,
  /^(i have|i need|i want|i'm|im|we|can you|could you|please)/i,
  /^error:|^warning:|^failed to/i,
];

function guessSpeaker(text: string): 'user' | 'assistant' {
  const firstLine = text.split('\n')[0].toLowerCase();
  
  // Check for explicit labels
  if (firstLine.startsWith('you:')) return 'user';
  if (firstLine.startsWith('user:')) return 'user';
  if (firstLine.startsWith('claude:')) return 'assistant';
  if (firstLine.startsWith('assistant:')) return 'assistant';

  // Score based on indicators
  let assistantScore = 0;
  let userScore = 0;

  ASSISTANT_INDICATORS.forEach(pattern => {
    if (pattern.test(firstLine)) assistantScore += 2;
  });

  USER_INDICATORS.forEach(pattern => {
    if (pattern.test(firstLine)) userScore += 2;
  });

  // Check for code blocks (strong assistant signal)
  if (text.includes('```')) assistantScore += 3;

  // Check for technical depth (assistant)
  if (text.split('\n').length > 5) assistantScore += 1;

  // Default to assistant if longer, user if question
  if (text.trim().endsWith('?')) userScore += 1;
  if (text.length < 100) userScore += 1;

  return assistantScore > userScore ? 'assistant' : 'user';
}

export function parseRawChat(rawText: string): ParsedConversation {
  // Split by double newlines or other delimiters
  const blocks = rawText
    .split(/\n(?=\S)/) // Split on new line followed by non-whitespace
    .filter(block => block.trim().length > 20) // Ignore very short lines
    .map(block => block.trim());

  const messages: ParsedMessage[] = blocks.map((content, index) => ({
    id: `msg-${Date.now()}-${index}`,
    role: guessSpeaker(content),
    content: content
      .replace(/^(you|user|claude|assistant):\s*/i, '') // Remove labels
      .trim(),
    timestamp: new Date()
  }));

  // Filter out system messages and noise
  const cleanMessages = messages.filter(
    msg => 
      msg.content.length > 15 && 
      !msg.content.startsWith('#') &&
      !msg.content.match(/^[`~-]{3,}/)
  );

  const title = cleanMessages[0]?.content.substring(0, 50) || 'Imported Conversation';

  return {
    id: `conv-${Date.now()}`,
    title,
    messages: cleanMessages,
    createdAt: new Date(),
    messageCount: cleanMessages.length
  };
}