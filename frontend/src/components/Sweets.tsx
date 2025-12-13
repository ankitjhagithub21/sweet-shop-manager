import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { API_URL } from "../constants";
import SweetCard from "./SweetCard";
import type { Sweet } from "../types";

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

  const handlePurchase = async(id:string) => {
      try{

        const res = await axios.post(`${API_URL}/api/inventory/${id}/purchase`,{
          quantity:1
        },{withCredentials:true})
      
        toast.success(res.data.message)

      }catch(error){
         console.log(error)
         toast.error("Failed to purchase sweet.")
      }
  }

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
            <SweetCard key={sweet._id} sweet={sweet} onPurchase={handlePurchase}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sweets;
