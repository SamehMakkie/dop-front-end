import axios from "axios";

const apiLink = "https://dop1.000webhostapp.com/";
const checkEmailAPILink = apiLink + "checkemail.php";

async function checkEmail(email) {
  try {
    const response = await axios.post(
      checkEmailAPILink,
      { email: email },
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return { code: response.data.code, msg: response.data.message };
  } catch (err) {
    console.error(err);
  }
}

export default checkEmail;
