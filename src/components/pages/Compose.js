import React from "react";
import TextEditor from "./TextEditor";
import Header from "./MainPage";

const Compose = () => {
  return (
    <>
      <Header />
      <div className="">
        <div className="">
          <TextEditor />
        </div>
      </div>
    </>
  );
};

export default Compose;
