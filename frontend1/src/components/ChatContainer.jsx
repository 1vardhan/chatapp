import React from 'react'
import {useChatStore} from "../store/useChatStore";
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useEffect } from 'react';
import MessageSkeleton from './skeletons/MessageSkeleton';

const ChatContainer = () => {
  const {messages,getMessages,isMessagesLoading,selectedUser}=useChatStore();

  useEffect(()=>{
    getMessages(selectedUser._id)
  },[selectedUser._id,getMessages])


  if(isMessagesLoading){
    return (
      <div className='flex-1 flexflex-col overflow-auto'>
        <ChatHeader/>
        <MessageSkeleton/>
        <MessageInput/>
      </div>
    )
  }

  return (
    <div>
        <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader/>
        <p>messages</p>
        <MessageInput/> 
      </div>
      
    </div>
  )
}

export default ChatContainer
