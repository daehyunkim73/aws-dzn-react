function Header_Click_Event() {
    const profile_active_wrap = document.querySelector('.profile_active_wrap');
    const alarm_wrap = document.querySelector('.alarm_wrap');
    const profile_wrap = document.querySelector('.profile_wrap');
    const center_header_right_bell_icon = document.querySelector('.center_header_right_bell_icon');
    const alarm_close = document.querySelector('.alarm_close > img');
    
    profile_active_wrap.style.display = "none";
    alarm_wrap.style.display = "none";

    profile_wrap.onclick = () => {
        if(profile_active_wrap.style.display == "block"){
            profile_active_wrap.style.display = "none";
        }
        else{
            profile_active_wrap.style.display = "block";
            alarm_wrap.style.display = "none";
        }
    };

    center_header_right_bell_icon.onclick = () => {
        if(alarm_wrap.style.display == "block") {
            alarm_wrap.style.display = "none";
        }
        else{
            profile_active_wrap.style.display = "none";
            alarm_wrap.style.display = "block";
        }
    };

    alarm_close.onclick = () => {
        alarm_wrap.style.display = "none";
    }

}

export default Header_Click_Event;