import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  token: null,
  uname:null,
  setName:(uname) => set({uname}),  
  login: (token) => set({ token, isLoggedIn: true }),
  logout: () => set({ token: null, isLoggedIn: false })
}));

export default useAuthStore;