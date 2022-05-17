import { useEffect, useRef } from 'react'

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
    setUser({...user, name: userData.name, email: userData.email, image: userData.picture})    
  }
console.log("user ", user)
//   const data = {{
  // {name: userData.given_name, email: userData.email, image: userData.picture}
//     "iss": "https://accounts.google.com",
//     "nbf": 1652799404,
//     "aud": "508452009550-ph4gq5i63fjlkgafrvi5dg064p5h3e78.apps.googleusercontent.com",
//     "sub": "114330761752991825331",
//     "email": "villescollins@gmail.com",
//     "email_verified": true,
//     "azp": "508452009550-ph4gq5i63fjlkgafrvi5dg064p5h3e78.apps.googleusercontent.com",
//     "name": "Collins Villes",
//     "picture": "https://lh3.googleusercontent.com/a/AATXAJze1UfhzQwTeQtK9jhX5Vxiy9MTpoQmmoP5wONV=s96-c",
//     "given_name": "Collins",
//     "family_name": "Villes",
//     "iat": 1652799704,
//     "exp": 1652803304,
//     "jti": "5bbe3b6848abc5b024935ff2f7f0265546ba6da2"
// }}

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