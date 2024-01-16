const body = document.body
const selectTeam = document.querySelector('#selectTeam')
const teamCharacters = document.querySelector('.teamCharacters')
const formSelectTeam = document.querySelector('.formSelectTeam')
const submitButton = document.querySelector('#submitButton');
const teamName = document.querySelector('.teamName')
const btnMainPage = document.querySelector('.btnMainPage')
const btnExtra = document.querySelector('.btnExtra')
const mainPage = document.querySelector('.mainPage')
const Extra = document.querySelector('.Extra')
let charactersCards = ""

fetch('https://narutodb.xyz/api/team?page=1&limit=191')
.then(response => response.json())
.then(data => {
    data.teams.forEach(team => {
        selectTeam.innerHTML += '<option value="'+team.id+'">'+team.name+'</option>'
    }); 
}) 


submitButton.addEventListener('click', () => {
    if (selectTeam.value != 0) {
            fetch('https://narutodb.xyz/api/team/'+selectTeam.value)
        .then(response => response.json())
        .then(data => {
            teamName.innerHTML = data.name
            charactersCards = ""
            for (let i = 0; i < data.characters.length; i++) {
                charactersCards += '<div class="character"><img src="'+data.characters[i].images[0]+'" alt=""><p>'+data.characters[i].name+'</p></div><img class="kunai" src="img-naruto/kunai.png" alt="">'   
                console.log(data.characters[i].images);            
            }
        console.log(charactersCards);
        teamCharacters.innerHTML = charactersCards
        })
    }
}
) 

btnExtra.addEventListener('click', () => {
    Extra.style.display= 'flex'
    mainPage.style.display= 'none'
    btnExtra.style.display= 'none'
    btnMainPage.style.display= 'block'
}
)

btnMainPage.addEventListener('click', () => {
    Extra.style.display= 'none'
    mainPage.style.display= 'flex'
    btnExtra.style.display= 'block'
    btnMainPage.style.display= 'none'
}
)






        // for (let i = 0; i < data.teams.length; i++) {
        //     console.log('----------------'+data.teams[i].name+'-------------------');
        //     for (let j = 0; j < data.teams[i].characters.length; j++) {
        //         console.log(data.teams[i].characters[j].name);
        //     }   
        // }