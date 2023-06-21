import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import SearchInput from "./components/SearchInput";
import { fetchLocationId, fetchWeather } from "./utils/api";
import getImageForWeather from "./utils/getImageForWeather";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [weather, setWeather] = useState("");
  const [feelsLike, setFeelsLike] = useState(0);

  useEffect(() => {
    console.log("Component has mounted!");
    handleUpdateLocation("London");
  }, []);

  const handleUpdateLocation = async (city) => {
    if (!city) return;

    setLoading(true);

    try {
      console.log("Fetching location ID for", city);
      const locationData = await fetchLocationId(city);
      console.log("Location ID data:", locationData);
      const {
        name: location,
        coord: { lat, lon },
      } = locationData;
      console.log("Fetching weather for location:", location);
      const weatherData = await fetchWeather(lat, lon);
      console.log("Weather data:", weatherData);
      const { weather, main } = weatherData;
      console.log("Weather:", weather);
      console.log("Main:", main);
      if (weather && weather.length > 0 && main) {
        const { main: weatherMain } = weather[0];
        const { temp, feels_like: feelsLike } = main;
        setTemperature(temp);
        setFeelsLike(feelsLike);
        setLocation(location);
        setWeather(weatherMain);
        setLoading(false);
      } else {
        throw new Error("Invalid weather data");
      }
    } catch (error) {
      console.log("Error:", error);
      setError(true);
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={getImageForWeather(weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}>
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={loading} color="white" size="large" />
          {!loading && (
            <View>
              {error && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}
              {!error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {location}
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {weather}
                  </Text>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {`${Math.round(temperature)}°`}
                  </Text>
                </View>
              )}

              <SearchInput
                placeholder="Search any city"
                onSubmit={handleUpdateLocation}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495E",
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
    color: "white",
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
});

export default App;
