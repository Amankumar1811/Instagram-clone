import React,{useEffect,useState,useContext } from 'react'
import {UserContext} from '../../App'

const Profile=() =>{
    const [mypics,setPics]=useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(() => {
        fetch("/mypost", {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("jwt"),
          },
        })
          .then(res => res.json())
          .then(result=> {
            console.log(result)
            setPics(result.myposts);
          });
      }, []);


    return(
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
                <h4>{ state? state.name:"loading" }</h4>
                <h4>{ state? state.email:"loading" }</h4>
                <div style={{display:"flex",
                justifyContent:"space-between",
                width:"108%",}}>
                    <h6>{mypics.length}posts</h6> 
                    <h6>40 following</h6>
                    <h6>40 followers</h6>
                </div>
                </div>
            </div>
            <div className="gallery">
        {mypics&& mypics.map(item => {
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
  );
};

export default Profile;