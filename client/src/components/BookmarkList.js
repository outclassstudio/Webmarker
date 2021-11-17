import Folder from "./Folder";
import AddFolder from "./AddFolder";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setFolders } from "../actions/folder";

function BookmarkList() {
  const dispatch = useDispatch();
  const folders = useSelector((store) => store.folder.folders);

  useEffect(() => {
    axios
      .get(
        "http://ec2-54-180-96-63.ap-northeast-2.compute.amazonaws.com/bookmarks",
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        console.log(response.data.data.folders);
        const folders = response.data.data.folders;
        dispatch(setFolders(folders));
      })
      .catch((err) => {});
  }, [dispatch]);

  return (
    <section id="bookmark-list-wrapper">
      <div id="bookmark-title">Bookmark List</div>
      {folders.map((folder) => (
        <Folder
          id={folder.id}
          name={folder.name}
          userId={folder.userId}
          bookmarks={folder.Bookmarks}
        />
      ))}
      <AddFolder />
    </section>
  );
}

export default BookmarkList;
