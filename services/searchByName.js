import axios from "axios";

async function searchByName(text) {
  const apiLink = "http://194.27.78.83/dop";

  try {
    const res = await axios.post(
      `${apiLink}/searchbyname.php`,
      { search_text: text },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return { code: res.data.code, msg: res.data.message, data: res.data.data };
  } catch (error) {
    console.log(error);
  }
}

export default searchByName;
