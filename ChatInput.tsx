import React, { useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center p-4 border-t bg-white">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 p-2 border border-gray-300 rounded-lg"
        placeholder="Écrivez un message..."
        disabled={disabled}
      />
      <button
        type="submit"
        className="ml-2 p-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
        disabled={disabled || !input.trim()}
      >
        Envoyer
      </button>
    </form>
  );
};

export default ChatInput;
