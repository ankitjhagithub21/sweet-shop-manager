import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useUserStore } from "../store/useUserStore";
import type { Sweet } from "../types";
import { memo } from "react";


interface SweetCardProps {
  sweet: Sweet;
  onPurchase: (_id: string) => void;
  onDelete: (_id: string) => void;
  onRestock: (_id: string) => void;
  onEdit: (sweet: Sweet) => void;
}

const SweetCard = memo(
  ({ sweet, onPurchase, onDelete, onEdit, onRestock }: SweetCardProps) => {
    const user = useUserStore((state) => state.user);
    const isAdmin = user?.role === "admin";
    const isOutOfStock = sweet.quantity === 0;

    return (
      <motion.div
        whileHover={{ scale: isOutOfStock ? 1 : 1.05 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`card bg-white shadow-xl relative overflow-hidden ${
          isOutOfStock ? "opacity-80" : ""
        }`}
      >
        {/* 🔴 Out of Stock Badge */}
        {isOutOfStock && (
          <div className="absolute top-2 left-2 z-10 badge badge-error text-white">
            Out of Stock
          </div>
        )}

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
              onClick={() => onDelete(sweet._id)}
              className="btn btn-sm btn-error text-white"
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
          <h2 className="text-lg truncate font-semibold">{sweet.name}</h2>
          <p className="text-sm text-gray-600">{sweet.category}</p>

          <div className="flex justify-between items-center mt-3">
            <span className="font-bold text-orange-600">₹{sweet.price}</span>
            <div>
              {isOutOfStock ? (
                <button
                  onClick={() => onRestock(sweet._id)}
                  className="btn btn-sm btn-success text-white"
                >
                  Restock
                </button>
              ) : (
                <button
                  onClick={() => onPurchase(sweet._id)}
                  disabled={isOutOfStock}
                  className="btn btn-sm btn-secondary"
                >
                  Purchase
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

export default SweetCard;
