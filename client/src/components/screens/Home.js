import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'

const Home  = ()=>{
    const [data,setData] = useState([])
    const {state,dispatch} = useContext(UserContext)


    useEffect(()=>{
       fetch('/allpost',{
           method:"get",
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)

           setData(result.posts)


       })
    },[])

    const likePost = (id, likes)=>{
          fetch('/like',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id,
                  like:likes

              })
          }).then(res=>res.json())
          .then(result=>{

                      console.log(result.likes)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                    console.log(result)
                }else{
                    return item
                      console.log(item)
                }
            })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    const unlikePost = (id)=>{
          fetch('/unlike',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            //   console.log(result)
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result

                }else{
                    return item

                }
            })
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
          fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }

   return (
       <div className="home">
           {
               data.map(item=>{
                   return(

                     <div className="card home-card" key={item._id}>

                            <h4 className="header" style={{padding:"6px", height:"13px"}}>

                            <img alt=""  style={{width:"35px",height:"35px",borderRadius:"100%", border:"1px solid grey",
                             float:"left"}}
                            src={item.postedBy.pic}
                            />{item.postedBy._id == state._id
                            && <i className="material-icons" style={{
                                float:"right"
                            }}
                            onClick={()=>deletePost(item._id)}
                            >delete</i>

                            }
                            <Link style={{padding:"5px" }} className="brand-logo" to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}
                            <h6 style={{marginTop: "0px"}}><small>{item.createdAt}</small></h6></Link> {item.postedBy._id == state._id


                          }</h4>


                            <div style={{paddingTop:"50px"}} className="card-image ">
                                <img alt="" src={item.photo}/>
                           <h1 className="brand-logo card-title big" style={{fontSize: "30px", marginTop: "80px", marginBottom: "0px"}}>{item.title}</h1>
                          <a onClick={()=>{likePost(item._id, item.likes)  }} className="btn-floating halfway-fab waves-effect waves-light red"><i  className="material-icons">favorite</i></a>
                            </div>
                            <div className="card-content">


                            {

                                item.likes.map((record, index)=>{
                                    return(

                                    <p key={index} className="material-icons" style={{color:"red"}}>favorite </p>

                                  )
                                })
                            }



                                <p>{item.body}</p>
                                {
                                    item.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add comment" />

                                </form>

                            </div>
                        </div>
                   )
               })
           }


       </div>
   )
}


export default Home
