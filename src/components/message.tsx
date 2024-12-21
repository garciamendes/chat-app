// src/components/Message.tsx
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { IMessage } from '@/contexts/messagesContext';

export const Message = ({ user, content, avatar, isSender }: IMessage) => {
  return (
    <div
      className={cn(
        'flex mb-4',
        isSender ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={cn(
          'max-w-xs px-4 py-2 rounded-lg shadow-md',
          isSender
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800'
        )}
      >
        {!isSender && (
          <div className='flex items-center gap-4 mb-3'>
            <Avatar>
              <AvatarImage src={avatar || ''} alt='avatar' />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>

            <p className="text-sm font-medium">{user}</p>
          </div>
        )}

        <p>{content}</p>
      </div>
    </div>
  );
};