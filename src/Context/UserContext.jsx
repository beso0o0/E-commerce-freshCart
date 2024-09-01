import { createContext, useEffect, useState } from "react";
export let UserContext = createContext();

export default function UserContextProvider(props) {
  let [userLogin, setUserLogin] = useState(null);
  //de tare'a tanya gher el taht fe line 13 el etnen sahh
  /*     let[userLogin,setUserLogin]=useState(
        {localStorage.getItem("userToken")?localStorage.getItem("userToken"):null}
    );
 */
  //da 3shan lma a3ml reload wel code y rerender tany w yb'a userLogin b null yakhodha mn local storage
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserLogin(localStorage.getItem("userToken"));
    }

  }, []);

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {props.children}
    </UserContext.Provider>
  );
}

//hymd el childrens kolhom bel data el gwa el function w el value de bahot feha el haga el hstkhdmha hnak
