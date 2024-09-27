import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ListingCard from "../components/ListingCard";
export default function Bookings() {
  const user = useSelector((state) => state.user.user);
  const [bookings, setBookings] = useState([]);
  const userId = user?.user_id;
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    // Only fetch bookings if user is logged in
    if (userId && token) {
      const fetchBookings = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3000/bookings/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.status === 200) {
            setBookings(response.data.bookings);
          }
        } catch (error) {
          console.error("Error fetching bookings:", error.message);
        }
      };

      fetchBookings();
    } else {
      // Reset bookings if user is logged out
      setBookings([]);
    }
  }, [userId, token]); // Dependencies

  return (
    <>
      <div className="flex flex-col h-lvh items-center bg-neutral-100 pt-48">
        <h1 className="font-Arapey text-4xl text-orange-950 mb-6">
          My Bookings
        </h1>
        {!user ? (
          <h2 className="tracking-wide">Log in to access your wishlist</h2>
        ) : bookings.length > 0 ? (
          <ul className="mx-auto w-fit">
            {bookings.map((booking, index) => (
              <ListingCard key={index} listing={booking} />
            ))}
          </ul>
        ) : (
          <p>No bookings found.</p>
        )}
      </div>
    </>
  );
}
