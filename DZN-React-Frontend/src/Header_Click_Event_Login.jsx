function Header_Click_Event_Login() {
    const profile_active_wrap = document.querySelector('.profile_active_wrap');
    const profile_wrap = document.querySelector('.profile_wrap');
    
    profile_active_wrap.style.display = "none";

    profile_wrap.onclick = () => {
        if(profile_active_wrap.style.display == "block"){
            profile_active_wrap.style.display = "none";
        }
        else{
            profile_active_wrap.style.display = "block";
        }
    };
}

export default Header_Click_Event_Login;