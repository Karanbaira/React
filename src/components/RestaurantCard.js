import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData} = props;

  const {
    name,
    avgRating,
    cuisine,
    costForTwo,
    deliverTime,

  } = resData?.data;

  return(
    <div className="res-card">
      <img 
      className="res-logo"
      alt="res-logo"
      src={CDN_URL}/>
      <h3>{name}</h3>
      <div className="res-info">
        <h4>{cuisine}</h4>
      <h4>{avgRating}⭐</h4>
      <h4>{deliverTime} minutes</h4>
      </div>
      <h4>{costForTwo } For Two</h4>
      
    </div>
  );
};


export default RestaurantCard;