import './App.css'
import { GoogleLogin } from '@react-oauth/google';


function App() {
  return (
    <>
      <div className='text-5xl text-center bg-green-400 '>Coinnect</div>
      <GoogleLogin onSuccess={credentialResponse => {
        console.log(credentialResponse);
      }}
      onError={() => {
        console.log('Login Failed');
      }}
/>
    </>
  )
}

export default App
