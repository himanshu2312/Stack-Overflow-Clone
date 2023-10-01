import { React, useState } from "react";
import LeftSideBar from "../../components/LeftSidebar/LeftSideBar";
import Avtar from "../../components/Avtar/Avtar";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faEdit } from "@fortawesome/free-solid-svg-icons";
import EditForm from "./EditForm";
import ProfileBio from "./ProfileBio";
import UploadImage from "./UploadImage";
import "./Profile.css";

export default function Profile() {
  const { id } = useParams();
  const users = useSelector((state) => state.usersReducer);
  const profile = users?.filter((user) => user._id === id)[0];
  const currentUser = useSelector((state) => state.currentUserReducer)?.result;
  const [Edit, setEdit] = useState(false);
  const [Upload, setUpload] = useState(false);
  const [UploadAvtar, setUploadAvtar] = useState(false);

  return (
    <div className="home-container-1">
      <LeftSideBar />
      <div className="home-container-2">
        <section>
          <div className="user-details-container">
            <div className="user-details">
              {profile?.profileImage?.data ? (
                <Avtar px="0px" py="0px">
                  <img
                    src={URL.createObjectURL(profile?.profileImage?.data)}
                    alt="profile Image"
                    width="120px"
                    height="120px"
                  />
                </Avtar>
              ) : (
                <Avtar
                  backgroundColor="purple"
                  px="40px"
                  py="30px"
                  color="white"
                  fontSize="50px"
                >
                  {profile?.name?.charAt(0).toUpperCase()}
                </Avtar>
              )}
              <div className="user-name">
                <h1>{profile?.name}</h1>
                <p>
                  <FontAwesomeIcon icon={faBirthdayCake} />{" "}
                  {moment(profile?.joinedOn).fromNow()}
                </p>
              </div>
            </div>
            {currentUser?._id === id && (
              <ul className="toolList">
                <li>
                  <button
                    type="button"
                    className="edit-profile-btn"
                    onClick={() => {
                      setUploadAvtar(false);
                      setEdit(true);
                      setUpload(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Profile
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="edit-profile-btn"
                    onClick={() => {
                      setUpload(true);
                      setEdit(false);
                      setUploadAvtar(false);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Photo
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="edit-profile-btn"
                    onClick={() => {
                      setUpload(false);
                      setEdit(false);
                      setUploadAvtar(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faEdit} /> Avtar
                  </button>
                </li>
              </ul>
            )}
          </div>
          {Edit ? (
            <EditForm user={currentUser} setEdit={setEdit} />
          ) : (
            <ProfileBio data={profile} />
          )}
          {Upload && <UploadImage setUpload={setUpload} />}
        </section>
      </div>
    </div>
  );
}
