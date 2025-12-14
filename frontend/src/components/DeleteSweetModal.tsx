interface DeleteSweetModalProps {
  isOpen: boolean;
  sweetName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteSweetModal = ({
  isOpen,
  onConfirm,
  onCancel,
}: DeleteSweetModalProps) => {
  if (!isOpen) return null;

  return (
    
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg text-red-600">
          Delete Sweet
        </h3>

        <p className="py-4">
          Are you sure you want to delete ?  
          This action cannot be undone.
        </p>

        <div className="modal-action">
          <button
            className="btn btn-ghost"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="btn btn-error text-white"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default DeleteSweetModal;
