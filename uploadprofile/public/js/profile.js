const profile = document.getElementById('profile-id');
document.addEventListener('DOMContentLoaded',getdata)

async function getdata(){
    const userprofile = await fetch('/userinfo');
    const userresponse = await userprofile.json();
    userresponse.forEach((user)=>{
        if(user.imageUrl){
            const divele = document.createElement('div')
            divele.className = 'userimage'
            const image = document.createElement('img')
            image.src = user.imageUrl
            image.className = 'image'
            image.width = 100
            image.height = 100
            divele.appendChild(image)
            profile.appendChild(divele)
        }
        if(user.name){
            const divele = document.createElement('div')
            divele.className = 'username'
            const label = document.createElement('label')
            label.innerText = "Name"
            const nameele = document.createElement('div')
            nameele.innerText = user.name
            divele.appendChild(label)
            divele.appendChild(nameele)
            profile.appendChild(divele)
        }
        if(user.email){
            const divele = document.createElement('div')
            divele.className = 'usermail'
            const label = document.createElement('label')
            label.innerText = "Email"
            const nameele = document.createElement('div')
            nameele.innerText = user.email
            divele.appendChild(label)
            divele.appendChild(nameele)
            profile.appendChild(divele)
        }
    });
};