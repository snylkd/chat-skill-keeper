
import { useState } from 'react';
import { ChatInput } from '@/components/ChatInput';
import { ChatMessage } from '@/components/ChatMessage';
import { ConversationList } from '@/components/ConversationList';
import { Conversation, Message } from '@/types/chat';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Sparkles, Brain, Cpu } from 'lucide-react';

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
    <div className="min-h-screen bg-background p-4 md:p-8" 
         style={{ 
           backgroundImage: 'linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)',
           backgroundAttachment: 'fixed' 
         }}>
      <div className="mx-auto max-w-6xl">
        {/* En-tête animé */}
        <div className="mb-8 text-center animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            IA Assistant de Compétences
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez et analysez vos compétences grâce à notre IA spécialisée
          </p>
        </div>

        {/* Cartes de fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:transform hover:scale-105 transition-all duration-300">
            <Sparkles className="h-8 w-8 text-purple-500 mb-4" />
            <h3 className="font-semibold mb-2">Analyse Intelligente</h3>
            <p className="text-sm text-gray-600">Identification précise de vos compétences à travers vos conversations</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:transform hover:scale-105 transition-all duration-300">
            <Brain className="h-8 w-8 text-blue-500 mb-4" />
            <h3 className="font-semibold mb-2">Apprentissage Continu</h3>
            <p className="text-sm text-gray-600">L'IA s'améliore en continu pour des analyses plus pertinentes</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:transform hover:scale-105 transition-all duration-300">
            <Cpu className="h-8 w-8 text-green-500 mb-4" />
            <h3 className="font-semibold mb-2">Technologie Avancée</h3>
            <p className="text-sm text-gray-600">Algorithmes de pointe pour une évaluation précise</p>
          </div>
        </div>

        {/* Interface de chat */}
        <div className="rounded-lg border shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-xl">
          <div className="flex h-[600px]">
            <aside className="w-80 border-r bg-gray-50/50">
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
                  <ScrollArea className="flex-1 p-4">
                    <div className="flex flex-col gap-4">
                      {activeConversation.messages.map((message) => (
                        <ChatMessage key={message.id} message={message} />
                      ))}
                    </div>
                  </ScrollArea>
                  <ChatInput onSend={handleSendMessage} />
                </>
              ) : (
                <div className="flex flex-1 items-center justify-center p-8">
                  <div className="text-center max-w-md mx-auto">
                    <div className="mb-4 animate-bounce">
                      <Sparkles className="h-12 w-12 text-purple-500 mx-auto" />
                    </div>
                    <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                      Commencez votre voyage
                    </h2>
                    <p className="text-gray-600">
                      Lancez une nouvelle conversation pour découvrir vos compétences avec notre IA
                    </p>
                  </div>
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
