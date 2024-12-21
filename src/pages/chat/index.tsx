import { Message } from "@/components/message";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useMessages } from "@/hooks/useMessages";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";

export const Chat = () => {
  const { user } = useAuth()
  const { messages, addMessage } = useMessages()
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = async () => {

    addMessage(newMessage)
      .then(() => {
        setNewMessage('');
      })
  };

  return (
    <div className="flex flex-col h-full">
      <head className="h-16 flex justify-end items-center gap-4 mb-4 px-4">
        <span className="text-zinc-100">{user?.displayName}</span>

        <Avatar className="size-12">
          <AvatarImage src={user?.photoURL || ''} alt="Avatar" />
          <AvatarFallback>A</AvatarFallback>
        </Avatar>
      </head>

      <div className="flex flex-col justify-center items-center h-[calc(100%-64px)] gap-3">
        <div className="h-[700px] w-2/4 overflow-y-auto px-7 no-scrollbar">
          {messages.map((message, index) => {
            return (
              <Message
                key={index}
                avatar={user?.photoURL || ''}
                timeStamp={message.timeStamp}
                userID={message.userID}
                content={message.content}
                isSender={message.userID === user?.uid}
                user={user?.displayName || ''}
              />
            )
          })}
        </div>

        <div className="flex w-full items-center h-[40px] px-7 mb-2 gap-3">
          <Input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />

          <Button
            className=" px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleSendMessage}
          >
            <SendHorizontal className="text-zinc-200" size={40} />
          </Button>
        </div>
      </div>
    </div>
  )
}