

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



let totalPopulation = 0;


//name used to sort your messages. used like a radio station. can be called anything
let channelName = "population";

function setup() 
{

  createCanvas(windowWidth,windowHeight);
  
  
   // initialize pubnub
  dataServer = new PubNub(
  {
    publish_key   : pubKey,  //get these from the pubnub account online
    subscribe_key : subKey,  
    ssl: true  //enables a secure connection. This option has to be used if using the OCAD webspace

  });
  
  //attach callbacks to the pubnub object to handle messages and connections
  

  dataServer.addListener({ message: readIncoming , presence: presenceChange});


  dataServer.subscribe({channels: [channelName], withPresence : true});


dataServer.hereNow(
{
    channels: [channelName],
    includeUUIDs: true
},
function (status, response)
{
  console.log(response);
  totalPopulation=response.totalOccupancy;
}


);

}

function draw() 
{

background(0,255,0);
fill(255);
ellipse(width/2,height/2,10*totalPopulation,10*totalPopulation);



}




function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
// add code here.


}
function presenceChange(pInfo)

{
console.log(pInfo.occupancy);
totalPopulation = pInfo.occupancy;

}
