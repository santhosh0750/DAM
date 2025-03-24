import React from "react";
import Foldercard from "./Foldercard";
import Filesmallcard from "./Filesmallcard";

export default function FileFoldermap({ Folder, Files }) {
  return (
    <>
      {Folder.length != 0 &&
        Folder.map((x) => {
          return <Foldercard key={x} />;
        })}
      {Files.length != 0 &&
        Files.map((y) => {
          return <Filesmallcard key={y} />;
        })}
    </>
  );
}
