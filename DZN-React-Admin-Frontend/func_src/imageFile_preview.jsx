import axios from "axios";

export function image_preview(file_info, result_image) {
  axios
    .post(
      "http://localhost:7081/contents_management/guide_uploade_image_preview",
      file_info
    )
    .then((result) => {
      result_image(result.data);
    })
    .catch((e) => {
      console.error(e);
    });
}
