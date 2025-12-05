// server.js
// Backend proxy for Swiggy (restaurant list + menu)

const express = require("express");
const cors = require("cors");

// node-fetch v3 with CommonJS
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 4000;

app.use(cors());

// ---------- Swiggy URLs ----------

// Restaurant list for your location
const SWIGGY_LIST_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5" +
  "?lat=26.2342852&lng=73.0204502&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING";

// Base menu URL – we append restaurantId and other params
const SWIGGY_MENU_BASE =
  "https://www.swiggy.com/dapi/menu/pl" +
  "?page-type=REGULAR_MENU&complete-menu=true" +
  "&lat=26.2342852&lng=73.0204502&restaurantId=";

// Headers to mimic a real browser
const SWIGGY_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json, text/plain, */*",
  Referer: "https://www.swiggy.com/",
  Origin: "https://www.swiggy.com",
  "Accept-Language": "en-US,en;q=0.9",
};

// ---------- Routes ----------

// 1) Restaurant list
app.get("/api/restaurants", async (req, res) => {
  try {
    const response = await fetch(SWIGGY_LIST_URL, {
      headers: SWIGGY_HEADERS,
    });

    console.log("Swiggy list status:", response.status);

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("Swiggy list error body:", text.slice(0, 200));
      return res
        .status(response.status)
        .json({ error: "Swiggy list error", status: response.status });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Restaurants API failed:", err.message || err);
    res.status(500).json({ error: "Failed to fetch restaurants" });
  }
});

// 2) Menu for one restaurant
app.get("/api/menu/:id", async (req, res) => {
  const { id } = req.params;

  const url =
    SWIGGY_MENU_BASE +
    id +
    "&catalog_qa=undefined&submitAction=ENTER";

  try {
    const response = await fetch(url, {
      headers: SWIGGY_HEADERS,
    });

    console.log("Swiggy menu status:", response.status);

    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("Swiggy menu error body:", text.slice(0, 200));
      return res
        .status(response.status)
        .json({ error: "Swiggy menu error", status: response.status });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Menu API failed:", err.message || err);
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
