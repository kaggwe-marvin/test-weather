// Function to fetch location ID based on search query
export const fetchLocationId = async (query) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=9ea866263b50c9dc281108facc1487ea`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching location ID:", error);
    return null;
  }
};

// Function to fetch weather details for a specific location using coordinates (latitude and longitude)
export const fetchWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9ea866263b50c9dc281108facc1487ea`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching weather data:", error);
    return null;
  }
};
