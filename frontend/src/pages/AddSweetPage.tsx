import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../constants";

const AddSweetPage = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !category || !price || !quantity || !image) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("image", image);

      await axios.post(`${API_URL}/api/sweets`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Sweet added successfully 🍬");
      navigate("/");

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add sweet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen w-full flex justify-center items-center p-6">

      <div
      
        className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8"
      >
        {/* Header */}
        <h1 className="text-4xl font-bold text-orange-600 mb-2">
          Add New Sweet 🍭
        </h1>
        <p className="text-gray-600 mb-8">
          Add delicious sweets to your store inventory.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

          {/* Sweet Name */}
          <div>
            <label className="label font-semibold text-orange-700">
              Sweet Name
            </label>
            <input
              type="text"
              className="input input-bordered input-warning w-full"
              placeholder="e.g. Rasgulla"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <label className="label font-semibold text-orange-700">
              Category
            </label>
            <input
              type="text"
              className="input input-bordered input-warning w-full"
              placeholder="e.g. Milk Sweet"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          {/* Price */}
          <div>
            <label className="label font-semibold text-orange-700">
              Price (₹)
            </label>
            <input
              type="number"
              className="input input-bordered input-warning w-full"
              placeholder="e.g. 250"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="label font-semibold text-orange-700">
              Quantity
            </label>
            <input
              type="number"
              className="input input-bordered input-warning w-full"
              placeholder="e.g. 20"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="label font-semibold text-orange-700">
              Sweet Image
            </label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-warning w-full"
              onChange={handleImageChange}
            />
          </div>

          {/* Image Preview */}
          {preview && (
            <div className="md:col-span-2">
              <p className="text-sm text-gray-600 mb-2">Image Preview</p>
              <img
                src={preview}
                alt="Preview"
                className="h-48 rounded-lg border object-cover"
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="btn w-full bg-orange-500 hover:bg-orange-600 text-white text-lg"
            >
              {loading ? "Adding Sweet..." : "Add Sweet"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSweetPage;