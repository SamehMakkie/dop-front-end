import axios from "axios";

const apiLink = "https://dop1.000webhostapp.com/";
const gameInfoLink = apiLink + "gamedetail.php";

async function fetchGameInfo(userId, gameId) {
  const reqData = {
    user_id: userId,
    game_id: gameId,
  };

  try {
    const response = await axios.post(gameInfoLink, reqData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {
      code: response.data.code,
      msg: response.data.message,
      data: response.data.data[0],
    };
  } catch (err) {
    console.error(err);
  }
}

export default fetchGameInfo;
