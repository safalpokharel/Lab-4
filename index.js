const express = require('express');
const path = require('path');


const app = express();

// Middleware
app.use(express.json());
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }));

//data 
const images = {
    "labrador": ['labrador1.png', 'labrador2.png', 'labrador3.png'],
    "african": ['african1.png', 'african2.png', 'african3.png'],
    "germanshepherd": ['germanshepherd1.png', 'germanshepherd2.png', 'germanshepherd3.png'],
    "boxer": ['boxer1.png', 'boxer2.png', 'boxer3.png'],
    "pug": ['pug1.png', 'pug2.png', 'pug3.png'],
    "golden_retriever": ['goldenretriever1.png', 'goldenretriever2.png', 'goldenretriever3.png']
};


// functions
// returns random integer between 0 and n, not including n
const randInt = (n) => Math.floor(n * Math.random());

// returns a random item from an array
const getRandomItemFromArray = arr => arr[randInt(arr.length)];

// Routes
app.get('/', (req, res) => {
    res.sendFile('dogs.html', { root: path.join(__dirname, 'public') }, (err) => {
        if (err) console.log(err);
    });
    
});

app.get('/breeds', (req, res) => {
    res.json({ breeds: ["Labrador Retriever", "African", "German Sheperd", "Golden Retriever", "Boxer", "Pug", "Dalmatian", "Yorkshire Terrier"] });
});

app.get('/image/:breed', (req, res) => {
    const breed = req.params.breed
    const breedImagesList = images[breed]

    if (breedImagesList) {
        const imageUrl = getRandomItemFromArray(breedImagesList)
        res.json({"imageUrl" : imageUrl})
    }
    else {
        res.json({})
    }
    
});

// 404 Handler
app.use((req, res, next) => {
    res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} \nhttp://localhost:${PORT}`);
});