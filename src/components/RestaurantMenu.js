// src/components/RestaurantMenu.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Shimmer from "./shimmer";
import { RESTAURANTS_API_URL } from "../utils/constants";

const generateRecommendedItems = (info) => {
  const cuisines = info?.cuisines || [];
  const primaryCuisine = cuisines[0] || "Special";
  const secondaryCuisine = cuisines[1] || "";

  // Try to extract number from "₹350 for two"
  let costForTwo = 300; // default
  if (info?.costForTwoMessage) {
    const m = info.costForTwoMessage.match(/\d+/);
    if (m) {
      costForTwo = parseInt(m[0], 10);
    }
  } else if (info?.costForTwo) {
    // Swiggy sometimes sends costForTwo in paise (e.g. "35000")
    const val = Number(info.costForTwo);
    if (!Number.isNaN(val) && val > 0) {
      costForTwo = Math.round(val / 100);
    }
  }

  const basePerPerson = Math.max(80, Math.round(costForTwo / 2));

  const prices = [
    Math.round(basePerPerson * 0.8),
    basePerPerson,
    Math.round(basePerPerson * 1.2),
  ];

  const restName = info?.name || "Chef's";
  const rating = info?.avgRatingString || "";

  return [
    {
      id: info.id + "-r1",
      name: `${primaryCuisine} Classic Meal`,
      price: prices[0],
      rating,
    },
    {
      id: info.id + "-r2",
      name: `${primaryCuisine} Special Combo`,
      price: prices[1],
      rating,
    },
    {
      id: info.id + "-r3",
      name: `${secondaryCuisine || primaryCuisine} Family Box`,
      price: prices[2],
      rating,
    },
  ];
};

const RestaurantMenu = () => {
  const { resId } = useParams();

  const [restaurant, setRestaurant] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        setError("");

        const resp = await fetch(RESTAURANTS_API_URL);
        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status}`);
        }
        const json = await resp.json();

        const cards = json?.data?.cards || [];
        let restaurants = [];

        for (const card of cards) {
          const list =
            card?.card?.card?.gridElements?.infoWithStyle?.restaurants;
          if (Array.isArray(list) && list.length > 0) {
            restaurants = list;
            break;
          }
        }

        const match = restaurants.find(
          (r) => String(r?.info?.id) === String(resId)
        );

        if (!match) {
          throw new Error("Restaurant not found in list data");
        }

        const info = match.info;
        setRestaurant(info);

        // Generate fake/estimated "Recommended" items from cuisines + costForTwo
        const items = generateRecommendedItems(info);
        setRecommended(items);
      } catch (err) {
        console.log("Failed to load restaurant:", err.message || err);
        setError("Could not load restaurant details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [resId]);

  if (loading) return <Shimmer />;

  if (error) return <div className="error">{error}</div>;

  const info = restaurant;

  return (
    <div className="menu-page">
      {/* -------- Restaurant summary -------- */}
      <div className="restaurant-summary">
        <h2>{info.name}</h2>

        <div className="restaurant-meta">
          <span>⭐ {info.avgRatingString}</span>
          <span> • {info.costForTwoMessage}</span>
          <span> • {info?.sla?.slaString}</span>
        </div>

        <div className="restaurant-location">
          <p>
            {info.locality}, {info.areaName}
          </p>
        </div>
      </div>

      {/* -------- Generated "Recommended" section -------- */}
      <h3 className="menu-section-title">Recommended</h3>
      <p style={{ fontSize: "12px", opacity: 0.7 }}>
        (Auto-generated items based on cuisines and cost for two – not the real
        Swiggy menu.)
      </p>

      <ul className="menu-list">
        {recommended.map((dish) => (
          <li key={dish.id} className="menu-item">
            <div className="menu-item-main">
              <span className="menu-item-name">{dish.name}</span>
            </div>
            <div className="menu-item-meta">
              <span className="menu-item-price">₹{dish.price}</span>
              {dish.rating && (
                <span className="menu-item-rating">⭐ {dish.rating}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
