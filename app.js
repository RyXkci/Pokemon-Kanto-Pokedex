const form = document.querySelector('#pokemonSearch');
const front = document.querySelector('.front');
const main = document.querySelector('.main');
const titleH1 = document.querySelector('.data-container-title');
const imgContainer = document.querySelector('.data-container-img');
const typesContainer = document.querySelector('.types-ul');
const learntMovesContainer = document.querySelector('.learnt-moves-ul');
const taughtMovesContainer = document.querySelector('.taught-moves-ul');
const statsContainer = document.querySelector('.stats-ul');
const spriteContainer = document.querySelector('.sprite-container');

const rightPanel = document.querySelector('.right');
const leftPanel = document.querySelector('.left');

const reset = document.querySelector('.reset-button')




const kantoPokemon = async () => {
    let res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    let data = await res.json()
    return data.results
    
}




    
async function fetchPokemonData(pokemonName) {
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    let data = await res.json()
    let title = `#${data.id} ${data.name}`;
    let imgSrc = `pokemon images/${data.name}.png`
    let types = data.types;
    let moves = data.moves;
    let stats = data.stats
    console.log(data)

        //     LEARNT MOVES FILTER     //
    let learntMoves = moves.filter(move => 
        move.version_group_details.some(filtered => 
            filtered.version_group.name === 'red-blue' && filtered.move_learn_method.name === 'level-up'
        )
    )
   console.log(learntMoves)

    //        MACHINE MOVES FILTER     //
    let taughtMoves = moves.filter(move =>
        move.version_group_details.some(filtered =>
            filtered.version_group.name === 'red-blue' && filtered.move_learn_method.name === 'machine'
        )
    )
    console.log(taughtMoves)

    let sprite = data.sprites.front_default;

    shuffle(learntMoves)
    shuffle(taughtMoves)
    appendData(title, imgSrc, types, learntMoves, taughtMoves, stats, sprite)
    
   
    
}

//   SHUFFLES THE LearntMoves and taughtMoves arrays//

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
}

//      APPENDING TO THE DOCUMENT     ///

function appendData(title, img, type, learntMoves, taughtMoves, stats, sprite) {
    titleH1.innerText = title;
    let pokemonImg = document.createElement('img')
    pokemonImg.classList.add('pokemon-img')
    pokemonImg.src = img
    imgContainer.appendChild(pokemonImg)
    type.forEach(ty => {
        let typeLi = document.createElement('li')
        typeLi.classList.add('li', 'type-li')
        typeLi.innerText = ty.type.name;
        typesContainer.appendChild(typeLi)
    })


    learntMoves
        .slice(0, 4)  //  AFTER THEY ARE SHUFFLED, IT'S SLICED SO ONLY FOUR APPEAR
        .forEach(learntMove => {
        let learntMoveLi = document.createElement('li')
        learntMoveLi.classList.add('li', 'learnt-move-li')
        learntMoveLi.innerText = learntMove.move.name;
        learntMovesContainer.appendChild(learntMoveLi)
    })

    taughtMoves
        .slice(0, 4)
        .forEach(taughtMove => {
            let taughtMoveLi = document.createElement('li')
            taughtMoveLi.classList.add('li', 'taught-move-li')
        taughtMoveLi.innerText = taughtMove.move.name;
        taughtMovesContainer.appendChild(taughtMoveLi)
    })

    stats.forEach(stat => {
        let statLi = document.createElement('li')
        statLi.classList.add('li', 'stat-li')
        statLi.innerText = `${stat.stat.name}: ${stat.base_stat}`
        statsContainer.appendChild(statLi)

    })

    let spriteImg = document.createElement('img')
    spriteImg.classList.add('sprite-img')
    spriteImg.src = sprite
    spriteContainer.appendChild(spriteImg)

    animate()


}

function animate() {
    rightPanel.classList.add('right-animation');
    leftPanel.classList.add('left-animation');
    form.classList.add('pokemon-form-animate')
    setTimeout(() => {
        front.parentElement.removeChild(front)
    }, 1000) 
    
    main.style.height = '100%'; //   FRONT SECTION NEEDS TO BE ELIMINATED AND MAIN SET TO 100% TO CUT OUT LEFT OVER WHITESPACE   //
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userInput = form.elements.pokemon.value;
    console.log(userInput)
    let allPokemon = await kantoPokemon()
    const pokemon = allPokemon.find(pokemonName => pokemonName.name === userInput.toLowerCase())
    if (pokemon) {
        fetchPokemonData(userInput)
    } else (console.log('Type a kanto pokemon'))


})

reset.addEventListener('click', () => {
    titleH1.innerText = ''
    let img = imgContainer.querySelector('img')
    let sprite = spriteContainer.querySelector('img')
    img.parentElement.removeChild(img)
    sprite.parentElement.removeChild(sprite)
    let lis = document.querySelectorAll('.li')
    lis.forEach(li => {
        li.parentElement.removeChild(li)
    })
    rightPanel.classList.remove('right-animation');
    leftPanel.classList.remove('left-animation');
    setTimeout(() => {
        form.classList.remove('pokemon-form-animate')
        form.reset()
    }, 1000)
    
})


 // filteredMoves.forEach(kantoMove => {
    //     kantoMoves.push(kantoMove)
    // })





 // moves.forEach(move => {
    //     move.version_group_details.forEach(mov => {
    //         console.log(mov.version_group.name)
    //         })
    // })


 // console.log(moves)

    // const filteredMoves = moves.filter(move => {
    //     move.version_group_details.forEach(moveFilter => {
    //         if (moveFilter.name === 'red-blue') 
    //     })
    // })

    // appendData(filteredMoves)

    // moves.forEach(move => {
    //     let filteredMoves = []
    //     move.version_group_details.forEach(moveFilter => {
    //         if (moveFilter.version_group.name === 'red-blue') {
    //             filteredMoves.push(move.move.name)
                
    //         }
    //     })
    // }) 
        // const kantoMoves = move.version_group_details.filter(kantoMove => kantoMove.version_group.name === 'red-blue')
        // console.log(kantoMoves)
        // move.version_group_details.forEach(moveFilter => {
        //     // let kantoMoves = moveFilter.filter(moveFilter.version_group.name === 'red-blue')
        //     // console.log(kantoMoves)
        //     console.log(move)
        // })  
        
        // form.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') {
//         const userInput = form.value;
//         fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
//             .then(res => {
//                 return res.json();
//             })
//             .then(kantoPokemon => {
//                 const allPokemon = kantoPokemon.results;
//                 for (pokemon of allPokemon) {
//                     if (pokemon.name === userInput) {
//                         fetch(`https://pokeapi.co/api/v2/pokemon/${userInput}`)
//                             .then(res => {
//                                 return res.json()
//                             })
//                             .then(returnedPokemon => {
//                             console.log(returnedPokemon)
//                         })
//                     }
//                 }
//         })

//     }
// })










