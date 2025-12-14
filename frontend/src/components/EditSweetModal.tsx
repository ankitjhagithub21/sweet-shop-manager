import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { API_URL } from "../constants";
import type { Sweet } from "../types";

interface EditSweetModalProps {
  sweet: Sweet | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
}

const EditSweetModal = ({
  sweet,
  isOpen,
  onClose,
  onUpdated,
}: EditSweetModalProps) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sweet) {
      setName(sweet.name);
      setCategory(sweet.category);
      setPrice(String(sweet.price));
      setQuantity(String(sweet.quantity));
      setPreview(sweet.image);
      setImage(null);
    }
  }, [sweet]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sweet) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("quantity", quantity);
      if (image) formData.append("image", image);

      await axios.put(`${API_URL}/api/sweets/${sweet._id}`, formData, {
        withCredentials: true,
      });

      toast.success("Sweet updated 🍬");
      onUpdated();
      onClose();
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !sweet) return null;

  return (
    <dialog className="modal modal-open">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="modal-box max-w-3xl"
      >
        <h3 className="font-bold text-2xl text-orange-600 mb-4">
          Edit Sweet 🍭
        </h3>

        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
          <input
            className="input input-bordered col-span-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Sweet Name"
          />

          <input
            className="input input-bordered"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
          />

          <input
            type="number"
            className="input input-bordered"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />

          <input
            type="number"
            className="input input-bordered"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
          />

          <input
            type="file"
            className="file-input file-input-warning col-span-2"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }
            }}
          />

          {preview && (
            <img
              src={preview}
              className="col-span-2 h-40 object-cover rounded"
            />
          )}

          <div className="modal-action col-span-2">
            <button
              type="button"
              className="btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="btn bg-orange-500 text-white"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </motion.div>
    </dialog>
  );
};

export default EditSweetModal;
