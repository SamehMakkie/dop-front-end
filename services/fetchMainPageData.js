import axios from "axios";

async function fetchMainPageData() {
  try {
    const response = await axios.get("http://194.27.78.83/dop/mainpage.php");
    return response.data.data[0];
  } catch (error) {
    console.error(error);
  }
}

export default fetchMainPageData;
