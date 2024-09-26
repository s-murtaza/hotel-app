import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../redux/state";
import axios from "axios";
import { facilities } from "../data";
import "react-date-range/dist/styles.css"; // Main style file for react-date-range
import "react-date-range/dist/theme/default.css"; // Theme file for react-date-range
import { DateRange } from "react-date-range";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faBed,
  faBath,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import Heart from "react-animated-heart";
import Footer from "../components/footer";

export default function ListingDetails() {
  const [listingDetails, setListingDetails] = useState({
    room_id: "",
    hotel_id: "",
    room_name: "",
    room_category: "",
    room_capacity: "",
    room_beds: 1,
    room_baths: 1,
    room_utilities: ["WiFi", " TV"],
    room_isavailable: true,
    room_description: "An affordable single room",
    room_price: 100,
    s3_file_locations: [
      "https://drive.google.com/uc?export=view&id=1Kt14XmxEDEYT5yswVHMtnJKCqtw_CBV7",
    ],
    hotel_name: "Cityscape Suites",
    hotel_location: "Dubai",
  });

  const { listingId } = useParams();
  //(listingId);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  //(token);
  const isInWishlist = user?.wishList?.includes(Number(listingId));

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/listing-details?roomId=${listingId}`)
      .then((res) => {
        setListingDetails(res.data[0]); // Assuming res.data is an array and you need the first object
        //(`this is the response: ${JSON.stringify(res.data[0])}`);
      })
      .catch((err) => {
        //(err);
      });
  }, [listingId]); // Add listingId as a dependency

  //("this is the state", listingDetails);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const start = new Date(dateRange[0].startDate);
  const end = new Date(dateRange[0].endDate);

  // Calculate the difference in milliseconds
  const differenceInMs = end - start;

  // Convert milliseconds to days
  const dayCount = Math.round(differenceInMs / (1000 * 60 * 60 * 24));

  //   const [isAnimating, setIsAnimating] = useState(false);
  const handleWishlistToggle = () => {
    //("wishlist toggle called");
    if (user) {
      dispatch(toggleWishlistItem(Number(listingId))); // Dispatch the thunk with the roomId
    } else {
      toast.warn("Sign in to add to wishlist");
    }
  };

  const navigate = useNavigate();
  function handleGoBack() {
    navigate(-1);
  }

  async function handleSubmit() {
    //("this is the handle submit function");
    try {
      const bookingForm = {
        user_id: user.user_id,
        room_id: listingDetails.room_id,
        startDate: dateRange[0].startDate.toDateString(),
        endDate: dateRange[0].endDate.toDateString(),
        totalPrice: listingDetails.room_price * dayCount,
      };

      const response = await axios.post(
        "http://localhost:3000/bookings/create",
        bookingForm, // The request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the headers
            "Content-Type": "application/json", // Specify the content type
          },
        }
      );
      //(response);
      toast.success("Booking successfull");
      if (response.ok) {
        //(response);
      }
    } catch (err) {
      //("Submit Booking Failed.", err.response.message);
    }
  }

  return (
    <>
      <div className="bg-orange-50 pt-36 px-[12.5vw]">
        <button className="text-sm md:-mx-24" onClick={handleGoBack}>
          {" "}
          <FontAwesomeIcon icon={faArrowLeft} /> Back to listings
        </button>
        <div className="flex flex-row justify-between mt-8 mb-6">
          <h2 className="font-Arapey text-2xl text-orange-900">
            {listingDetails.room_name}
          </h2>
          <div onClick={handleWishlistToggle} className="-p-8 -m-8">
            <Heart isClick={isInWishlist} />
          </div>
        </div>
        <div>
          <ul className="mx-auto grid w-[75vw] md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
            {listingDetails.s3_file_locations?.map((roomImg, index) => (
              <li className="h-72 md:h-52" key={index}>
                <img
                  className="object-cover h-full w-full"
                  src={roomImg}
                  alt="roomimg"
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 capitalize inline-block">
          <h3 className="mb-5">{listingDetails.hotel_location}</h3>
          <h4>
            <FontAwesomeIcon className="text-lg" icon={faUserGroup} />
            <span className="mx-3">{listingDetails.room_capacity}</span>
            <span className="mx-3">-</span>
            <FontAwesomeIcon className="text-lg" icon={faBed} />
            <span className="mx-3">{listingDetails.room_beds}</span>
            <span className="mx-3">-</span>
            <FontAwesomeIcon className="text-lg" icon={faBath} />
            <span className="mx-3 ">{listingDetails.room_baths}</span>
          </h4>
        </div>
        <span className="h-2 w-full bg-orange-900" />
        <div className="mt-12">
          <h3 className="mb-2 text-2xl text-orange-900 font-Arapey">
            Description
          </h3>
          <p>{listingDetails.room_description}</p>
        </div>
        <div className="flex md:flex-row flex-col md:justify-between justify-center mt-12">
          <div className="flex mb-6 md:mb-0 md:w-[30vw] flex-col items-center h-fit bg-white rounded-sm px-12 py-6">
            <h3 className="text-2xl font-Arapey mb-4">
              What this place offers
            </h3>
            <div className="w-full grid grid-cols-2 gap-y-3 sm:gap-x-5 my-6">
              {listingDetails.room_utilities.map((item, index) => (
                <div key={index} className="flex items-center mb-4">
                  <div className="text-xl">
                    {
                      facilities.find((facility) => facility.name === item)
                        ?.icon
                    }
                  </div>
                  <p className="mx-2">{item}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white xl:w-[30vw] h-fit rounded-sm">
            <h3 className="mx-auto w-fit my-5 font-Arapey text-2xl">
              How Long do you want to stay
            </h3>
            <div className="w-fit md:w-fit mx-auto space-y-4 pb-12">
              <DateRange ranges={dateRange} onChange={handleSelect} />
              {dayCount > 1 ? (
                <h2 className="font-semibold">
                  ${listingDetails.room_price} x {dayCount} Nights
                </h2>
              ) : (
                <h2 className="font-semibold">
                  ${listingDetails.room_price} x {dayCount} Night
                </h2>
              )}

              <h2 className="text-[0.95rem] font-semibold">
                Total price: ${listingDetails.room_price * dayCount}
              </h2>
              <p className="text-[0.95rem] font-semibold">
                Check In: {dateRange[0].startDate.toDateString()}
              </p>
              <p className="text-[0.95rem] font-semibold">
                Check Out: {dateRange[0].endDate.toDateString()}
              </p>

              <div className="flex justify-center">
                <button
                  className="my-4 tracking-wide rounded-full text-sm bg-orange-300 hover:text-white hover:bg-orange-950 px-4 py-2"
                  type="submit"
                  onClick={handleSubmit}
                >
                  CONFIRM BOOKING
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
