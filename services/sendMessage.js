import axios from "axios";

const apiLink = "http://194.27.78.83/dop/";
const contactUsMessageLink = apiLink + "contactsendmail.php";

async function sendMessage(email, subject, message) {
  const reqData = {
    email,
    subject,
    message
  };

  try {
    const response = await axios.post(contactUsMessageLink, reqData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {
      code: response.data.code,
      msg: response.data.message,
    };
  } catch (err) {
    console.error(err);
  }
}

export default sendMessage;
