import axios from "axios";

const apiLink = "http://msevince.com/Dop/";
const checkUserNameAPILink = apiLink + "checkusername.php";

async function checkUsername(userName) {
  try {
    const response = await axios.post(
      checkUserNameAPILink,
      { user_name: userName },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return { code: response.data.code, msg: response.data.message };
  } catch (err) {
    console.error(err);
  }
}

export default checkUsername;
