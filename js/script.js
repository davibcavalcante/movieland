const formContainer = document.querySelector('.container-form')
const nameInput = document.querySelector('#name')
const typeSelect = document.querySelector('#type')
const form = document.querySelector('#form')

const descriptionContainer = document.querySelector('.container-description')
const poster = document.querySelector('#poster')
const director = document.querySelector('.director')
const writer = document.querySelector('.writer')
const actor = document.querySelector('.actors')
const title = document.querySelector('.title')
const plot = document.querySelector('.plot-content')

const trailerBtn = document.querySelector('#trailer-btn')
const homeBtn = document.querySelector('#home-btn')

let sectionErro

form.addEventListener('submit', (e) => {
    e.preventDefault()
    if (nameInput.value.length === 0) return

    const nameSearch = nameInput.value
    const type = typeSelect.value
    conectAPI(nameSearch, type)

    nameInput.focus()
})

async function conectAPI(name, type) {
    const key = 'df8ca2be'

    const request = await fetch (`http://www.omdbapi.com/?apikey=${key}&t=${name}&type=${type}`)
    const convertRequest = await request.json()
    const showScreen = await showOnScreen(convertRequest)
}

function showOnScreen(resp) {
    if (resp.Response === 'False') {
        mensagemErro(resp.Error)
    } else {
        if (sectionErro) {
            sectionErro.classList.add('hide')
            descriptionContainer.classList.remove('hide')
            poster.innerHTML = `<img src="${resp.Poster}">`
            director.innerText = `${resp.Director}`
            writer.innerText = `${resp.Writer}`
            actor.innerText = `${resp.Actors}`
            title.innerText = `${resp.Title}`
            plot.innerText = `${resp.Plot}`
        } else {
            descriptionContainer.classList.remove('hide')
            poster.innerHTML = `<img src="${resp.Poster}">`
            director.innerText = `${resp.Director}`
            writer.innerText = `${resp.Writer}`
            actor.innerText = `${resp.Actors}`
            title.innerText = `${resp.Title}`
            plot.innerText = `${resp.Plot}`
        }
    }
}

function mensagemErro(erro) {
    if (!(descriptionContainer.classList.contains('hide'))) {
        descriptionContainer.classList.add('hide')
    }
    if (sectionErro) {
        sectionErro.classList.remove('hide')
        return
    }
    sectionErro = document.createElement('section')
    const bodyElement = document.querySelector('body')
    sectionErro.classList.add('erro')
    let p = document.createElement('p')
    p.innerText = erro
    sectionErro.appendChild(p)
    bodyElement.appendChild(sectionErro)

    return sectionErro
}

trailerBtn.addEventListener('click', () => {
    window.open(`https://youtube.com/results?search_query=${nameInput.value}`, '_blank')
})
