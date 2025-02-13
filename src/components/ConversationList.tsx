
import { Conversation } from '@/types/chat';
import { Button } from '@/components/ui/button';
import { MessageSquare, Plus } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
}

export const ConversationList = ({
  conversations,
  activeConversationId,
  onSelect,
  onNew,
}: ConversationListProps) => {
  return (
    <div className="flex h-full w-full flex-col gap-2 p-4">
      <Button onClick={onNew} className="w-full justify-start gap-2">
        <Plus className="h-4 w-4" />
        Nouvelle conversation
      </Button>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 pr-4">
          {conversations.map((conversation) => (
            <Button
              key={conversation.id}
              variant={activeConversationId === conversation.id ? "secondary" : "ghost"}
              className="w-full justify-start gap-2 text-left"
              onClick={() => onSelect(conversation.id)}
            >
              <MessageSquare className="h-4 w-4" />
              <span className="truncate">{conversation.title}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
