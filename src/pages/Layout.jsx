import { Outlet } from "react-router-dom";

const Layout = () => {

  // Check if onboarding is complete, ideally this would just be the email verification

  if (window.location.pathname != "/login" && window.location.pathname != "/register" && window.location.pathname != "/" && window.location.pathname != "/onboarding/" && window.location.pathname != "/onboarding") {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      
      if (!data.username || !data.emailVerified) {
        window.location.href = `${process.env.REACT_APP_WEB_URL}/onboarding`
      }
    }
  }
  xhttp.open("GET", `${process.env.REACT_APP_API_URL}/users/data?uid=${localStorage.getItem("token")}`);
  xhttp.send();
}



  return (
    <>

 

      <Outlet />
    </>
  )
};

export default Layout;