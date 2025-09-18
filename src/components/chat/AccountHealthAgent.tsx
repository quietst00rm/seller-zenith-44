import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { FiSend, FiMessageCircle, FiUser, FiCpu, FiLoader, FiTrendingUp, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AccountHealthAgentProps {
  className?: string;
}

export function AccountHealthAgent({ className }: AccountHealthAgentProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Send welcome message when component mounts
    const welcomeMessage: Message = {
      id: 'welcome',
      role: 'assistant',
      content: `Hello! I'm your Account Health Agent. I have access to your complete account data and can help you with:

• **Account Performance Analysis** - Review your current health metrics and trends
• **Issue Resolution** - Get guidance on active cases and how to resolve them
• **Risk Assessment** - Identify potential threats to your account standing
• **Policy Guidance** - Understand Amazon policies and compliance requirements
• **Strategic Recommendations** - Actionable advice to improve your account health

Your current account health score is **978/1000** (Healthy status). You have **4 active cases** that need attention.

What would you like to know about your account today?`,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  const quickQuestions = [
    "What's my biggest risk right now?",
    "How can I improve my ODR?",
    "Show me my urgent cases",
    "What should I prioritize today?",
    "Help me understand my health score",
    "Analyze my recent performance"
  ];

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputValue.trim();
    if (!content || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // Get conversation history (last 10 messages for context)
      const conversationHistory = messages.slice(-10).map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const { data, error } = await supabase.functions.invoke('account-health-agent', {
        body: {
          message: content,
          conversationHistory
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again in a moment.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/•/g, '●')
      .split('\n')
      .map((line, index) => (
        <p key={index} className={line.trim() === '' ? 'h-2' : 'mb-2 last:mb-0'} 
           dangerouslySetInnerHTML={{ __html: line || '&nbsp;' }} />
      ));
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      <Card className="flex-1 flex flex-col border-border/50 shadow-card">
        <CardHeader className="border-b border-border/50 bg-gradient-to-r from-primary/5 to-primary-glow/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg text-primary-foreground">
              <FiMessageCircle className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Account Health Agent</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                AI-powered insights and recommendations for your Amazon account
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Badge variant="outline" className="bg-success-light text-success border-success/20">
                <FiCheckCircle className="h-3 w-3 mr-1" />
                Online
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="p-4 border-b border-border/50 bg-muted/30">
              <h4 className="font-medium text-sm text-muted-foreground mb-3 uppercase tracking-wide">
                Quick Start Questions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="justify-start text-left h-auto p-3 text-wrap bg-background hover:bg-primary/5 border border-border/50"
                    onClick={() => handleSendMessage(question)}
                    disabled={isLoading}
                  >
                    <FiTrendingUp className="h-3 w-3 mr-2 flex-shrink-0 text-primary" />
                    <span className="text-xs">{question}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 max-w-[85%]",
                  message.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                  message.role === 'user' 
                    ? "bg-gradient-primary text-primary-foreground" 
                    : "bg-gradient-secondary text-secondary-foreground"
                )}>
                  {message.role === 'user' ? (
                    <FiUser className="h-4 w-4" />
                  ) : (
                    <FiCpu className="h-4 w-4" />
                  )}
                </div>
                
                <div className={cn(
                  "flex-1 rounded-xl px-4 py-3 shadow-sm",
                  message.role === 'user'
                    ? "bg-gradient-primary text-primary-foreground"
                    : "bg-background border border-border/50"
                )}>
                  <div className={cn(
                    "text-sm leading-relaxed",
                    message.role === 'user' ? "text-primary-foreground" : "text-foreground"
                  )}>
                    {formatMessageContent(message.content)}
                  </div>
                  <div className={cn(
                    "text-xs mt-2 opacity-70",
                    message.role === 'user' ? "text-primary-foreground" : "text-muted-foreground"
                  )}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-gradient-secondary text-secondary-foreground flex items-center justify-center flex-shrink-0">
                  <FiCpu className="h-4 w-4" />
                </div>
                <div className="flex-1 rounded-xl px-4 py-3 bg-background border border-border/50">
                  <div className="flex items-center gap-1">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">Agent is typing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <Separator />

          {/* Input */}
          <div className="p-4 bg-muted/30">
            <div className="flex gap-3">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your account health..."
                disabled={isLoading}
                className="flex-1 bg-background border-border/50 focus:border-primary"
              />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                className="bg-gradient-primary hover:opacity-90 px-4"
              >
                {isLoading ? (
                  <FiLoader className="h-4 w-4 animate-spin" />
                ) : (
                  <FiSend className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              This agent has access to your complete account data and provides real-time insights
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}