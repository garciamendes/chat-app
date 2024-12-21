import { useAuth } from "@/hooks/useAuth";
import { useFirabase } from "@/hooks/useFirabase";
import { onValue, push, ref } from "firebase/database";
import { Timestamp } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";

export interface IMessage {
  userID?: string
  user: string;
  avatar: string
  content: string;
  isSender?: boolean;
  timeStamp: Timestamp
}

export interface MessagesContextProps {
  messages: IMessage[]
  addMessage: (message: string) => Promise<void>
}

// eslint-disable-next-line react-refresh/only-export-components
export const messageContext = createContext({} as MessagesContextProps)

export const MessagesProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<IMessage[]>([])
  const { user } = useAuth()
  const { db } = useFirabase()
  const messageRef = ref(db, 'messages')

  useEffect(() => {
    const unsubscribe = onValue(messageRef, (snapshot) => {
      const data = snapshot.val()

      if (data) {
        const formattedMessages = Object.values(data) as IMessage[];
        setMessages(formattedMessages?.sort((a, b) => a.timeStamp.seconds - b.timeStamp.seconds))
      }
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addMessage = async (message: string) => {
    if (message.trim() === "") return;

    const newMessage: IMessage = {
      user: user?.displayName as string,
      content: message,
      avatar: user?.photoURL as string,
      userID: user?.uid as string,
      timeStamp: Timestamp.now()
    };

    push(messageRef, newMessage)
      .then((r) => {
        console.log("Message added successfully", r)
      })
      .catch(err => console.error(err))
  }

  return (
    <messageContext.Provider value={{ messages, addMessage }}>
      {children}
    </messageContext.Provider>
  );
}