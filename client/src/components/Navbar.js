import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from 'materialize-css'
const NavBar = ()=>{
    const  searchModal = useRef(null)
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
     const {state,dispatch} = useContext(UserContext)
     const history = useHistory()
     useEffect(()=>{
         M.Modal.init(searchModal.current)
     },[])
     const renderList = ()=>{
       if(state){
           return [


             <nav className="nav-extended" key="">
              <div className="nav-wrapper" >

              <a href="/" data-target="mobile-demo" className="sidenav-trigger"><i style={{paddingLeft:"10px"}} className="material-icons brand-logo logos">Insta®o</i></a>

              <li style={{paddingLeft:"40px"}} key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black", float: "right"}}>search</i></li>


              <li style={{paddingLeft:"10px"}} key="2"><Link to="/profile">Profile</Link></li>
              <li key="3"><Link to="/create">Post</Link></li>
              <li key="4"><Link to="/myfollowingpost">Followers</Link></li>
              <li key="5"> </li>
  </div>

           </nav>



           ]
       }else{
         return [
           <div className="nav-wrapper" >

           <a href="/" data-target="mobile-demo" className="sidenav-trigger"><i style={{paddingLeft:"10px"}} className="material-icons brand-logo logos">Insta®o</i></a>

          <li style={{paddingLeft: "80px"}} key="6"><Link to="/signin">Signin</Link></li>,
          <li  key="7"><Link to="/signup">Signup</Link></li>
         </div>
         ]
       }
     }


     const fetchUsers = (query)=>{
        setSearch(query)
        fetch('/search-users',{
          method:"post",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify({
            query
          })
        }).then(res=>res.json())
        .then(results=>{
          setUserDetails(results.user)
          console.log(results.user)
        })
     }
    return(
        <nav className="nav-extended ">
        <div className="nav-wrapper white" >
          <Link to={state?"/":"/signin"} className="brand-logo logos"
          style={{
            right: "16px",
            background: "#e00",
borderTopRightRadius: 5, borderTopLeftRadius: 6,
             top: "-8rem",
              position: "absolute",
              left: ".8rem",
              width: "12REM",
              height: "15rem",
              borderRadius: "33%",
              pointerEvents: "none",
}}
          >Inst®o</Link>
          <ul id="nav-mobile" className="right" >
             {renderList()}

          </ul>
        </div>
        <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
          <div className="modal-content">
          <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)}
            onClick={(e)=>fetchUsers(e.target.value)}
            />
             <ul className="collection">
               {userDetails.map(item=>{
                 return <Link to={item._id !== state._id ? "/profile/"+item._id:'/profile'} onClick={()=>{
                   M.Modal.getInstance(searchModal.current).close()
                   setSearch('')
                 }}><li className="collection-item">{item.email}</li></Link>
               })}

              </ul>
          </div>
          <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch('')}>close</button>
          </div>
        </div>
      </nav>
    )
}


export default NavBar
