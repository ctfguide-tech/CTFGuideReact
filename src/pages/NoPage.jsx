import { Link , useNavigate } from "react-router-dom";


const NoPage = () => {  

  const navigate = useNavigate();



  function goBack() {
    navigate(-1)
  }


  return (
    <>
      <h1 style={{fontFamily: 'Space Grotesk, sans-serif'}} className="mx-auto text-center text-white text-5xl mt-20"> 404 Error </h1>
      <p style={{fontFamily: 'Space Grotesk, sans-serif'}} className="mx-auto text-center text-white text-2xl w-1/2 mt-3">Looks like you've found a broken link or you're trying to access content that isn't ready for the public yet.</p>
      <div style={{fontFamily: 'Space Grotesk, sans-serif'}} className="mx-auto text-center mt-10">
        <Link to={"/"} className="text-white text-2xl hover:underline"> 🌎 Go back to the homepage</Link>
        <br></br>
        <a onClick={goBack} style={{cursor: 'pointer'}} className="hover:underline text-white text-2xl">  
🚀 Go back to the last page you were on</a>

<br></br>
<a href="https://status.ctfguide.com" style={{fontFamily: 'Space Grotesk, sans-serif'}} className="hover:underline mx-auto text-center text-white text-2xl w-1/2 mt-3"> 📶 Check CTFGuide Status</a>

    </div>



    </>
  )
  };
  
export default NoPage;