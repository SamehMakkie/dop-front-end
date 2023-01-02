import axios from "axios";

const apiLink = "http://msevince.com/Dop/";
const signupLink = apiLink + "login.php";

async function login(email, password) {
  try {
    const response = await axios.post(
      signupLink,
      { email, password },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return {
      code: response.data.code,
      msg: response.data.message,
      data: response.data.data[0],
    };
  } catch (err) {
    console.error(err);
  }
}

export default login;
