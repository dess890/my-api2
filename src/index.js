const express = require('express');
const app = express();
const episodes = require('./episodes')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.send('Hello World');
})

//returns just episode id
app.get('/api/v1/episodes/:id', (req, res) => {
    const findEpisodes = episodes.find((episodes) => {
        return episodes.id == req.params.id
    })
    res.send(`<h1>${findEpisodes.name}</h1>`)
})

// returns an array of all episodes
app.get('/api/v1/episodes', (req, res) => {
    const episodesHtmlArray = episodes.map((episodes) => {
        return `<li>${episodes.id}. (${episodes.name})</li>`
    })
    res.send(episodesHtmlArray.join(''))
})

//returns a list of all characters
app.get('/api/v1/characters', (req, res) => {
    const charactersHtmlArray = episodes.map((episodes) => {
        return `<li>${episodes.id}. (${episodes.characters})</li>`
    })
    res.send(charactersHtmlArray).join('');
})

//returns details for 1 episode, including details for characters instead of just ids. 
// If the episode does not exist, return a 404 error with a message
app.get('/api/v1/characters/:id', (req, res) => {
    const findCharactersArray = episodes.map((episodes) => {
        return `<li>${episodes.id}:${episodes.characters}----(${episodes.synopsis})</li>`
    })
    if (findCharactersArray) {
        res.json(findCharactersArray)
    } else {
        res.status(404)
        res.json({ error: 'Not Found' })
    }
})



//port listening
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on ${port}.....`)
});