import {React,useState} from 'react'
import { useDispatch } from 'react-redux'
import { updateUserBio } from '../../actions/user.js'

export default function EditForm({user,setEdit}) {
  const [Name, setName] = useState(user.name)
  const [About, setAbout] = useState(user.about)
  const [Tags, setTags] = useState("")
  const dispatch=useDispatch()

  const handleSubmit=(e)=>{
        e.preventDefault(0);
        try{
            if (Tags[0] === "" || Tags.length === 0) {
                  alert("Update tags field");
                } else {
                  dispatch(updateUserBio(user._id, { name:Name, about:About, tags:Tags }));
                }
                setEdit(false);
        }
        catch(e){
            alert(e)
        }
  }

  return (
    <div>
      <h1 className='edit-profile-title'>
            Edit Your Profile
      </h1>
      <h2 className='edit-profile-title-2'>
            Public Information
      </h2>
      <form onSubmit={handleSubmit} className="edit-profile-form">
            <label htmlFor='name'>
                  <h3>Display Name</h3>
                  <input type="text" id="name" value={Name} onChange={(e)=>setName(e.target.value)}/>
            </label>
            <label htmlFor='about'>
                  <h3>About me</h3>
                  <textarea cols="30" rows="10" type="text" id="about" value={About} onChange={(e)=>setAbout(e.target.value)}/>
            </label>
            <label htmlFor='tags'>
                  <h3>Watched tags</h3>
                  <p>Add tags seperated by 1 space</p>
                  <input type="text" id="tags" onChange={(e)=>setTags(e.target.value.split(' '))}/>
            </label><br/>
            <input type="submit" value="Save Profile" className='user-submit-btn'/>
            <button type="button" className='user-cancel-btn' onClick={()=>setEdit(false)}>Cancel</button>
      </form>
    </div>
  )
}
