const Artwork = require('./models/artwork.js');
var mongoose = require('mongoose');

//MongoDB Connection
const dbURI = "mongodb+srv://rayray33:pokerchamp@nodetuts.ilwsd.mongodb.net/note-tuts?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
        .then((result) => app.listen(port, function(){
                                console.log("Listening at port " + port)
                          }))
        .catch((err) => console.log(err))

var artworks = [

  new Artwork({
  imagePath: 'files/SalvadorDali/The Persistence of Memory.jpg',
  title: 'The Persistence of Memory - Salvador Dali',
  itemNumber: '1',
  description: 'The Persistence of Memory is a 1931 painting by artist Salvador Dalí and one of the most recognizable works of Surrealism.',
  price: '₱30,450.00'
  }),

  new Artwork({
  imagePath: 'files/IvanSeal/the old bends a painful weapon.jpg',
  title: 'The Old Bends a Paingul Weapon - Ivan Seal',
  itemNumber: '2',
  description: 'The Old Bends a Paingul Weapon made by Ivan Seal who was born in Stockport, England and lives and works in Berlin.',
  price: '₱25,020.00'
  }),

  new Artwork({
  imagePath: 'files/TedGeisel/Firebird.jpg',
  title: 'Firebird - Ted Geisel',
  itemNumber: '3',
  description: 'Freebird, a long sold-out limited edition, depicts a yellow Seussian bird, sailing contentedly midst waves rolling against a rosy sky, his incredibly long tail floating high above him.',
  price: '₱27,350.00'
  }),

  new Artwork({
  imagePath: 'files/SalvadorDali/Homage to Erik Satie.jpg',
  title: 'Homage to Erik Satie - Salvador Dali',
  itemNumber: '4',
  description: 'Homage to Erik Satie was created in c.1926 by Salvador Dali in Cubism style.',
  price: '₱10,175.00'
  }),

  new Artwork({
  imagePath: 'files/IvanSeal/the comfort under another total joke.jpg',
  title: 'The Comfort Under Another Total Joke - Ivan Seal',
  itemNumber: '5',
  description: 'the comfort under another total joke made by Ivan Seal who was born in Stockport, England and lives and works in Berlin.',
  price: '₱40,575.00'
  }),

  new Artwork({
  imagePath: 'files/TedGeisel/The Rather Odd Myopic Woman.jpg',
  title: 'The Rather Odd Myopic Woman - Ted Geisel',
  itemNumber: '6',
  description: 'Dr. Seuss was keenly aware of the many cultural and artistic movements which took shape throughout his career. In fact, his hometown of Springfield, Massachusetts hosted one of this country’s first surrealist exhibitions, which no doubt had a lifelong impact on Seuss. Myopic Woman is unmistakably Seuss, but at the same time is a nod and a wink to cubists Picasso and Braque, as well as surrealists Miro, Magritte, and Dali.',
  price: '₱55,778.00'
  }),
];

var done = 0;
for (var i=0; i < artworks.length; i++){
  artworks[i].save(function (err, result){
    dont++;
    if (done == artworks.length){
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
