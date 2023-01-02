import axios from "axios";

const apiLink = "https://dop1.000webhostapp.com/";
const deleteCartLink = apiLink + "deletecart.php";

async function deleteCartItem(userId, gameId) {
  const reqData = {
    user_id: userId,
    game_id: gameId
  };

  try {
    const response = await axios.post(deleteCartLink, reqData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {
      code: response.data.code,
      msg: response.data.message,
    };
  } catch (err) {
    console.error(err);
  }
}

export default deleteCartItem;
