import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ListingCard from "../components/ListingCard";
import ListingFilters from "../components/ListingFilter";
import axios from "axios";
import Footer from "../components/footer";

export default function Listings() {
  const [searchParams] = useSearchParams(); 
  const locationFilter = searchParams.get("location");
  const categoryFilter = searchParams.get("category");

  const [listings, setListings] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(
    locationFilter || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    categoryFilter || ""
  );

  const navigate = useNavigate();

  const handleLocationChange = (e) => {
    const newLocation = e.target.checked ? e.target.value : "";
    //(e.target.checked, e.target.value);
    //(newLocation);
    // if (newLocation === "All Location") {
    //   setSelectedLocation("");
    // } else {
      setSelectedLocation(newLocation);
    // }

    // Use navigate to update the URL with the new location filter
    if (newLocation && newLocation != "All Location") {
      navigate(`/listings?location=${newLocation}`);
    } else {
      navigate("/listings");
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.checked ? e.target.value : "");
  };

  useEffect(() => {
    let url = "http://localhost:3000/listings";

    if (locationFilter && locationFilter) {
      url += `?location=${locationFilter}`;
      //(url);
    } else if (categoryFilter) {
      url += `?category=${categoryFilter}`;
    }

    //(url);

    axios.get(url).then((res) => {
        setListings(res.data);
        //(`this is the response: ${JSON.stringify(res.data)}`);
      })
      .catch((err) => {
        //(err);
      });
  }, [locationFilter, categoryFilter]);

  return (
    <>
        <div className="flex flex-col md:flex-row bg-neutral-100 pt-48">
      <ListingFilters
        selectedLocation={selectedLocation}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        handleLocationChange={handleLocationChange}
      />

      <ul className="mx-auto w-fit">
        {listings.map((listing) => (
          <ListingCard listing={listing} key={listing.room_id} />
        ))}
      </ul>
    </div>
    <Footer/>
    </>
  );
}
