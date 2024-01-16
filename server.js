const express = require('express')
const app = express();
const port = 3000;

const songs = [
    {
        id: 1,
        title: "Lucid Dreams",
        artist: "Juice Wrld",
        release: 2020,
        genre: "Imo-rap"
    },

    {
        id: 2,
        title: "Diamonds",
        artist: "Wizkid",
        release: 2024,
        genre: "Afrobeat"
    }
]

app.use(express.json());

app.get('/', (req, res) => {
    res.send('hey')
})

// reading.
app.get('/songs', (req, res) => {
    res.json(songs)
})

app.get('/songs/:id', (req, res) => {
    const songId =  parseInt(req.params.id)
    const song = songs.find(song => song.id === songId)
    if (!song){
        res.status(404).send({message: "Song not found"})
    }else {
        res.json(song)
    }
})

// creating.
app.post('/songs', (req, res) => {
    const newSongs = req.body;
    newSongs.id = songs.length + 1;
    songs.push(newSongs)
    res.json(newSongs)
})

// putting.
app.put('/songs/:id', (req, res) => {
    const updateSongs = req.body;
    const  songId = parseInt(req.params.id);
    const index = songs.findIndex(song => song.id === songId);
    if(index !== -1){
        songs.splice(index, 1, updateSongs)
        res.json(updateSongs);
    }else{
        res.status(404).json({message:'not found'})
    }
})

// deleting.
app.delete('/songs/:id', (req, res) => {
    const deleteId = parseInt(req.params.id);
    const search = songs.findIndex(song => song.id === deleteId);
    if (search === -1){
        res.status(404).json('not found');
    }else{
        const deletedSong = songs.splice(search, 1);
        res.json(deletedSong);
    }
})

app.listen(port, () => {
  console.log(`Server is on, and  listening on port ${port}`)
})

