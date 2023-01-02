import axios from "axios";

const apiLink = "https://dop1.000webhostapp.com/";
const buyGameLink = apiLink + "buygame.php";

async function pay(userId, gameIds, taxPercentage, totalPrice, fullName) {
  const reqData = {
    user_id: userId,
    buy_game_ids: gameIds,
    tax_percentage: taxPercentage,
    total_price: totalPrice,
    name_surname: fullName
  };

  try {
    const response = await axios.post(buyGameLink, reqData, {
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

export default pay;
