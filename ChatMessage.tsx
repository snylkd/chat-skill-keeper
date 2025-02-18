interface MessageProps {
  message: {
    id: string;
    content: string;
    sender: 'user' | 'assistant';
  };
}

const ChatMessage: React.FC<MessageProps> = ({ message }) => {
  return (
    <div
      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`p-3 max-w-xs rounded-lg ${
          message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;
