import { Conversation } from '../types/chat';

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
    <div>
      <button onClick={onNew}>Nouvelle Conversation</button>
      <ul>
        {conversations.map((conversation) => (
          <li
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
            className={conversation.id === activeConversationId ? 'active' : ''}
          >
            {conversation.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
