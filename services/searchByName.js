import axios from "axios";

async function searchByName(text) {
  const apiLink = "http://194.27.78.83/dop";
  
  try {
    const response = await axios.post(`${apiLink}/searchbyname.php`, {search_text: text}, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

export default searchByName;
