import axios from "axios";

const apiLink = "http://msevince.com/Dop/";
const setRatingLink = apiLink + "gameratingsave.php";

async function updateRating(userId, gameId, rating) {
  const reqData = {
    user_id: userId,
    game_id: gameId,
    rating: rating,
  };

  try {
    const response = await axios.post(setRatingLink, reqData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return {
      code: response.data.code,
      msg: response.data.message,
      totalRating: response.data.data[0].last_total_rating,
    };
  } catch (err) {
    console.error(err);
  }
}

export default updateRating;
