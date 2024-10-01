import React, { useEffect, useState } from "react";

const FoodSearch = () => {
  const [foodData, setFoodData] = useState([]);
  console.log(foodData);
  const [error, setError] = useState(null);
  const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key
  let item = "large grade A eggs";
  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch(
          `https://api.nal.usda.gov/fdc/v1/foods/search?query=${item}&api_key=${process.env.REACT_APP_FDC_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        // console.log(data);
        setFoodData(data.foods); // Store the food data in the state
      } catch (error) {
        setError(error.message);
        console.error("There was an error!", error);
      }
    };

    fetchFoodData();
  }, [API_KEY]); // The effect runs when the component mounts

  return (
    <div>
      <h1>Food Search Results</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <ul>
        {foodData.length > 0 ? (
          foodData.map((food, index) => <li key={index}>{food.description}</li>)
        ) : (
          <p>No food data found.</p>
        )}
      </ul>
    </div>
  );
};

export default FoodSearch;
