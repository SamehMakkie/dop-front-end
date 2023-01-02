import axios from "axios";

const apiLink = "https://dop1.000webhostapp.com/";
const signupLink = apiLink + "signup.php";

async function createAccount(user) {
  const reqData = {
    email: user.email,
    user_name: user.username,
    password: user.password,
    birth_date: user.birthDate,
  };

  try {
    const response = await axios.post(signupLink, reqData, {
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

export default createAccount;
