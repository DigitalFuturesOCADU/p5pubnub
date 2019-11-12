/*

Pubnub app sends/receives 2 text variables in a message and filters the received messages
 */


// server variables for apps to communicate they must use THE SAME KEYS
//get these keys from your PubNub account
//within your group, you will use 1 of your accounts for the project

let dataServer;
let pubKey = 'insert your pub key';
let subKey = 'insert your sub key';

//input variables
let sendText;
let sendButton;
let whoAreYou;
let filterText;

//name used to sort your messages. used like a radio station. can be called anything
let channelName = "whoSaysStuff";

let incomingText = ""; //variable that will hold the incoming message text


function setup() 
{
  
  createCanvas(windowWidth, windowHeight);
  background(255);
  
  

   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace
  });
  
  //attach callbacks to the pubnub object to handle messages and connections
  dataServer.addListener({ message: readIncoming });
  dataServer.subscribe({channels: [channelName]});

  //create the text fields for the message to be sent
  
whoAreYou = createInput('Write Your Name');
  whoAreYou.position(5,height-120);

  
  sendText = createInput('Write a  Message');
  sendText.position(5,height-100);

  sendButton = createButton('Post Message');
  sendButton.position(sendText.x + sendText.width,height-100);
  sendButton.mousePressed(sendTheMessage);
  
    filterText = createInput('Who are you listening to?');
  filterText.position(5,height-50);
  

}

function draw() 
{
    background(255);
    noStroke();
    fill(0);  //read the color values from the message
    textSize(height/25);
    text(incomingText, 5, height/2);

}


///uses built in mouseClicked function to send the data to the pubnub server
function sendTheMessage() {
 

  // Send Data to the server to draw it in all other canvases
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {
        who: whoAreYou.value(),
        messageText: sendText.value()       //get the value from the text box and send it as part of the message   
      }
    });

}

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  
  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName)
  {  
    if(inMessage.message.who==filterText.value())
    {
    incomingText = inMessage.message.who+" says "+inMessage.message.messageText;
    }
  }
}
