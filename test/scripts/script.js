const formSelectCharacter = document.querySelector('.formSelectCharacter');
const selectCharacter = document.querySelector('#selectCharacter');
const submitButton = document.querySelector('#submitButton');
const divLinksCharacters = document.querySelector('.divLinksCharacters')

fetch('https://narutodb.xyz/api/character?page=1&limit=1431')
    .then(response => response.json())
    .then(data => {
        // Remplir la liste déroulante avec les noms de personnages
        data.characters.forEach(character => {
            selectCharacter.innerHTML += '<option value="' + character.id + '">' + character.name + '</option>';
        });

        async function linker (params) {
            // Obtenir le personnage sélectionné
            let characterSelected = params;

            // Initialiser le tableau des liens entre personnages
            let characterLinks = {};

            // Parcourir tous les personnages
            for (const character of data.characters) {
                // Vérifier les relations familiales
                for (const cle in character.family) {
                    if (character.family.hasOwnProperty(cle) && character.family[cle] == characterSelected.name) {
                        characterLinks[character.name] = (characterLinks[character.name] || 0) + 1;
                    }
                }

                // Vérifier le clan
                if (character.personal && character.personal.clan) {
                    if (Array.isArray(character.personal.clan)) {
                        // Si c'est un tableau (peut avoir plusieurs clans)
                        character.personal.clan.forEach(comparateClan => {
                            if (comparateClan == characterSelected.personal.clan) {
                                characterLinks[character.name] = (characterLinks[character.name] || 0) + 1;
                            }
                        });
                    } else if (character.personal.clan == characterSelected.personal.clan) {
                        // S'il n'y a qu'un seul clan
                        characterLinks[character.name] = (characterLinks[character.name] || 0) + 1;
                    }
                }
            }

            // Vérifier l'équipe
            await Promise.all(characterSelected.personal.team.map(async (element) => {
                const response = await fetch('https://narutodb.xyz/api/team/search?name=' + element);
                const data = await response.json();
            
                data.characters.forEach((character) => {
                    characterLinks[character.name] = (characterLinks[character.name] || 0) + 1;
                });

            // Triez le tableau par ordre décroissant
            const characterEntries = Object.entries(characterLinks);
            characterEntries.sort((a, b) => b[1] - a[1]);
            characterLinks = Object.fromEntries(characterEntries);    
                
            }));

            
            console.log(characterLinks);

            // Afficher les liens entre personnages
            for (const characterLink in characterLinks) {
                console.log(`${characterLink} : ${characterLinks[characterLink]}`);

                const divCharacter = document.createElement('div');
                divCharacter.id = `${characterLink}`;
                // divCharacter.textContent = characterLink;
                let divHeigh = (characterLinks[characterLink]*2.5)+5;
                divCharacter.style.height = divHeigh + "vh";

                divLinksCharacters.appendChild(divCharacter);

                const nameCharacter = document.createElement('p');
                nameCharacter.textContent = characterLink;

                divCharacter.appendChild(nameCharacter);

                console.log(data.characters.name[characterLink]);
                // const imgCharacter = document.createElement('img')
                // imgCharacter.src = data.characters.name[characterLink].images[0]

                // divCharacter.appendChild(imgCharacter)
            }
        }

        submitButton.addEventListener('click', async () => {
            linker(data.characters[selectCharacter.value]);          
        });
    });
