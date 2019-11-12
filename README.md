# p5pubnub
## Networking examples using P5.js + PubNub
#### These examples have been created for various courses introducing methods for creating networked experiences with only frontend coding in P5. To work with this code you will need a free [PubNub account](pubnub.com).

## Basic Setup
#### Get your publish and subscribe keys from your account. Define a global variable to hold the PubNub object. Also define the name of a channel to broadcast on within your account.  Messages can be sent/received on multiple channels.

```javascript
let dataServer;
let pubKey = 'insert your pub key';
let subKey = 'insert your sub key';


let channelName = "messageChannel";

```

#### Within the setup function initialize the connection, subscribe to the channel, and create a listener to run a callback function any time a new message arrives.

```javascript
function setup() 
{
  
  createCanvas(windowWidth,windowHeight)
  

   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. 
  });
  
  //attach callbacks to the pubnub object to handle messages and connections
  dataServer.addListener({ message: readIncoming});
  dataServer.subscribe({channels: [channelName]});


}
 ```
#### Define a callback function to execute each time a message is received

```javascript
function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  
  // simple error check to match the incoming to the channelName
  if(inMessage.channel == channelName)
  {
  incomingText = inMessage.message.messageText;
  }
}
```

#### Create a function that publishes messages to the channel. These are JSON format
```javascript
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
```

