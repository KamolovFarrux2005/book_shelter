let formEl = document.getElementById("formEl")
let nameIn = document.getElementById("nameIn");
let password = document.getElementById("passwordIn");






formEl.addEventListener('submit', (e)=>{
    e.preventDefault()

    let user = {
        email:nameIn.value,
        password:password.value
    }

    
    try {
        log(user)
    } catch (err) {
        alert(err)
        console.log(err.message);
    }

})




async function log(user){
    let options = {
        method:'POST',
        body:JSON.stringify(user),
        headers:{
            "Content-type":'application/json'
        }
    }
    let login = await fetch('https://reqres.in/api/login', options)

    if(login.status > 300){
        alert(err)
        return false
    }

    else{
        login = await login.json()
        window.localStorage.setItem('TokenId', login.token)
        window.location.replace('index.html')
    }
}