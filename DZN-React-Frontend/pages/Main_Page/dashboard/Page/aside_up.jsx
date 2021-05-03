import React from 'react';
import Aside_main from '../components/Aside_main';

const Aside_up = () => {
    return (
        <React.Fragment>
          <div className="big_aside_box">
            <div className="second_big_aside_box">
              <Aside_main />
            </div>
          </div>
        </React.Fragment>
      );
}

export default Aside_up;