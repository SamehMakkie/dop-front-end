import axios from "axios";

const apiLink = "http://194.27.78.83/dop/";
const changePasswordLink = apiLink + "changepassword.php";

async function changePassword(userId, oldPassword, newPassword) {
  const reqData = {
    user_id: userId,
    old_password: oldPassword,
    new_password: newPassword,
  };
  try {
    const response = await axios.post(changePasswordLink, reqData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return { code: response.data.code, msg: response.data.message };
  } catch (err) {
    console.error(err);
  }
}

export default changePassword;
