import axios from 'axios';

export function image_preview(file_info, result_image) {
    axios.post('http://localhost:8081/support/quest_uploade_image_preview', file_info)
    .then((result) => {
        result_image(result.data);
    })
    .catch((e) => {
        console.error(e);
    })
}