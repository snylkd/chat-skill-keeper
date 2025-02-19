// Index.tsx

import { useState } from 'react';
import { ChatInput } from '@/components/ChatInput';
import { ChatMessage } from '@/components/ChatMessage';
import { ConversationList } from '@/components/ConversationList';
import { Conversation, Message } from '@/types/chat';

const Index = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'Nouvelle conversation',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setConversations([newConversation, ...conversations]);
    setActiveConversationId(newConversation.id);
  };

  const handleSendMessage = (content: string) => {
    if (!activeConversationId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversationId) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          updatedAt: new Date(),
        };
      }
      return conv;
    });

    setConversations(updatedConversations);

    // Simuler une réponse de l'IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Je suis en train d'analyser vos compétences basées sur notre conversation...",
        role: 'assistant',
        timestamp: new Date(),
      };

      setConversations(conversations => 
        conversations.map(conv => {
          if (conv.id === activeConversationId) {
            return {
              ...conv,
              messages: [...conv.messages, newMessage, aiResponse],
              updatedAt: new Date(),
            };
          }
          return conv;
        })
      );
    }, 1000);
  };

  return (
    <div className="chat-container">
      <div className="conversations-section">
        <button className="new-conversation-button" onClick={handleNewConversation}>
          Nouvelle Conversation
        </button>
        <div className="conversation-list">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`conversation-item ${activeConversationId === conversation.id ? 'active-conversation' : ''}`}
              onClick={() => setActiveConversationId(conversation.id)}
            >
              {conversation.title}
            </div>
          ))}
        </div>
      </div>
      <div className="messages-section">
        {activeConversation ? (
          <>
            <div className="messages">
              {activeConversation.messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
            </div>
            <ChatInput onSend={handleSendMessage} />
          </>
        ) : (
          <p>Commencez une nouvelle conversation</p>
        )}
      </div>
    </div>
  );
};

export default Index;
