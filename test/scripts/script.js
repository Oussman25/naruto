// let perso = prompt()
const formSelectCharacter = document.querySelector('.formSelectCharacter')
const selectCharacter = document.querySelector('#selectCharacter')
const submitButton = document.querySelector('#submitButton')

fetch('https://narutodb.xyz/api/character?page=1&limit=1431')
    .then(response => response.json())
    .then(data => {
        data.characters.forEach(character => {
            selectCharacter.innerHTML += '<option value="'+character.id+'">'+character.name+'</option>';
        });         
        submitButton.addEventListener('click', () => {
            let characterSelected = data.characters[selectCharacter.value]
            console.log(characterSelected);
            let characterLink = {};
            data.characters.forEach(character => {
                // console.log(character.family);
                // for (let i = 0; i < character.family.length; i++) {
                //     if (element == characterSelected) {
                //         console.log(element);
                //     }    
                // }
                // Boucle for...in pour parcourir les éléments
                

                for (const cle in character.family) {
                    // Vérifier si la clé est propre à l'objet (et non héritée)
                    if (character.family.hasOwnProperty(cle)) {
                        
                        if (character.family[cle] == characterSelected.name) {
                            console.log(character);  
                            characterLink[character.name] += 3
                        }                                 
                    }
                }

                if (character.personal.clan == characterSelected.personal.clan) {
                    if (!characterLink[character.name]) {
                        characterLink[character.name] = 3; // Si la clé n'existe pas encore, initialiser à 3
                    } else {
                        characterLink[character.name] += 3; // Si la clé existe, ajouter 3 points
                    }
                }
                
                   
                // character.family.forEach(element => {
                //     if (element == characterSelected) {
                //         console.log(element);
                //     }
                // });
            });  
            console.log(characterLink); 
    });
});

// fetch('https://narutodb.xyz/api/team?page=1&limit=191')
//     .then(response => response.json())
//     .then(data => {
//             console.log(data);
//     });   
