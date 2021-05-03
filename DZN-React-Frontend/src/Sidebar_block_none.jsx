function sidebar_block_none () {
    const none_click = document.querySelectorAll('#center_big_ul li');
    const first_big_ul = document.querySelectorAll('#first_big_ul li');
    const nav_menu_bar = document.querySelector('.menuBar');
    const center_header = document.querySelector('.center_header');
    const side_bar = document.querySelector('.sidebar');

    function menu_blockNone_bar(value_nb) {
        nav_menu_bar.style.display = value_nb;
        return value_nb;
    }

    function menu_blockNone_bar2(value_nb2) {
        center_header.style.display = value_nb2;
        side_bar.style.display = value_nb2;
        return value_nb2;
    }

    for (let i = 0; i < first_big_ul.length; i++) {
        first_big_ul[i].addEventListener('click', () => {
            menu_blockNone_bar("block");
            menu_blockNone_bar2("none");
        });
    }

    for (let i = 0; i < none_click.length; i++) {
        none_click[i].addEventListener('click', () => {
            menu_blockNone_bar("none");
            menu_blockNone_bar2("block");
        });
    }
}

export default sidebar_block_none;