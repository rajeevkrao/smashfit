//Button Auth
//Changing to Logout Button on Logged in

function onGAuthLoad(){
    
    gapi.load('auth2', function() {
        gapi.auth2.init().then(()=>{
            var auth2 = gapi.auth2.getAuthInstance()
                if(typeof(waitgapi) == "function")
                    setTimeout(waitgapi,500)
                if(auth2.isSignedIn.get())
                    setLogoutButton();
        });
    });   
    if(sessionStorage.getItem("sf-token"))
        setLogoutButton();
    else if(localStorage.getItem("sf-token"))    
        setLogoutButton();

    function setLogoutButton(){   
        document.querySelector("div.header-btns a.btn").innerHTML = "Logout"
        document.querySelector("div.header-btns a.btn").href = "/logout.html"
    }
} 