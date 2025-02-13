
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SendHorizontal } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 border-t">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Écrivez votre message ici..."
        className="min-h-[60px] max-h-[200px] resize-none"
        disabled={disabled}
      />
      <Button 
        type="submit" 
        size="icon"
        disabled={disabled || !input.trim()}
        className="h-[60px] w-[60px]"
      >
        <SendHorizontal className="h-5 w-5" />
      </Button>
    </form>
  );
};
