const body = document.body
const selectTeam = document.querySelector('#selectTeam')
const teamCharacters = document.querySelector('.teamCharacters')
const formSelectTeam = document.querySelector('.formSelectTeam')
const submitButton = document.querySelector('#submitButton');
let charactersCards = ""

for (let i = 1; i < 191; i++) {
    fetch('https://narutodb.xyz/api/team/'+i)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        // console.log(data.name);
        selectTeam.innerHTML += '<option value="'+data.id+'">'+data.name+'</option>'

    }) 
}

submitButton.addEventListener('click', () => {
    if (selectTeam.value != 0) {
            fetch('https://narutodb.xyz/api/team/'+selectTeam.value)
        .then(response => response.json())
        .then(data => {
            charactersCards = ""
            for (let i = 0; i < data.characters.length; i++) {
                charactersCards += '<div class="character"><img src="'+data.characters[i].images[0]+'" alt=""><p>'+data.characters[i].name+'</p></div>'   
                console.log(data.characters[i].images);            
            }
        console.log(charactersCards);
        teamCharacters.innerHTML = charactersCards
        })
    }
}
) 




        // for (let i = 0; i < data.teams.length; i++) {
        //     console.log('----------------'+data.teams[i].name+'-------------------');
        //     for (let j = 0; j < data.teams[i].characters.length; j++) {
        //         console.log(data.teams[i].characters[j].name);
        //     }   
        // }