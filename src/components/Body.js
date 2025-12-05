import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import { RESTAURANTS_API_URL } from "../utils/constants";



const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setfilteredRestaurant] = useState([]);

  const [searchText, setSearchText] = useState("");


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(RESTAURANTS_API_URL);
  const json = await data.json();

  const restaurants =
    json?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
      ?.restaurants || [];

  setListOfRestaurants(restaurants);
  setfilteredRestaurant(restaurants);
};
 

  return listOfRestaurants.length === 0  ? ( 
  < Shimmer />
) : (
    <div className="body">
      <div className="filter">

        <div className="search">
          <input type="text" className="search-box" value={searchText}
          onChange={(e) =>
             {setSearchText(e.target.value);
          }} />
          <button 
          onClick={() => {
           const filteredRestaurant 
           = listOfRestaurants.filter((res) =>
             res.info.name.toLowerCase().includes(searchText.toLowerCase()));

           setfilteredRestaurant(filteredRestaurant);
          }}
          >Search</button>
        </div>

        <button className="filter-btn"
        onClick={() => {
          // Filter logic here
          const filteredList = listOfRestaurants.filter(
            (res) => res.info.avgRating > 4.5
          );
         setListOfRestaurants(filteredList)
        }}
        >
          Top Rated Restaurant</button>
      </div>

      <div className="res-container">
        {filteredRestaurant.map((restaurant) => (
          <Link key={restaurant.info.id}
           to={"/restaurants/" + restaurant.info.id}>
            <RestaurantCard
            resData={restaurant}
          /></Link>
        ))}
      </div>
    </div>
  );
};

export default Body;