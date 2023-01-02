import axios from "axios";

const apiLink = "http://msevince.com/Dop/";
const libraryLink = apiLink + "library.php";

async function fetchLibrary(userId) {
  const reqData = {
    user_id: userId,
  };

  try {
    const response = await axios.post(libraryLink, reqData, {
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

export default fetchLibrary;
