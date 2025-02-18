import { Message } from '../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`message ${message.role === 'user' ? 'user' : 'assistant'}`}>
      <p>{message.content}</p>
    </div>
  );
};
