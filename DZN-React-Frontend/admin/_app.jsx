import React, { createContext, useContext, useEffect, useState } from "react";
import User_Head from "./Head"; //user 페이지
import "bootstrap/dist/css/bootstrap.css";
import { big_dummy } from '../src/dummy_data';
import { CookiesProvider } from "react-cookie";


const Admin_state_all = createContext();
const initialGaciState = {
  get_dumy_sale_dummy_data: big_dummy.dumy_sale_dummy_data,
}

const Admin = () => {
  return (
    <CookiesProvider>
      <React.Fragment>
          <Admin_state_all.Provider value={{
            initialGaciState,
          }}>
            <User_Head />
          </Admin_state_all.Provider>
      </React.Fragment>
    </CookiesProvider>
  );
};

export default Admin;
export function Admin_fun() {
  return useContext(Admin_state_all);
}
