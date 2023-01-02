import axios from "axios";

const apiLink = "https://dop1.000webhostapp.com/";
const cartLink = apiLink + "selectcart.php";

async function getCartItems(userId) {
  const reqData = {
    user_id: userId,
  };

  try {
    const response = await axios.post(cartLink, reqData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return {
      code: response.data.code,
      msg: response.data.message,
      data: response.data.data
    };
  } catch (err) {
    console.error(err);
  }
}

export default getCartItems;
