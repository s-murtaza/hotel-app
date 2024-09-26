import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Outlet } from "react-router-dom";
import MainPage from './pages/MainPage';
import NavBar from "./components/navbar";
import AccountPage from "./pages/RegistrationPage";
import Listings from "./pages/Listings";
import ListingDetails from "./pages/ListingDetails"
import WishlistPage from "./pages/WishList";
import Bookings from "./pages/Bookings";

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar/>}>
        <Route index element={<MainPage />} />
        <Route path="/login" element={<AccountPage/>}/>
        <Route path="listings" element={<Listings />} />
        <Route path="listings/:listingId" element={<ListingDetails />} />
        <Route path="wishlist" element={<WishlistPage/>}/>
        <Route path="bookings" element={<Bookings/>}/>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

