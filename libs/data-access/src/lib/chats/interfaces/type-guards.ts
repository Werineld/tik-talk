import {
  ChatWSError,
  ChatWSMessage,
  ChatWSMessageBase,
  ChatWSNewMessage,
  ChatWSUnreadMessage
} from './chat-ws-message.interface';

export function isUnreadMessage(message: ChatWSMessage): message is ChatWSUnreadMessage {
  return 'action' in message && message.action === 'unread';
}

export function isNewMessage(message: ChatWSMessage): message is ChatWSNewMessage {
  return 'action' in message && message.action === 'message';
}

export function isErrorMessage(message: ChatWSMessage): message is ChatWSError {
  return (message as ChatWSMessageBase).status === 'error';
}

