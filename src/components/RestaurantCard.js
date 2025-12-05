import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  const {
    name,
    cloudinaryImageId,
    cuisines = [],
    costForTwo,
    avgRating,
    sla,
  } = resData.info;

  return (
    <div className="res-card">
      <img
        className="res-logo"
        src={CDN_URL + cloudinaryImageId}
        alt={name}
      />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <div className="res-info">
        <span>{avgRating} ⭐</span>
        <span>{sla?.deliveryTime} mins</span>
      </div>
      <h4>{costForTwo}</h4>
    </div>
  );
};

export default RestaurantCard;
