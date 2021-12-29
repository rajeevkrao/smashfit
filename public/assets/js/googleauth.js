function onGAuthLoad(){
    gapi.load('auth2', function() {
        gapi.auth2.init().then(()=>{
            var auth2 = gapi.auth2.getAuthInstance();
            console.log(auth2.isSignedIn.Mb)
            if(auth2.isSignedIn.Mb)        
                document.querySelector("div.header-btns a.btn").innerHTML = "Logout"
        });
        
        
        //console.log(auth2)
        
        
        
    });       
} 