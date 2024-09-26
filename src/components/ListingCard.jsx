import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faBath } from "@fortawesome/free-solid-svg-icons";
import { currencyFormatter } from "../util/formatter";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../redux/state";
import Heart from "react-animated-heart";
import { toast } from "react-toastify";

export default function ListingCard({ listing }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  //(typeof listing.room_id);
  const isInWishlist =
    user && user.wishList && user.wishList.includes(listing.room_id);

  // Handle Wishlist Toggle
  const handleWishlistToggle = () => {
    //("wishlist toggle called");
    if (user) {
      dispatch(toggleWishlistItem(listing.room_id)); // Dispatch the thunk with the roomId
    } else {
      toast.warn("Sign in to add to wishlist");
    }
  };

  return (
    <li
      key={listing.room_id}
      className="mb-6 shadow-md shadow-orange-950/50 bg-neutral-50 rounded-md p-6 w-fit"
    >
      <div className="relative">
        <div
          onClick={handleWishlistToggle}
          className={`absolute -top-5 -left-5 z-10 text-white`}
        >
          <Heart isClick={isInWishlist} />
        </div>
        <div className="flex flex-col md:flex-row w-fit relative">
          <div className="flex-none w-96 relative">
            {listing.s3_file_locations ?(
              <img
                src={listing.s3_file_locations[0]}
                alt="hotel room"
                className="rounded-md h-96 md:h-60 w-full object-cover"
              />
            ) : null}
          </div>
          <Link to={`/listings/${listing.room_id}`}>
            <div className="flex-none w-96 mt-4 md:mt-0">
              <div className="flex flex-row justify-between px-8 ">
                <h2 className="font-Arapey text-2xl">{listing.room_name}</h2>
                <h3>{listing.hotel_location}</h3>
              </div>
              <div className="px-8 mt-2">
                <h3>{listing.room_category}</h3>
                <div className="mt-10 grid grid-cols-2 gap-y-4">
                  <div className="place-self-start font-semibold">
                    {currencyFormatter.format(listing.room_price)}
                    <span className="text-sm font-light"> per night</span>{" "}
                  </div>
                  {listing.booking_id ? (
                    <p className="place-self-end text-sm">
                      from: {listing.booking_start}
                    </p>
                  ) : (
                    <span
                      to={`/listings/${listing.room_id}`}
                      className="place-self-end text-sm"
                    >
                      View details
                    </span>
                  )}
                  <p className="place-self-start">
                    {listing.room_beds} <FontAwesomeIcon icon={faBed} />,{" "}
                    {listing.room_baths} <FontAwesomeIcon icon={faBath} />
                  </p>
                  {listing.booking_id ? (
                    <p className="place-self-end text-sm">
                      from: {listing.booking_end}
                    </p>
                  ) : (
                    <span className="place-self-end text-sm bg-orange-200 px-4 py-1 rounded-sm hover:bg-orange-950 hover:text-white">
                      Reserve
                    </span>
                  )}
                </div>
                <div className="text-center mt-5 mb-2 ">
                  {listing.total_price && (
                    <p className="tracking-wide font-semibold">
                      Total price: ${listing.total_price}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </li>
  );
}
