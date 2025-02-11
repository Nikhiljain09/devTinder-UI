import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";

import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";

function App() {
  const [count, setCount] = useState(0);

  return (
    // <div className=" bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-gradient">
    <Provider store={appStore}>
      <div>
        {/* <h1 className="text-3xl font-bold flex items-center  h-[calc(100vh-6rem)] justify-center m-auto">
        Development In Progress
      </h1> */}

        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/profile" element={<Profile />}></Route>
            </Route>
            {/* <Route path="/profile" element={<div>Profile</div>}></Route> */}
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
