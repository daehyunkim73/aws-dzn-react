import React from 'react';
import footer_logo from '../../image/Center/Logo/footer_logo.png';

const Admin_footer = () => {
   return (
      <React.Fragment>
         <footer>
            <div className="footer_wrap">
               <div className="second_footer_wrap">
                  <img className="footer_logo" src={footer_logo} alt="logo" />
                  <p className="footer_copyright" >Copyright © DOUZONE BIZON. All rights reserved.</p>
               </div>
            </div>
         </footer>
      </React.Fragment>
   )
}

export default Admin_footer;