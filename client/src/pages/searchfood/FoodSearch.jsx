import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const FoodSearch = () => {
  const [foodData, setFoodData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  let item = "milk";

  useEffect(() => {
    const fetchFoodData = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false); // Stop loading after the fetch is complete
      }
    };

    fetchFoodData();
  }, [process.env.REACT_APP_FDC_API_KEY]); // The effect runs when the component mounts

  return (
    <div>
      <h1>Food Search Results</h1>
      {isLoading && <CircularProgress />}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {foodData && !isLoading && (
        <ul>
          {foodData.length > 0 ? (
            foodData.map((food, index) => (
              <li key={index}>{food.description}</li>
            ))
          ) : (
            <p>No food data found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default FoodSearch;
