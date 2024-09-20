import React,{useState} from 'react'
import { useAuth } from './context/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UploadPhoto = () => {

    let[photos, setPhotos] = useState({
        name:"",
        photo:null,
      });
      const navigate = useNavigate();
      const[auth, setAuth] = useAuth();


      const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhotos(prevState => ({
          ...prevState,
          [e.target.name]: file,
        }));
      };
    
      const handleValChange = (e) => {
        const value = e.target.value;
        setPhotos(prevState => ({
          ...prevState,
          [e.target.name]: value,
        }));
      };

      const handleSubmit = async(e) => {
        e.preventDefault();
    
        const photoData = new FormData();
        photoData.append('name', photos.name);
    if (photos.photo) {
      photoData.append('photo', photos.photo);
    }

    
        try{
          const response = await fetch('https://e-commerce-hxgq.onrender.com/api/v1/photo/upload-photo',
            {
              method: 'POST',
              headers : {
                //"Content-Type" :"application/json",
                "Authorization" : auth.token
              },
              body: photoData,
            }
          );
          
          const data = await response.json();
          //console.log("clicked");
          //console.log(data);
    
          if(data?.success){
            toast.success("Photo Uploaded Successfully...");
            navigate('/dashboard/photos');
    
          }else{
            toast.error(data?.message);
          }
        }catch(error){
          console.log(error);
          toast.error("Something went wrong");
        }
      };

  return (
    <>
    <div>UploadPhoto</div>
    <form onSubmit={handleSubmit}>
    <div>
        <label>
        {photos.photo ?  photos.photo.name : "Upload Photo"} 
          <input type='file' name='photo' accept='image/*' onChange={handleFileChange} hidden />
        </label>
      </div>
      <div>
        {photos.photo && (
          <div>
            <img src={URL.createObjectURL(photos.photo)} alt='product-photo' height={'200px'}></img>
          </div>
        )}
      </div>
      <div>
        <input type='text' name='name' value={photos.name} placeholder='Write Name' onChange={handleValChange} />
      </div>
      <button>Upload Photo</button>
    </form>
    </>
  )
}

export default UploadPhoto