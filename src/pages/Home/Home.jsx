import React from "react";
import "../../App.css";
import MainBar from "../../components/MainBar/MainBar";
import LeftSideBar from "../../components/LeftSidebar/LeftSideBar";
import RightSideBar from "../../components/RightSideBar/RightSideBar";
import { useLocation } from "react-router-dom";
import DisplayQuestion from "../../components/DisplayQuestion/DisplayQuestion";
import Tags from "../../components/Tags/Tags";
import Users from "../../components/Users/Users";
import VedioPlayer from "../../components/VedioPlayer/VedioPlayer";

export default function Home() {
  const pathname = useLocation().pathname;
  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        {pathname === "/" || pathname === "/questions" ? (
          <MainBar />
        ) : (
          <>
            {pathname === "/tags" ? (
              <Tags />
            ) : (
              <>{pathname === "/users" ? <Users /> : (
                pathname === "/player" ?
                  <VedioPlayer /> :
                  <DisplayQuestion />
              )}
              </>
            )}
          </>
        )}
        {(pathname !== "/tags" && pathname !== "/users") ? <RightSideBar /> : <></>}
      </div>
    </div>
  );
}
