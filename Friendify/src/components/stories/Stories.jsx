import React, { useContext } from "react";
import "./stories.scss";
import sone from "./storyImages/sone.jpg";
import stwo from "./storyImages/stwo.jpg";
import sthree from "./storyImages/sthree.jpg";
import sfour from "./storyImages/sfour.jpg";
import sfive from "./storyImages/sfive.jpg";
import { AuthContext } from "../../context/authContext";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  const stories = [
    {
      id: 1,
      name: "John Doe",
      image: sone,
    },
    {
      id: 2,
      name: "Kristine Doe",
      image: stwo,
    },
    {
      id: 3,
      name: "Jenifer Lopej",
      image: sthree,
    },
    {
      id: 4,
      name: "Tom Cruse",
      image: sfour,
    },
    {
      id: 5,
      name: "Dustine Porier",
      image: sfive,
    },
  ];

  return (
    <>
      <div className="stories">
        <div className="story">
          <img src={currentUser.profilePicture} />
          <span>{currentUser.name}</span>
          <button>+</button>
        </div>

        {stories.slice(0, 5).map((item, indx) => {
          return (
            <div className="story" key={item.id}>
              <img
                src={item.image}
                // style={{ width: "200px", height: "400px" }}
              />
              <span>{item.name}</span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Stories;
