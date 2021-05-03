function dp2() {
  const op = {
    first_menu_box: document.querySelector(".data_center_box"),
    first_menu_boxSpan: document.querySelector(".data_center_box span"),
    second_menu_box: document.querySelector(".service_center_box"),
    second_menu_boxSpan: document.querySelector(".service_center_box span"),
  };

  op.first_menu_box.classList.add("out_click");
  op.second_menu_box.classList.add("in_click");
  op.first_menu_boxSpan.classList.add("display_outclick");
  op.second_menu_boxSpan.classList.add("display_inclick");

  op.first_menu_box.classList.remove("in_click");
  op.second_menu_box.classList.remove("out_click");
  op.first_menu_boxSpan.classList.remove("display_inclick");
  op.second_menu_boxSpan.classList.remove("display_outclick");
  return op;
}

export default dp2;
