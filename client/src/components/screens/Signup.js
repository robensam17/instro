import React,{useState,useEffect} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
const SignIn  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [url,setUrl] = useState(undefined)
    useEffect(()=>{
        if(url){

            uploadFields()
        }   M.toast({html: "<h5>Welcome to Inst®o.</h5> ",inDuration: "3000",displayLength: "3000",classes:"#c62828 blue -10",
        completeCallback: function(){M.toast({html: " <p>1- Sign up. </p>",inDuration: "5000",displayLength: "3000",classes:"#c62828 blue -10",
        completeCallback: function(){M.toast({html: " <p>2- Post your best pic. </p>",inDuration: "5000",displayLength: "3000",classes:"#c62828 blue -10",
        completeCallback: function(){M.toast({html: " <p>3- Give a ❤️ to the pic you love. </p>",inDuration: "5000",displayLength: "3000",classes:"#c62828 blue -10",
        completeCallback: function(){M.toast({html: "<p>4- Pic with the most love on top. For all to see! </p>",inDuration: "5000",displayLength: "3000",classes:"#c62828 blue -10"})}})}})}
      })}

      })
        // M.toast({html: " <p>1- Sign up. </p>",inDuration: "4000",displayLength: "5000",classes:"#c62828 blue -10"})
        // M.toast({html: "<p>2- Post your best pic. </p>",inDuration: "8000",displayLength: "6000",classes:"#c62828 blue -10"})
        // M.toast({html: "<p> 3- Give a heart to the pic you love. </p>",inDuration: "12000",displayLength: "7000",classes:"#c62828 blue -10"})
        // M.toast({html: "<p>4- Pic with the most love on top. For all to see </p>",inDuration: "16000",displayLength: "8000",classes:"#c62828 blue -10"})

    },[url])
    const uploadPic = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","new-insta")
        data.append("cloud_name","delppbqzy")
        fetch("https://api.cloudinary.com/v1_1/delppbqzy/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const uploadFields = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
    const PostData = ()=>{
        if(image){
            uploadPic()
        }else{
            uploadFields()
        }

    }

   return (
      <div className="mycard">
          <div className="card auth-card input-field">
            <h2>Inst®o</h2>
            <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPasword(e.target.value)}
            />
            <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload pic</span>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>PostData()}
            >
                SignUP
            </button>
            <h5>
                <Link to="/signin">Already have an account ?</Link>
            </h5>





        </div>
      </div>
   )
}


export default SignIn
