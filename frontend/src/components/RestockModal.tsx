import { useState } from "react";

interface RestockSweetModalProps{
    isOpen:boolean;
    onConfirm:(quantity:string)=>void;
    onCancel:()=>void;
}

const RestockSweetModal = ({
  isOpen,
  onConfirm,
  onCancel,
}: RestockSweetModalProps) => {
  if (!isOpen) return null;

  const [quantity, setQuantity] = useState('')
  
  return (
    
    <dialog open className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="mb-2 text-lg">
          Restock Sweet quantity
        </h3>

       <div>
        <input type="number" value={quantity} min={1} onChange={(e)=>setQuantity(e.target.value)} placeholder="Enter quantity"  className="input input-secondary w-full outline-none"/>
       </div>

        <div className="modal-action">
          <button
            className="btn btn-ghost"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="btn btn-secondary "
            onClick={() => onConfirm(quantity)}
          >
            Restock
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default RestockSweetModal;
