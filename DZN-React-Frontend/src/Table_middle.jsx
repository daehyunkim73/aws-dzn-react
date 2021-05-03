function table_middle() {
    const td = document.querySelectorAll('table td');
    for (let i = 0; i < td.length; i++) {
      td[i].classList.add('align-middle');
    }
    return td;
}

export default table_middle;