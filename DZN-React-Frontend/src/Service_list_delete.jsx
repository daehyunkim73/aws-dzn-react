function Service_list_delete_Big() {
  const Service_Delete_popup_Click = document.querySelectorAll(
    ".sale_box_wrap .sale_box_delete_btn"
  );

  console.log(Service_Delete_popup_Click, "Service_Delete_popup_Click");
  const Service_delete_popup_v1 = document.getElementById(
    "Service_delete_popup_v1"
  );

  for (let i = 0; i < Service_Delete_popup_Click.length; i++) {
    Service_Delete_popup_Click[i].addEventListener("click", () => {
      Service_delete_popup_v1.style.display = "table";
    });
  }

  return {
    Service_Delete_popup_Click: Service_Delete_popup_Click,
    Service_delete_popup_v1: Service_delete_popup_v1,
  };
}

export default Service_list_delete_Big;
