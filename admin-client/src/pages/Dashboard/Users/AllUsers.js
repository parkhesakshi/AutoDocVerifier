import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../functions/getUserData";
import { UserData } from "./UsersData";
import "./AllUsers.scss";
import { ScaleLoader } from "react-spinners";
import { NavLink } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);

  useEffect(() => {
    getAllUsersFunc();
  }, []);

  const getAllUsersFunc = async () => {
    setUsersLoading(true);
    setTimeout(() => {
      getAllUsers()
        .then((res) => {
          console.log(res);
          setUsersLoading(false);
          setUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 1000);
  };
  return (
    <>
      <div className="users_search">
        <input type="text" placeholder="Search user" />
        <span class="material-symbols-outlined">search</span>
      </div>
      {usersLoading && (
        <div className="users-loader">
          <ScaleLoader color="#586665" height={20} />
        </div>
      )}
      <div className="users_list">
        {!usersLoading &&
          users.map((user) => {
            return (
              <NavLink
                to={`/users/${user._id}`}
                className="user"
                key={user._id}
              >
                <div className="user_avatar">
                  <img src={user.picture} alt="user_avatar" />
                </div>
                <div className="user_info">
                  <h4>{user.first_name + " " + user.last_name}</h4>
                  <p>{user.email}</p>
                </div>
              </NavLink>
            );
          })}
      </div>
    </>
  );
};

export default AllUsers;
