import React,{useEffect,useState,useContext } from 'react'
import {UserContext} from '../../App'
import {useParams} from 'react-router-dom'

const Profile=() =>{
    const [userProfile,setProfile]=useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid}=useParams()
    console.log(userid)
    useEffect(() => {
        fetch(`/user/${userid}`, {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt"),
          },
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setProfile(result)
           
          });
      }, []);

      const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
          console.log(data)
        
         /*   dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
             setShowFollow(false)*/
        })
    }



    return(
      <>
      {userProfile ?
      <div style={{maxwidth:"550px",margin:"0px auto"}}> 
      <div style={{
          
          display:"flex",
          justifyContent:"space-around",
          margin:"18px 0px",
          borderBottom:"1px solid grey"
      }}>
          
          <div> 
              
              <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
              src="https://cdn.vox-cdn.com/thumbor/Z9PJaDx8eMWMXKvSK1HLBlc4b1E=/0x0:1853x3000/1200x800/filters:focal(855x415:1151x711)/cdn.vox-cdn.com/uploads/chorus_image/image/69731297/106742083.0.jpg"
              />
          </div>
          <div>
          <h4>{userProfile.user.name}</h4>
          <h5>{userProfile.user.email}</h5>
          <div style={{display:"flex",
          justifyContent:"space-between",
          width:"108%",}}>
              <h6>{userProfile.posts.length}posts</h6> 
              <h6>{userProfile.follower.length} followers</h6>
              <h6>{userProfile.folowing.length}following</h6>
          </div>
          <button style={{
                       margin:"10px"
                   }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>followUser()}
                    >
                        Follow
                    </button>




          </div>
      </div>
      <div className="gallery">
  { userProfile.posts.map((item) => {
    return (
      <img
        key={item._id}
        className="item"
        src={item.photo}
        alt={item.title}

      />
    );
  })}
</div>
</div>
      : <h2>loading...!!</h2>}
        
    </>
  );
};

export default Profile;
