import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link ,useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import M from "materialize-css/dist/js/materialize.min.js"

const NavBar = ()=>{

    const  searchModal = useRef(null)
     
   let dropdownContent = document.querySelectorAll(".dropdownContent");
    const [search,setSearch] = useState('')
    const [userDetails,setUserDetails] = useState([])
     const {state,dispatch} = useContext(UserContext)
     const history = useHistory()
     useEffect(()=>{
         M.Modal.init(searchModal.current)
     },[])
     useEffect(() => {
  let sidenav = document.querySelector('.sidenav');
         M.Sidenav.init(dropdownContent)
       }, []);


function clickt() {
   let sidenav = document.querySelector('.sidenav');
 M.Sidenav.init(dropdownContent, {});

}

     const renderList = ()=>{
       if(state){

           return [

<div className="navb">

<a onClick={clickt()} href="#!" className="sidenav-trigger dropdown-trigger " data-target="dropdown1">
<i className="material-icons brand-logo ">Inst®o</i>
  </a>









      <ul style={{paddingLeft: "100px", transform: "translateX(-105%)" }}className="dropdownContent" id="dropdown1">

       <li><Link to={state?"/":"/signin"} href="#!" style={{paddingLeft:"10px"}}><i class="material-icons">crop_landscape</i></Link></li>
       <li><Link to="/myfollowingpost" href="#!" style={{paddingLeft:"10px"}}><i class="material-icons">accessibility</i></Link></li>
       <li class="divider" tabindex="-1"></li>
       <li><a href="#!" data-target="modal1" className="modal-trigger"style={{paddingLeft:"10px"}} ><i class="material-icons">search</i></a></li>
       <li><Link to="/create" href="#!" style={{paddingLeft:"10px"}}><i class="material-icons" >add_circle</i></Link></li>
       <li><Link to="/profile" href="#!" style={{paddingLeft:"10px"}}><i class="material-icons">account_circle</i></Link></li>
       <div className="sidebar" style={{paddingTop: "50px"}}>
       // <li><a href="#!">one</a></li>
       // <li><a href="#!">two</a></li>
       // <li><a href="#!">three</a></li>
       // <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
       // <li><a href="#!"><i class="material-icons">account_circle</i>five</a></li>
       // </div>
     </ul>

  // </div>

//  <li style={{paddingLeft:"10px"}} key="2"><Link to="/profile">Profile</Link></li>
//               <li key="3"><Link to="/create">Post</Link></li>
//               <li key="4"><Link to="/myfollowingpost">Followers</Link></li>









// <div>
//              <nav className="nav-extended" key="">
//               <div className="nav-wrapper" style={{minHeight:"0px !important"}} >
//               <a href="#" className="sidenav-trigger" data-target="mobile-nav">
//                        <i className="material-icons">menu</i>
//                      </a>
//               <Link to={state?"/":"/signin"}  data-target="mobile-demo" className="sidenav-trigger"><i style={{paddingLeft:"10px"}} className="material-icons brand-logo logos">Insta®o</i></Link>
//
//               <li style={{paddingLeft:"40px"}} key="1"><i  data-target="modal1" className="large material-icons modal-trigger" style={{color:"black", float: "right"}}>search</i></li>
//
//
//               <li style={{paddingLeft:"10px"}} key="2"><Link to="/profile">Profile</Link></li>
//               <li key="3"><Link to="/create">Post</Link></li>
//               <li key="4"><Link to="/myfollowingpost">Followers</Link></li>
//               <li key="5"> </li>
//   </div>
//
//
//            </nav>
//              <ul className="sidenav blue-grey darken-4" id="mobile-nav">
//             <li><a href="#item1">Item 1</a></li>
//             <li><a href="#item2">Item 2</a></li>
//             <li><a href="#item3">Item 3</a></li>
//            </ul>
// </div>





           ]


       }else{
         return [
           <div className="nav-wrapper" key="">

          <Link to={state?"/":"/signin"}  data-target="mobile-demo" className="sidenav-trigger"><i style={{paddingLeft:"10px"}} className="material-icons brand-logo logos">Insta®o</i></Link>

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
        <nav className="nav-extended transparent"  >
        <div className="nav-wrapper " >
          <Link to={state?"/":"/signin"} className="brand-logo logos"
          style={{
            right: "16px",
            background: "#e00",
borderTopRightRadius: 5, borderTopLeftRadius: 1,
             top: "-6rem",
              position: "absolute",
              left: ".8rem",
              width: "12REM",
              height: "12rem",
              borderRadius: "33%",
              pointerEvents: "none",
              opacity: "100%"
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
                 }}><li className="collection-item">{item.name}</li></Link>
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
