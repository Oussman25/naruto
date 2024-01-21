const formSelectCharacter = document.querySelector('.formSelectCharacter');
const selectCharacter = document.querySelector('#selectCharacter');
const submitButton = document.querySelector('#submitButton');

fetch('https://narutodb.xyz/api/character?page=1&limit=1431')
    .then(response => response.json())
    .then(data => {
        // Remplir la liste déroulante avec les noms de personnages
        data.characters.forEach(character => {
            selectCharacter.innerHTML += '<option value="' + character.id + '">' + character.name + '</option>';
        });

        submitButton.addEventListener('click', async () => {
            // Obtenir le personnage sélectionné
            let characterSelected = data.characters.find(character => character.id == selectCharacter.value);

            // Initialiser le tableau des liens entre personnages
            let characterLinks = {};

            // Parcourir tous les personnages
            for (const character of data.characters) {
                // Vérifier les relations familiales
                for (const cle in character.family) {
                    if (character.family.hasOwnProperty(cle) && character.family[cle] == characterSelected.name) {
                        characterLinks[character.name] = (characterLinks[character.name] || 0) + 3;
                    }
                }

                // Vérifier le clan
                if (character.personal && character.personal.clan) {
                    if (Array.isArray(character.personal.clan)) {
                        // Si c'est un tableau (peut avoir plusieurs clans)
                        character.personal.clan.forEach(comparateClan => {
                            if (comparateClan == characterSelected.personal.clan) {
                                characterLinks[character.name] = (characterLinks[character.name] || 0) + 3;
                            }
                        });
                    } else if (character.personal.clan == characterSelected.personal.clan) {
                        // S'il n'y a qu'un seul clan
                        characterLinks[character.name] = (characterLinks[character.name] || 0) + 3;
                    }
                }

                // Vérifier l'équipe
                characterSelected.personal.team.forEach(element => {
                    fetch('https://narutodb.xyz/api/team/search?name=' + element)
                        .then(response => response.json())
                        .then(data => {
                            data.characters.forEach(character => {
                                if (!characterLinks[character.name]) {
                                    characterLinks[character.name] = 3; // Si la clé n'existe pas encore, initialiser à 3
                                } else {
                                    characterLinks[character.name] += 3; // Si la clé existe, ajouter 3 points
                                }
                            });
                        });
                });
            }
            console.log(characterLinks);

            // Afficher les liens entre personnages
            for (const characterLink in characterLinks) {
                console.log(`${characterLink} : ${characterLinks[characterLink]}`);
            }
        });
    });
