import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useUserStore } from "../store/useUserStore";
import type { Sweet } from "../types";

interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (_id: string) => void;
  onDelete:(_id:string)=>void;
  onEdit:(sweet:Sweet)=>void;
}

const SweetCard = ({ sweet, onPurchase, onDelete, onEdit }: SweetCardProps) => {
 
  const user = useUserStore((state) => state.user);

  const isAdmin = user?.role === "admin";

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-white shadow-xl relative overflow-hidden"
    >
      {/* 🔐 Admin Buttons */}
      {isAdmin && (
        <div className="absolute top-2 right-2 z-10 flex gap-2">
          <button
             onClick={() => onEdit(sweet)}
            className="btn btn-sm btn-warning text-white"
          >
            <FaEdit />
          </button>

          <button
            className="btn btn-sm btn-error text-white"
            onClick={() => onDelete(sweet._id)}
          >
            <FaTrash />
          </button>
        </div>
      )}

      <figure>
        <img
          src={sweet.image}
          alt={sweet.name}
          className="h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="text-xl font-semibold">{sweet.name}</h2>
        <p className="text-sm text-gray-600">{sweet.category}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-orange-600">
            ₹{sweet.price}
          </span>

          <button
            onClick={() => onPurchase(sweet._id)}
            disabled={sweet.quantity < 1}
            className="btn btn-success"
          >
            Purchase
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SweetCard;
