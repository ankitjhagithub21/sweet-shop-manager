import { motion } from "framer-motion";
import type { Sweet } from "../types";

interface SweetCardProps{
     sweet: Sweet;
}

const SweetCard = ({sweet}:SweetCardProps) => {
  return (
    <motion.div
      key={sweet._id}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card bg-white shadow-xl border border-orange-300"
    >
      <figure>
        <img
          src={sweet.image}
          alt={sweet.name}
          className="h-48 w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="text-xl font-semibold text-orange-700">{sweet.name}</h2>
        <p className="text-sm text-gray-600">{sweet.category}</p>

        <div className="flex justify-between items-center mt-3">
          <span className="font-bold text-orange-600">₹{sweet.price}</span>
          <button
            // disabled={sweet.quantity>0}
            className="btn btn-success"
            // className={`btn ${
            //   sweet.quantity > 1
            //     ? "btn-success"
            //     : "btn-error"
            // }`}
          >
            {/* {sweet.quantity} */}
            Purchase
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SweetCard;
