"use client";

import React, { useState, useRef, useEffect } from 'react';
import {
  Button,
  Column,
  Row,
  Text,
  Icon,
  Input,
  Card
} from '@once-ui-system/core';
import styles from './Chatbot.module.scss';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Remove the static responses array since we'll use OpenAI

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Zihan's AI assistant. Feel free to ask me anything about his work, experience, or this portfolio! 👋",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      // Call the OpenAI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          conversationHistory: messages.slice(-10) // Send last 10 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);

      // Fallback response in case of error
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later or contact Zihan directly at liu3675716@gmail.com.",
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.chatbotContainer}>
      {/* Chat Window */}
      {isOpen && (
        <Card className={styles.chatWindow} padding="0" radius="l">
          {/* Header */}
          <div
            className={styles.chatHeader}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              gap: '12px'
            }}
          >
            <Row gap="12" vertical="center">
              <div className={styles.avatar}>
                <img
                  src="/images/ai-assistant-avatar.jpg"
                  alt="AI Assistant"
                  className={styles.avatarImage}
                />
              </div>
              <Column gap="2">
                <Text variant="label-default-s" weight="strong">
                  AI Assistant
                </Text>
                <Text variant="body-default-xs" onBackground="neutral-weak">
                  Online
                </Text>
              </Column>
            </Row>
            <Button
              variant="tertiary"
              size="s"
              onClick={toggleChat}
              className={styles.closeButton}
            >
              <Icon name="close" size="s" />
            </Button>
          </div>

          {/* Messages */}
          <div className={styles.messagesContainer}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`${styles.messageWrapper} ${
                  message.isUser ? styles.userMessage : styles.botMessage
                }`}
              >
                <div className={styles.messageBubble}>
                  <Text variant="body-default-s">
                    {message.text}
                  </Text>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className={`${styles.messageWrapper} ${styles.botMessage}`}>
                <div className={styles.messageBubble}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <Row className={styles.inputContainer} padding="16" gap="8">
            <Input
              id="chatbot-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className={styles.messageInput}
            />
            <Button
              variant="primary"
              size="s"
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
            >
              <Icon name="send" size="s" />
            </Button>
          </Row>
        </Card>
      )}

      {/* Toggle Button */}
      <Button
        variant="primary"
        size="l"
        onClick={toggleChat}
        className={styles.toggleButton}
        data-tooltip={isOpen ? "Close chat" : "Chat with AI"}
      >
        {isOpen ? (
          <Icon name="close" size="l" />
        ) : (
          <Icon name="message" size="l" />
        )}
      </Button>
    </div>
  );
}
