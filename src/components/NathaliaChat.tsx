
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { toast } from "@/components/ui/use-toast";

interface NathaliaChatProps {
  term: string;
  combinedContent: string;
}

interface ChatMessage {
  sender: 'user' | 'nathalia';
  content: string;
  timestamp: Date;
}

const NathaliaChat = ({ term, combinedContent }: NathaliaChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Generate Nathalia's initial thought when term or combinedContent changes
  useEffect(() => {
    if (term && combinedContent) {
      setIsTyping(true);
      setTimeout(() => {
        const initialThought = generateInitialThought(term, combinedContent);
        setMessages([{
          sender: 'nathalia',
          content: initialThought,
          timestamp: new Date()
        }]);
        setIsTyping(false);
      }, 1500);
    }
  }, [term, combinedContent]);

  const generateInitialThought = (term: string, content: string) => {
    // If no term is provided, return a default message
    if (!term) return "Ich bin Nathalia, die Wissenschafts-Elfe. Wähle einen Begriff und ich teile meine Gedanken zur interdisziplinären Verbindung mit dir.";

    const thoughts = [
      `Die Verbindung zwischen den Perspektiven zu "${term}" zeigt eine interessante Synergie zwischen Verstand und Intuition. Die Quintessenz liegt in der Überbrückung scheinbar getrennter Wissensgebiete.`,
      `"${term}" ist ein faszinierendes Konzept, das zeigt, wie eng Wissenschaft und Kreativität miteinander verwoben sind. Die interdisziplinäre Betrachtung eröffnet völlig neue Erkenntnishorizonte.`,
      `Bei der Betrachtung von "${term}" aus verschiedenen Perspektiven erkenne ich Muster, die auf tiefere Verbindungen zwischen Philosophie und Technologie hinweisen. Diese Resonanzeffekte sind bemerkenswert.`,
      `Die Quintessenz aus den verschiedenen Perspektiven zu "${term}" erinnert mich an die Theorie der Emergenz - aus dem Zusammenspiel entstehen neue, unerwartete Eigenschaften.`,
      `Es ist faszinierend zu sehen, wie sich die verschiedenen Betrachtungsweisen von "${term}" gegenseitig bereichern. Die Wissenschaft profitiert von künstlerischer Intuition und umgekehrt.`
    ];
    
    return thoughts[Math.floor(Math.random() * thoughts.length)];
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      sender: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Nathalia's response
    setTimeout(() => {
      const nathaliaResponse: ChatMessage = {
        sender: 'nathalia',
        content: generateResponse(inputValue, term),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, nathaliaResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (userMessage: string, term: string) => {
    const responses = [
      `Das ist eine interessante Beobachtung zum Begriff "${term}". Die Verbindung zwischen den verschiedenen Bereichen eröffnet tatsächlich neue Perspektiven, die in isolierten Fachdisziplinen oft übersehen werden.`,
      `Deine Gedanken zu "${term}" ergänzen wunderbar das interdisziplinäre Bild. Nobelpreisträger zeigen oft genau diese Fähigkeit, über Fachgrenzen hinweg zu denken und Verbindungen herzustellen.`,
      `Zum Thema "${term}" möchte ich hinzufügen, dass die Resonanz zwischen verschiedenen Wissensgebieten oft zur Entstehung völlig neuer Ideen führt. Das ist ein Phänomen, das wir in der Wissenschaftsgeschichte immer wieder beobachten können.`,
      `Dein Beitrag zu "${term}" zeigt, wie fruchtbar der Dialog zwischen verschiedenen Denkweisen sein kann. Es erinnert mich an die Kreativitätsforschung, die betont, wie wichtig ungewöhnliche Verbindungen für innovative Durchbrüche sind.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <img 
              src="/lovable-uploads/16df3060-8419-4abf-96d7-49bdb07b8c2a.png" 
              alt="Nathalia" 
              className="h-full w-full object-cover"
            />
          </Avatar>
          <div>
            <CardTitle className="text-md">Nathalia</CardTitle>
            <CardDescription>Die Wissenschafts-Elfe</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto px-4 py-2 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg px-3 py-2 ${
                message.sender === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70">
                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-3 py-2 bg-muted">
              <div className="flex space-x-1">
                <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t p-2">
        <div className="flex w-full items-center space-x-2">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Deine Gedanken..."
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button 
            size="icon"
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NathaliaChat;
