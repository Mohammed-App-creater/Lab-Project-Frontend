import { FC } from 'react';
import { Member } from './member.table';


// Define props for ConfirmPopup
interface ConfirmPopupProps {
  isOpen: boolean;
  member: Member | null;
  onConfirm: (name: string, isDivisionHead: boolean) => void;
  onCancel: () => void;
}

const ConfirmPopup: FC<ConfirmPopupProps> = ({ isOpen, member, onConfirm, onCancel }) => {
  if (!isOpen || !member) return null;

  const { firstName, middleName, Role } = member;
  const role = Role.name;
  const isDivisionHead = role === 'DivisionHead';
  const actionText = isDivisionHead ? 'Report Delete' : 'Delete';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl text-center">
        <p className="mb-4 text-lg">Do you really want to delete {`${firstName || "Unknown"} ${middleName || "Member"}`}?</p>
        <div className="flex gap-4 justify-center">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => onConfirm(`${firstName} ${middleName}`, isDivisionHead)}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;