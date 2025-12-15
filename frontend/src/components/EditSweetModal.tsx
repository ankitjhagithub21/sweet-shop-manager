import { memo, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { API_URL, categories } from "../constants";
import type { Sweet } from "../types";
import { useSweetStore } from "../store/useSweetStore";

interface EditSweetModalProps {
  sweet: Sweet | null;
  isOpen: boolean;
  onClose: () => void;
}

const EditSweetModal = memo(({
  sweet,
  isOpen,
  onClose,

}: EditSweetModalProps) => {
  
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { updateSweet } = useSweetStore();

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

      const res = await axios.put(`${API_URL}/api/sweets/${sweet._id}`, formData, {
        withCredentials: true,
      });

      toast.success(res.data.message);
      updateSweet(res.data.sweet);
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
        <h3 className="font-semibold text-2xl  mb-4">Edit Sweet</h3>

        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="text-xs text-gray-600">
              Sweet Name
            </label>
            <input
              className="input input-bordered outline-none col-span-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Sweet Name"
              name="name"
            />
          </div>

            <div className="flex flex-col">
            <label htmlFor="category" className="text-sm text-gray-600 text-sm">
              Category
            </label>
            {/* 🍩 Category Filter */}
            <select
              className="select select-bordered outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
              id="category"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="text-xs text-gray-600">
              Price
            </label>
            <input
              type="number"
              className="input input-bordered outline-none"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              name="price"
            />
          </div>

          <div>
            <label htmlFor="quantity" className="text-xs text-gray-600">
              Quantity
            </label>

            <input
              type="number"
              className="input input-bordered outline-none"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
              name="quantity"
              min={1}
            />
          </div>

          <input
            type="file"
            className="file-input file-secondary col-span-2"
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
            <button type="button" className="btn" onClick={onClose}>
              Cancel
            </button>

            <button
              type="submit"
              className="btn btn-secondary"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </motion.div>
    </dialog>
  );
});

export default EditSweetModal;
