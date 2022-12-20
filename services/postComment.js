import axios from "axios";

const apiLink = "http://194.27.78.83/dop/";
const insertCommentLink = apiLink + "insertcomment.php";

async function postComment(userId, gameId, comment) {
  const reqData = {
    user_id: userId,
    game_id: gameId,
    comment: comment
  };

  try {
    const response = await axios.post(insertCommentLink, reqData, {
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

export default postComment;
