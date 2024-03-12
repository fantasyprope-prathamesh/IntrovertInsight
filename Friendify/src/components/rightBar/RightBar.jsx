import React, { useEffect, useState } from "react";
import "./rightBar.scss";
import UserImg from "../../assets/logo2.png";
import axios from "axios";

const RightBar = () => {
  const [userData, setUserData] = useState([]);

  //-------------------------------------------------------------------------------------

  const fetchUsers = (value) => {
    axios
      .get("http://localhost:8005/api/fetchUsers/" + value, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Fetched usersfrom RightBar : ", res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //------------------------------------------------------------------------------------

  useEffect(() => {
    fetchUsers(2);
  }, []);

  // useEffect(()=>{
  //   console.log("O patil : ", userData)
  // },[userData])

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
                  <img src={"/public/upload/" + item.profilePic} />
                  <span>{item.username}</span>
                </div>

                <div className="buttons">
                  <button>Follow</button>
                  <button>Dismiss</button>
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
