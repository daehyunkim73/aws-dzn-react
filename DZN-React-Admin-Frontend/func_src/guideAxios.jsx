import { Server_ajax_get } from "../Server_ajax";

export function guideListAxios(setDataArray, setDataArrayLogic) {
  (async function () {
    try {
      const guideTitleList = await Server_ajax_get(
        `contents_management/guideTitleList`
      );
      setDataArray(guideTitleList);
      setDataArrayLogic(true);
    } catch (e) {
      return console.error(e);
    }
  })();
}
