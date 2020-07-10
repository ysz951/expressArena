const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
//   console.log('The root path was called');
  res.send('Hello Express!');
});

app.get('/sum', (req, res) => {
    const {a, b} = req.query;
    if(!a) {
      return res
            .status(400)
            .send('a is required');
    }
  
    if(!b) {
      return res
            .status(400)
            .send('b is required');
    }
    const numA = parseInt(a), numB = parseInt(b);
    if(Number.isNaN(numA)) {
      return res
            .status(400)
            .send('a must be a number');
    }
  
    if(Number.isNaN(numB)) {
      return res
            .status(400)
            .send('b must be a number');
    }
    const c = (numA + numB).toString();
    const responseString = `The sum of ${a} and ${b} is ${c}`;
    res
    .status(200)
    .send(responseString);
});

app.get('/cipher', (req, res) => {
    const {text, shift} = req.query;
    if(!text) {
      return res
            .status(400)
            .send('text is required');
    }
  
    if(!shift) {
      return res
            .status(400)
            .send('shift is required');
    }
    const shiftNum = parseInt(shift);

    if(Number.isNaN(shiftNum)) {
      return res
            .status(400)
            .send('shift must be a number');
    }

    let newTest = "";
    const isAlpha = function(ch){
      return /^[A-Za-z]{1,1}$/.test(ch);
    }
    // text.split('').forEach(alpha => {
    //   if (!(isAlpha(alpha))) {
    //     return res
    //           .status(400)
    //           .send('input should only contain letters');
    //   }
    //   let shiftCode = alpha === alpha.toUpperCase() ? 'A'.charCodeAt(0) + (alpha.charCodeAt(0) - 'A'.charCodeAt(0) + shiftNum) % 26 : 'a'.charCodeAt(0) + (alpha.charCodeAt(0) - 'a'.charCodeAt(0) + shiftNum) % 26;
    //   newTest += String.fromCharCode(shiftCode);
    // })
    for (let alpha of text){
        if (!(isAlpha(alpha))) {
          return res
                .status(400)
                .send('input should only contain letters');
        }
        let shiftCode = alpha === alpha.toUpperCase() ? 'A'.charCodeAt(0) + (alpha.charCodeAt(0) - 'A'.charCodeAt(0) + shiftNum) % 26 : 'a'.charCodeAt(0) + (alpha.charCodeAt(0) - 'a'.charCodeAt(0) + shiftNum) % 26;
        newTest += String.fromCharCode(shiftCode);
    }
    res
    .status(200)
    .send(newTest)
});

app.get('/lotto', (req, res) => {
    const {arr} = req.query;
    if(!arr) {
      return res
            .status(400)
            .send('arr is required');
    }
    if(!Array.isArray(arr)) {
      return res
            .status(400)
            .send("arr must be an array");
    }
    if (arr.length != 6){
      return res
            .status(400)
            .send("arr must contain 6 integers between 1 and 20");
    }
    const arrSet = new Set();
    arr.forEach(num => {
      let n = parseInt(num);
      if (!Number.isNaN(n) && n >= 1 && n <= 20){
        arrSet.add(n)
      }     
    });
    if (arrSet.size != 6){
      return res
      .status(400)
      .send("arr must contain 6 integers between 1 and 20");
    }
    const testSet = new Set();
    while (testSet.size < arrSet.size) testSet.add(Math.floor(Math.random() * 20) + 1);
    let resCount = 0;
    for (let item of testSet) arrSet.has(item) ? resCount += 1 : null;
    let r = "";
    if (resCount < 4) r = "Sorry, you lose";
    else if (resCount === 4) r = "Congratulations, you win a free ticket";
    else if (resCount === 5) r = "Congratulations! You win $100!";
    else r = "Wow! Unbelievable! You could have won the mega millions!";
    res
    .status(200)
    .send(r)
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
      Body: ${req.body}
    `;
    res.send(responseText);
});

app.get('/greetings', (req, res) => {
    //1. get values from the request
    const name = req.query.name;
    const race = req.query.race;
    
    //2. validate the values
    if(!name) {
      //3. name was not provided
      return res.status(400).send('Please provide a name');
    }
  
    if(!race) {
      //3. race was not provided
      return res.status(400).send('Please provide a race');
    }
  
    //4. and 5. both name and race are valid so do the processing.
    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;
  
    //6. send the response 
    res.send(greeting);
  });

app.get('/queryViewer', (req, res) => {
    console.log(req.query);
    res.end()
});

app.get('/user/:id', function (req, res) {
    res.send('user ' + req.params.id)
  })

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheese burgers!');
})

app.get('/pizza/pepperoni', (req, res) => {
    res.send('We have juicy cheese burgers!');
})

app.get('/pizza/pineapple', (req, res) => {
    res.send(`We don't serve that here. Never call again!`);
})

app.get('/hello', (req, res) => {
  res
    .status(204)
    .end();
});

app.get('/video', (req, res) => {
  const video = {
    title: 'Cats falling over',
    description: '15 minutes of hilarious fun as cats fall over',
    length: '15.40'
  }
  res.json(video);
});
app.get('/colors', (req, res) => {
  const colors = [
    {
      name: "red",
      rgb: "FF0000"
    },
    {
      name: "green",
      rgb: "00FF00"
    },
    {
      name: "blue",
      rgb: "0000FF"
    },
  ];
  res.json(colors);
});

app.get('/grade', (req, res) => {
  // get the mark from the query
  const { mark } = req.query;

  // do some validation
  if (!mark) {
    // mark is required
    return res
      .status(400)
      .send('Please provide a mark');
  }

  const numericMark = parseFloat(mark);
  if (Number.isNaN(numericMark)) {
    // mark must be a number
    return res
      .status(400)
      .send('Mark must be a numeric value');
  }

  if (numericMark < 0 || numericMark > 100) {
    // mark must be in range 0 to 100
    return res
      .status(400)
      .send('Mark must be in range 0 to 100');
  }

  if (numericMark >= 90) {
    return res.send('A');
  }

  if (numericMark >= 80) {
    return res.send('B');
  }

  if (numericMark >= 70) {
    return res.send('C');
  }

  res.send('F');
});


app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');
});