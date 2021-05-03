import axios from "axios";
import { Server_ajax_post } from '../server_ajax';
import Ajax from '../lib/ajax-3rd-custom'

export async function image_preview(file_info, result_image) {
  try {
    const option = {
      contextType: "multipart/form-data"
    }

    // axios.post('http://localhost:8081/developer/forum/forum_uploade_image_preview', file_info)
    // .then((result) => {
    //   console.log("result", result)
    // result_image(result.data);
    // })

    Ajax.post('http://localhost:8081/developer/forum/forum_uploade_image_preview', file_info, option)
      .then((result) => {
        result_image(result);
      })
    // const axios_host = await Server_ajax_post(
    //   'forum/forum_uploade_image_preview',
    //   file_info
    // )


  } catch (e) {
    console.error(e);
  }
}
