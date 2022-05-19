import { useEffect, useRef } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'

  const loadScript = (src) =>
  new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const script = document.createElement('script')
    script.src = src
    script.onload = () => resolve()
    script.onerror = (err) => reject(err)
    document.body.appendChild(script)
  })

const GoogleAuth = ({user, setUser}) => {

  const history = useNavigate()

  const googleButton = useRef(null);

  useEffect(() => {
    const src = 'https://accounts.google.com/gsi/client'
    const id = ""

    loadScript(src)
      .then(() => {
        /*global google*/
        console.log(google)
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        })
        google.accounts.id.renderButton(
          googleButton.current, 
          { theme: 'outline', size: 'large' } 
        )
      })
      .catch(console.error)

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`)
      if (scriptTag) document.body.removeChild(scriptTag)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function parseJwt (token) {
   var base64Url = token.split('.')[1];
   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

  function handleCredentialResponse(response) {
    const userData = (parseJwt(response.credential))
    console.log(userData);
    const User = { result : { name: userData.name, email: userData.email, image: userData.picture}}
    console.log("google user",User)
    userData && history("/")
    
    const postData = {name: userData.name, email: userData.email, image: userData.picture}
    axios.post('http://localhost:5000/users/google', postData)
    .then(res => {
      localStorage.setItem("user", JSON.stringify(res.data))
      console.log("axios gog", res.data)})
  }
console.log("user ", user)


  return (
    <div ref={googleButton}
    style={{
        display: 'flex',
        justifyContent: 'end',
        width: "95%",
        margin: "0 auto",
    }}
    >
    </div>
  )
}

export default GoogleAuth