import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { API_URL } from "../constants";

interface Sweet {
  _id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
}

const Sweets = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchSweets = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/sweets`, {
          withCredentials: true,
        });
        setSweets(res.data.sweets);
      } catch (error) {
        toast.error("Failed to load sweets");
      } finally {
        setLoading(false);
      }
    };

    fetchSweets();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-orange-600"></span>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen">

    

      {sweets.length === 0 ? (
        <p className="text-center text-gray-600">No sweets available.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto">
          {sweets.map((sweet) => (
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
                <h2 className="text-xl font-semibold text-orange-700">
                  {sweet.name}
                </h2>
                <p className="text-sm text-gray-600">{sweet.category}</p>

                <div className="flex justify-between items-center mt-3">
                  <span className="font-bold text-orange-600">
                    ₹{sweet.price}
                  </span>
                  <span
                    className={`badge ${
                      sweet.quantity > 0
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {sweet.quantity > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sweets;
