import toast from "react-hot-toast";
import { API_URL } from "../constants";
import SweetCard from "./SweetCard";
import type { Sweet } from "../types";
import axios from "axios";
import { useState } from "react";
import EditSweetModal from "./EditSweetModal";

interface SweetsProps {
  sweets: Sweet[];
}

const Sweets = ({ sweets }: SweetsProps) => {
  const [selectedSweet, setSelectedSweet] = useState<Sweet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePurchase = async (id: string) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/inventory/${id}/purchase`,
        {
          quantity: 1,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to purchase sweet.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await axios.delete(`${API_URL}/api/sweets/${id}`, {
        withCredentials: true,
      });
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete sweet.");
    }
  };

  const handleEdit = (sweet:Sweet) => {
    setSelectedSweet(sweet)
    setIsModalOpen(true)
  };

  return (
    <>
      <div className="p-6 min-h-screen">
        {sweets.length === 0 ? (
          <p className="text-center text-gray-600">No sweets available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 container mx-auto">
            {sweets.map((sweet) => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                onPurchase={handlePurchase}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}
      </div>
      <EditSweetModal
        sweet={selectedSweet}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdated={() => window.location.reload()}
      />
    </>
  );
};

export default Sweets;
