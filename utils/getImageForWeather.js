const getImageForWeather = (weatherCondition) => {
  let imageSource;

  switch (weatherCondition) {
    case "clear":
      imageSource = require("../assets/clear.jpg");
      break;
    case "clouds":
      imageSource = require("../assets/cloudy.jpg");
      break;
    case "rain":
      imageSource = require("../assets/shower.jpg");
      break;
    case "thunderstorm":
      imageSource = require("../assets/hail.jpg");
      break;
    case "snow":
      imageSource = require("../assets/windy.jpg");
      break;
    default:
      imageSource = require("../assets/default.jpg");
      break;
  }

  return imageSource;
};

export default getImageForWeather;
