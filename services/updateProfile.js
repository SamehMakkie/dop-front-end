import axios from "axios";

const apiLink = "http://194.27.78.83/dop/";
const insertCommentLink = apiLink + "updateuserinformation.php";

async function updateProfile(userId, username, email, password, picture) {
  const reqData = {
    user_id: userId,
    user_name: username,
    email: email,
    password: password,
    picture: picture,
  };

  try {
    const response = await axios.post(insertCommentLink, reqData, {
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

export default updateProfile;
