import { useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-form">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Écrivez votre message ici..."
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || !input.trim()}>
        Envoyer
      </button>
    </form>
  );
};
