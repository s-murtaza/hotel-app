import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  token: null,
  wishList: [],
  bookings: []
};

// Create async thunk for toggling wishlist item
export const toggleWishlistItem = createAsyncThunk(
  "user/toggleWishlistItem",
  async (roomId, { getState, rejectWithValue }) => {
    try {

        const token = getState().user.token;

        if (!token) {
            return rejectWithValue('User is not authenticated');
        }
      // Get the current wishlist from the Redux store
      //('in the thunk');
      const currentWishlist = getState().user?.user?.wishList || [];
      //('current wishlist is :', currentWishlist);

      // Check if the roomId already exists in the wishlist
      const roomExistsInWishlist = currentWishlist.includes(roomId);
      let response;

      if (roomExistsInWishlist) {
        // If room exists in wishlist, send request to remove it
        response = await axios.delete(`https://hotelapp-ga27.onrender.com/wishlist/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}` // Send the token in the headers
          }
        });
      } else {
        // If room doesn't exist in wishlist, send request to add it
        response = await axios.post(`https://hotelapp-ga27.onrender.com/wishlist`, { roomId }, {
          headers: {
            Authorization: `Bearer ${token}` // Send the token in the headers
          }
        });
      }

      // Return the updated wishlist from the response
      return response.data.updatedWishlist;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error toggling wishlist");
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.user.wishList = action.payload.wishList;
      //("log in successfull:", state.user, state.token, state.user.wishList);
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      //("logged out");
    },
    setWishList: (state, action) => {
      state.user.wishList = action.payload;
    },
    setBookingList: (state, action) => {
      state.user.reservationList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleWishlistItem.fulfilled, (state, action) => {
        // Update the wishlist with the new data from the API
        //('action payload is:', action.payload);
        state.user.wishList = action.payload;
      })
      .addCase(toggleWishlistItem.rejected, (state, action) => {
        // Handle error if needed
        console.error("Error toggling wishlist:", action.payload);
      });
  },
});

export const { setLogin, setLogout, setWishList, setBookingList } =
  userSlice.actions;
export default userSlice.reducer;
