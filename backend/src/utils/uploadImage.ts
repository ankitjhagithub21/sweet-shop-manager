import imagekit from "../config/imagekit";

const uploadImage = async(file: { buffer: any; originalname: any; }) => {
   
    try{
         const result = await imagekit.upload({
          file: file.buffer, // Use buffer if storing in memory
          fileName: file.originalname,
          folder: "/sweet-shop-manager",
        });

        if(result && result.url){
            return result.url
        }
        return null;

    }catch(error){
        console.log("Error uploading image :",error)
        return null
    }
}

export default uploadImage

