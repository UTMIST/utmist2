import { Card } from "@ai2components/ui/card";

export const TeamMembers = ({ members }: { members: string[] }) => {
  // Create an array of 4 slots, filling empty ones with null
  const slots = [...members, ...Array(4 - members.length).fill(null)];

  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {slots.map((member, index) => (
        <div 
          key={index}
          className={`bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm text-center transition-colors duration-200
            ${!member ? 'border-2 border-dashed border-gray-300 dark:border-gray-700' : ''}`}
        >
          <p className="text-sm font-medium dark:text-white">
            {member || ''}
          </p>
        </div>
      ))}
    </div>
  );
};