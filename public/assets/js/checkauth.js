function getGAuth(auth2){
    if(auth2.isSignedIn.Mb)
        return auth2.currentUser.Mb.vc.id_token
    else
        return false;
}

async function getAuth(){
    if(gapi){
        var auth2 = await gapi.auth2.getAuthInstance();
        //console.log("check",getGAuth(auth2))
        if(getGAuth(auth2)){
            console.log("re")
            return getGAuth(auth2)
        }
        else if(getSAuth()){
            console.log("rex")
            return getSAuth();
        }
        else{
            console.log("rexa")
            return false;
        }
    }
    else
        return false;
}

function getSAuth(){
    if(sessionStorage.getItem("sf-token"))
        return sessionStorage.getItem("sf-token")
    else if(localStorage.getItem("sf-token"))
        return localStorage.getItem("sf-token")
    else
        return false;
}

function checkAuth(){
    console.log(getAuth())
}