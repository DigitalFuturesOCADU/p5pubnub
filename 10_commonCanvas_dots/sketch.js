

//basic server example using pubnub
//
//Based on Shiffman Coding Rainbow#30
//multiuser tool
//each client is assigned a random color + random size
//click within the frame to create a circle of your size/color
//all other clicks will also be shown in your canvas
//uses pubnub instead of writing a NODE server


// server variables
let dataServer;
let pubKey = 'insert your pub key';
let subKey = 'insert your sub key';

//variables for the size and color of your circle
let brushR;
let brushG;
let brushB;
let brushRad;

//size of the active area
let cSizeX = 900;
let cSizeY = 600;

//name used to sort your messages. used like a radio station. can be called anything
let channelName = "dots";

function setup() 
{

  createCanvas(cSizeX, cSizeY);
  
  
  
  //pick your random size + color
  brushR = floor(random(0,255));
  brushG = floor(random(0,255));
  brushB = floor(random(0,255));
  brushRad = floor(random(5,50));
  
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


  //draw a frame that is the same color as your brush
  stroke(brushR,brushG,brushB);
  strokeWeight(10);
  noFill();
  background(255);
  rect(0,0,cSizeX,cSizeY);


}

function draw() 
{
///all the drawing is happing in the readIncoming function

}


///uses built in mouseClicked function to send the data to the pubnub server
function mouseClicked() {
  // Send Data to the server to draw it in all other canvases
  dataServer.publish(
    {
      channel: channelName,
      message: 
      {       //set the message objects property name and value combos    
        x: mouseX,
        y: mouseY,
        r: brushR,
        g: brushG,
        b: brushB,
        rad: brushRad  
      }
    });

}

function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  
  // draw a circle on the screen if the user is someone else
  if(inMessage.channel == channelName)
  {
    noStroke();
    fill(inMessage.message.r, inMessage.message.g, inMessage.message.b);  //read the color values from the message
    ellipse(inMessage.message.x, inMessage.message.y, inMessage.message.rad, inMessage.message.rad);  //read the size and postion data and draw the ellipse
  }
}

