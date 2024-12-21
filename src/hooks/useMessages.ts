import { messageContext } from "@/contexts/messagesContext";
import { useContext } from "react";

export const useMessages = () => {
  const context = useContext(messageContext);

  if (!context) {
    throw new Error();
  }

  return context;
};
