const getImageForWeather = (weatherCondition) => {
  let imageSource;

  switch (weatherCondition) {
    case "Clear":
      imageSource = require("../assets/clear.jpg");
      break;
    case "Clouds":
      imageSource = require("../assets/hail.jpg");
      break;
    case "Rain":
      imageSource = require("../assets/shower.jpg");
      break;
    case "Thunderstorm":
      imageSource = require("../assets/windy.jpg");
      break;
    case "Snow":
      imageSource = require("../assets/windy.jpg");
      break;
    default:
      imageSource = require("../assets/default.jpg");
      break;
  }

  return imageSource;
};

export default getImageForWeather;
