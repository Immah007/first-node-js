const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle socket.io connections
io.on('connection', (socket) => {
  console.log('a user connected');

  // Handle chat messages
  socket.on('chat message', (msg) => {



    const greetings = ['hello', 'hi', 'hey', 'greetings', 'hola'];
    const additionResponse = ['Thanks for participating in my training', 'How may I help you today?', 'How can I assist you today?', 'Feel free to let me know how I can further assist']
    const apologies = ['I apologise', 'I am sorry', 'My apologies', 'Oops, I apologise']
    const questions = ["who"];
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    const randomadditionResponse = additionResponse[Math.floor(Math.random() * additionResponse.length)];
    const randomApology = apologies[Math.floor(Math.random() * apologies.length)];
    let generatedText = " ";
    
        const lowercaseInput = msg.toLowerCase(); 
        
       
        if (greetings.includes(lowercaseInput)) {  generatedText=randomGreeting + ". "+ randomadditionResponse; }
        else if(questions.includes(lowercaseInput)){generatedText="I am AzureAI."}
        else { generatedText= randomApology+ ". At this early training stage, I still can't understand what you meant by " +"\""  + msg + "\". " + "Please note that you are taking part in my UX/UI responsivity testing. I will be able to answer any question you need after quality check of my UX is affirmed by the developing team. My AI Engine will be accessible after the UX/UI test is complete. Thanks and see you more often."; }
  
        generatedText = 'this is what the server says'

    console.log('message: ' + msg);
    // Broadcast the message to everyone
    io.emit('chat message', generatedText);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Serve index.html for any other GET request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public' , 'index.html'));
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
