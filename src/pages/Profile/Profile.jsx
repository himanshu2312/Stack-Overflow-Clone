import {React,useState} from 'react'
import LeftSideBar from '../../components/LeftSidebar/LeftSideBar'
import Avtar from '../../components/Avtar/Avtar'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake, faPen } from "@fortawesome/free-solid-svg-icons"
import EditForm from './EditForm'
import ProfileBio from './ProfileBio'
import "./Profile.css"

export default function Profile() {
  const {id}=useParams()
  const users=useSelector((state)=>state.usersReducer);
  const profile=users?.filter((user)=> user._id === id)[0];
  const currentUser=useSelector((state)=>state.currentUserReducer)?.result;
  const [Edit, setEdit] = useState(false);

  return (
    <div className='home-container-1'>
      <LeftSideBar/>
      <div className='home-container-2'>
        <section>
          <div className='user-details-container'>
              <div className="user-details">
                <Avtar backgroundColor='purple' px='40px' py='30px'  color='white' fontSize="50px" >
                  {profile?.name?.charAt(0).toUpperCase()}
                </Avtar>
                <div className="user-name">
                  <h1>{profile?.name}</h1>
                  <p><FontAwesomeIcon icon={faBirthdayCake}/> {moment(currentUser?.joinedOn).fromNow()}</p>
                </div>
              </div>
              {
                currentUser?._id===id &&
                <button type='button' className='edit-profile-btn' onClick={()=>setEdit(true)}>
                  <FontAwesomeIcon icon={faPen}/> Edit Profile
                </button>
              }
          </div>
          <>{ Edit ? <EditForm user={profile} setEdit={setEdit}/> : <ProfileBio data={profile}/> }</>
        </section>
      </div>
    </div>
  )
}
