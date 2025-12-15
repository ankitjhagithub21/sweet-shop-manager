import toast from "react-hot-toast";
import { API_URL } from "../constants";
import SweetCard from "./SweetCard";
import type { Sweet } from "../types";
import axios from "axios";
import { memo, useCallback, useState } from "react";
import EditSweetModal from "./EditSweetModal";
import { useSweetStore } from "../store/useSweetStore";
import DeleteSweetModal from "./DeleteSweetModal";
import RestockSweetModal from "./RestockModal";

interface SweetsProps {
  sweets: Sweet[];
}

const Sweets = memo(({ sweets }: SweetsProps) => {
  const [selectedSweet, setSelectedSweet] = useState<Sweet | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [sweetId, setSweetId] = useState<string | null>(null);
  const [restockId, setRestockId] = useState<string | null>(null);

  const { removeSweet, restockSweet, updateSweet } = useSweetStore();

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
      updateSweet(res.data.sweet)
    } catch (error) {
      console.log(error);
      toast.error("Failed to purchase sweet.");
    }
  };

  const handleDelete = (id: string) => {
    setSweetId(id);
    setIsDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!sweetId) return;

    try {
      await axios.delete(`${API_URL}/api/sweets/${sweetId}`, {
        withCredentials: true,
      });

      toast.success("Sweet deleted successfully");
      removeSweet(sweetId);
    } catch {
      toast.error("Failed to delete sweet");
    } finally {
      setIsDeleteOpen(false);
      setSelectedSweet(null);
    }
  };

  const handleEdit = (sweet: Sweet) => {
    setSelectedSweet(sweet);
    setIsModalOpen(true);
  };

  const handleEditClose = useCallback(() => {
    setIsModalOpen(false);
  }, [isModalOpen]);

  const onRestock = (currentId: string) => {
    setRestockId(currentId);
  };

  const handleRestock = async (quantity: string) => {
   
    try {
      const res = await axios.post(
        `${API_URL}/api/inventory/${restockId}/restock`,
        {
          quantity: quantity,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      if(restockId){
        restockSweet(restockId, Number(quantity));
      }
      setRestockId(null)
      
    } catch (error) {
      console.log(error);
      toast.error("Failed to restock sweet.");
    }
  };

  return (
    <>
      <div className="p-4">
        {sweets?.length === 0 ? (
          <p className="text-center text-gray-600">No sweets available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {sweets?.map((sweet) => (
              <SweetCard
                key={sweet._id}
                sweet={sweet}
                onPurchase={handlePurchase}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onRestock={onRestock}
              />
            ))}
          </div>
        )}
      </div>
      <EditSweetModal
        sweet={selectedSweet}
        isOpen={isModalOpen}
        onClose={handleEditClose}
      />
      {/* 🧨 Delete Confirmation Modal */}
      <DeleteSweetModal
        isOpen={isDeleteOpen}
        onConfirm={confirmDelete}
        onCancel={() => {
          setIsDeleteOpen(false);
          setSweetId(null);
        }}
      />

      <RestockSweetModal
        isOpen={restockId ? true : false}
        onConfirm={handleRestock}
        onCancel={() => {
          setRestockId(null);
        }}
      />
    </>
  );
});

export default Sweets;
