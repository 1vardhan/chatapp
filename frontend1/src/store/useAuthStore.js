
// useAuthStore.js
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import axios from "axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [], // <-- ✅ ADD THIS LINE

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async ({ fullName, email, password }) => { // Destructuring the input
    set({ isSigningUp: true });

    try {
      // Create the data object to send in the request body
      const requestData = {
        fullName,
        email,
        password,
      };

      const res = await axiosInstance.post('/auth/signup', requestData); // Use requestData here
      set({ authUser: res.data });
      toast.success('Account created successfully');
    } catch (error) {
      // It's good practice to check if error.response and error.response.data exist
      // before trying to access error.response.data.message
      toast.error(error.response?.data?.message || 'An error occurred during signup.');
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async(data)=>{
    set({ isLoggingIn:true});
    try{
      const res=await axiosInstance.post("/auth/login",data);
      set({authUser:res.data});
      console.log(res.data);
      toast.success("Logged in sucessfully");
    }catch(error){
      toast.error(error.response.data.message);
    }finally{
      set({isLoggingIn:false});
    }
  },

  updateProfile: async ({ profilePic }) => {
  if (!profilePic) {
    console.error("No profilePic received in updateProfile function");
    toast.error("No profile picture selected.");
    return;
  }

  set({ isUpdatingProfile: true });

  try {
    const res = await axiosInstance.put("/auth/update-profile", { profilePic });
    set({ authUser: res.data });
    console.log(res.data);
    toast.success("Profile picture updated");
  } catch (error) {
    console.error("Error in updateProfile request:", error.response?.data || error.message);
    toast.error(error.response?.data?.message || "Profile update failed");
  } finally {
    set({ isUpdatingProfile: false });
  }
},

 logout: async()=>{

  try{
    await axiosInstance.post("/auth/logout");
    toast.success("Logged Out Sucessfully");
    set({authUser:null});
  }
  catch(e){
    toast.error("Error Logging out");
    console.log(e.response.data.message);
  }
}
  
}));