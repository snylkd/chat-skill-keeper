import { useState } from 'react';
import { ChatInput } from '../components/ChatInput';
import { ChatMessage } from '../components/ChatMessage';
import { ConversationList } from '../components/ConversationList';
import { Conversation, Message } from '../types/chat';

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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-center mb-6">Assistant IA</h1>

        <div className="rounded-lg border shadow-lg bg-white overflow-hidden">
          <div className="flex h-[600px]">
            <aside className="w-80 border-r">
              <ConversationList
                conversations={conversations}
                activeConversationId={activeConversationId}
                onSelect={setActiveConversationId}
                onNew={handleNewConversation}
              />
            </aside>
            <main className="flex flex-1 flex-col">
              {activeConversation ? (
                <>
                  <div className="flex-1 p-4 overflow-auto">
                    <div className="flex flex-col gap-4">
                      {activeConversation.messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                      ))}
                    </div>
                  </div>
                  <ChatInput onSend={handleSendMessage} />
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center">
                  <p className="text-center text-muted">Commencez une nouvelle conversation</p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
