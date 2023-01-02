import axios from "axios";

const apiLink = "http://194.27.78.83/dop/";
const resetPasswordLink = apiLink + "resetpassword.php";

async function resetPassword(email) {
  

  try {
    const response = await axios.post(resetPasswordLink, {email}, {
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

export default resetPassword;
