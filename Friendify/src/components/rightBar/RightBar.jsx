import React, { useEffect, useState,useContext } from "react";
import "./rightBar.scss";
import UserImg from "../../assets/logo2.png";
import axios from "axios";
import { AuthContext } from "../../context/authContext"
import { Navigate, useNavigate, useLocation } from "react-router-dom";

const RightBar = () => {
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();

  useEffect(()=>{
    console.log("Userr Data :::: " , userData);
  },[userData])

  const { currentUser, login } = useContext(AuthContext);

  //-------------------------------------------------------------------------------------

  const fetchSuggestedUsers = () => {
    axios
      .get("http://localhost:8005/api/fetchSuggestedUsers", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Fetched Suggested Usersfrom RightBar : ", res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //------------------------------------------------------------------------------------

  useEffect(() => {
    fetchSuggestedUsers();
  }, []);

  //----------------------------------------------------------------------------------


  const followUser = (guestUser)=>{
    axios
        .post(
          "http://localhost:8005/api/relation/follow",
          { followerId: currentUser.id, followedId: guestUser },
          { withCredentials: true }
        )
        .then((res) => {
          console.log("follow response", res);
          SetRelation("Unfollow");
        })
        .catch((err) => {
          console.log(err);
        });
  }



  return (
    <div className="rightbar">
      <div className="container">
        {/* first item  */}
        <div className="item">
          <span>Suggestion for you</span>

          {userData?.map((item, indx) => {
            return (
              <div className="user" key={indx}>
                <div className="userinfo">
                  <img src={"/public/upload/" + item.profilePic}
                  onClick={()=>navigate("/profile/" + item.userId)}
                  />
                  <span>{item.username}</span>
                </div>

                <div className="buttons">
                  <button onClick={()=>followUser(item.userId)}>Follow</button>
                  {/* <button>Dismiss</button> */}
                </div>
              </div>
            );
          })}
        </div>

        {/* second item  */}
        {/* <div className="item">
          <span>Latest Activities</span>

          <div className="user">
            <div className="userinfo">
              <img src={UserImg} />
              <p>
                <span>Jessyka Doe</span>
                Changed thier cover picture
              </p>
            </div>

            <div className="buttons">
              <span>1 min ago</span>
            </div>
          </div>

          <div className="user">
            <div className="userinfo">
              <img src={UserImg} />
              <p>
                <span>Jessyka Doe</span>
                Changed thier cover picture
              </p>
            </div>

            <div className="buttons">
              <span>1 min ago</span>
            </div>
          </div>

          <div className="user">
            <div className="userinfo">
              <img src={UserImg} />
              <p>
                <span>Jessyka Doe</span>
                Changed thier cover picture
              </p>
            </div>

            <div className="buttons">
              <span>1 min ago</span>
            </div>
          </div>

          <div className="user">
            <div className="userinfo">
              <img src={UserImg} />
              <p>
                <span>Jessyka Doe</span>
                Changed thier cover picture
              </p>
            </div>

            <div className="buttons">
              <span>1 min ago</span>
            </div>
          </div>
        </div> */}

        {/* third item  */}

        {/* <div className="item">
        <span>Online Friends</span>
          <div className="user">
            <div className="userinfo">
              <img src={UserImg} />
              <div className="online"></div>
              <span>Jessyka Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userinfo">
              <img src={UserImg} />
              <div className="online"></div>
              <span>Jessyka Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userinfo">
              <img src={UserImg} />
              <div className="online"></div>
              <span>Jessyka Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userinfo">
              <img src={UserImg} />
              <div className="online"></div>
              <span>Jessyka Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userinfo">
              <img src={UserImg} />
              <div className="online"></div>
              <span>Jessyka Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userinfo">
              <img src={UserImg} />
              <div className="online"></div>
              <span>Jessyka Doe</span>
            </div>
          </div>
          <div className="user">
            <div className="userinfo">
              <img src={UserImg} />
              <div className="online"></div>
              <span>Jessyka Doe</span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RightBar;
