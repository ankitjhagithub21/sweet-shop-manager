import { useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import { useSweetStore } from "../store/useSweetStore";

const AddSweetPage = () => {
  
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();

  const { addSweet } = useSweetStore();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const removeImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
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

      const res = await axios.post(`${API_URL}/api/sweets`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);
      addSweet(res.data.sweet);
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add sweet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" min-h-screen w-full flex flex-col justify-center p-6">
      <div className="mb-5 max-w-4xl mx-auto flex items-start w-full">
        <Link className="btn btn-secondary" to={"/"}>
          Back
        </Link>
      </div>

      <div className="w-full max-w-4xl bg-white mx-auto rounded-xl shadow-2xl p-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text--600 mb-2">Add New Sweet</h1>
        <p className="text-gray-600 mb-8">
          Add delicious sweets to your store inventory.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          {/* Sweet Name */}
          <div>
            <label className="label text-sm">Sweet Name</label>
            <input
              type="text"
              className="input outline-none input-secondary w-full"
              placeholder="e.g. Rasgulla"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="label text-sm">Category</label>
            <input
              type="text"
              className="input  outline-none  input-secondary w-full"
              placeholder="e.g. Milk Sweet"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              name="category"
            />
          </div>

          {/* Price */}
          <div>
            <label className="label text-sm">Price (₹)</label>
            <input
              type="number"
              className="input outline-none input-secondary w-full"
              placeholder="e.g. 250"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              name="price"
            />

          </div>

          {/* Quantity */}
          <div>
            <label className="label text-sm ">Quantity</label>
            <input
              type="number"
              className="input outline-none input-secondary w-full"
              placeholder="e.g. 20"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              name="quantity"
              min={1}
              
            />
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2 relative">
            <label className="label text-sm">Sweet Image</label>

            {/* Hidden Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              id="sweet-image"
              className="hidden"
              onChange={handleImageChange}
              name="image"
            />

            {/* Upload Box */}
            <label
              htmlFor="sweet-image"
              className="flex flex-col items-center justify-center
               border-2 border-dashed border-secondary
               rounded-lg h-40 cursor-pointer
               hover:bg-secondary/10 transition"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-contain rounded"
                />
              ) : (
                <>
                  <span className="text-3xl">📷</span>
                  <p className="text-sm text-gray-600 mt-2">
                    Click to upload sweet image
                  </p>
                </>
              )}
            </label>

            {/* ❌ Remove Button */}
            {preview && (
              <button
                type="button"
                onClick={removeImage}
                className="btn btn-xs btn-error absolute top-8 right-2"
              >
                ✕
              </button>
            )}
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="btn w-full btn-secondary text-white text-lg"
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
