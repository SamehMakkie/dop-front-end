import axios from "axios";

async function filterSearch(maxPrice, minAge, genres_ids) {
  const minPrice = 0;
  const maxAge = 21;
  const apiLink = "http://msevince.com/Dop/";
  const filterLink = apiLink + "filtretedgames.php";

  const reqData = {
    genres_ids: genres_ids,
    selected_game_restriction: minAge,
    age_restriction_max: maxAge,
    selected_max_price: maxPrice,
    selected_min_price: minPrice,
  };

  try {
    const res = await axios.post(filterLink, reqData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {code: res.data.code, msg: res.data.message, data: res.data.data};
  } catch (error) {
    console.error(error);
  }
}

export default filterSearch;
