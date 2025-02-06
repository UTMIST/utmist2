import { Card } from "@ai2components/ui/card";
import { Session } from "next-auth";

export const TeamMembers = ({ members, onKick, isCaptain, session }: { 
  members: { displayName: string, email: string }[],
  onKick: (email: string) => void,
  isCaptain: boolean,
  session: Session | null
}) => {
  const slots = [...members, ...Array(4 - members.length).fill(null)];
  console.log("[AI2 TeamMembers] Team members:", slots);

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {slots.map((member, index) => (
        <div 
          key={index}
          className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center transition-colors duration-200 relative
            ${!member ? 'border-2 border-dashed border-gray-300 dark:border-gray-700' : ''}`}
        >
          {member && isCaptain && member.email !== session?.user?.email && (
            <button 
              onClick={() => onKick(member.email)}
              className="absolute top-1 right-1 text-red-500 hover:text-red-700"
              title="Kick member"
            >
              ×
            </button>
          )}
          <p className="text-sm font-medium dark:text-white">
            {member?.displayName || ''}
          </p>
        </div>
      ))}
    </div>
  );
};