class Game 
{
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state)
  {
    database.ref('/').update({
      gameState: state
    });
  }

  async start()
  {
    if(gameState === 0)
    {
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists())
      {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
                              
    car1 = createSprite(200,200);
    car2 = createSprite(400,200);
    car3 = createSprite(600,200);
    car4 = createSprite(800,200);
    cars = [car1, car2, car3, car4];
    car1.addImage(c1)
    car2.addImage(c2)
    car3.addImage(c3) 
    car4.addImage(c4)
  }
 }

  play()
  {
          form.hide();
          Player.getPlayerInfo();
          player.getRankCount();
            
          if(allPlayers !== undefined)
          {
            background(bgi)
            image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
            //var display_position = 100;
          
            //index of the array
            var index = 0;

            //x and y position of the cars 
            var x = 170;
            var y;
            
                for(var plr in allPlayers)
                {
                    //add 1 to the index for every loop
                    index = index + 1 ;
                    
                    //position the cars a little away from each other in x direction
                    x = x + 200;
                    //use data form the database to display the cars in y direction
                    y = displayHeight - allPlayers[plr].distance;
                    
                    cars[index-1].x = x;
                    cars[index-1].y = y;

                    if (index === player.index)
                    {
                      fill("red")
                      stroke(10)
                      ellipse(x,y,70,60)
                      camera.position.x = displayWidth/2;
                      camera.position.y = cars[index-1].y
                      player.xPosition=cars[index-1].x
                    }
                }
          } 
      
          if(keyIsDown(UP_ARROW) && player.index !== null && player.distance<3600)
          {
              player.distance +=50
              player.update();
          
            if(player.distance>=3600)
            {    
              rankCount++;
              player.rank=rankCount;
              player.update()
              player.updateRankCount(rankCount)
              console.log(player.name + "   Wins Rank  "+ rankCount)
            }
          }
            
          if(player.rank===1)
            {
              stroke("green")
              strokeWeight(5)
              textSize(40)
              fill("blue")      
              text("CONGRAGULATIONS  "+ player.name+" - YOU ARE WINNER",displayWidth/5,-displayHeight*4-80)
              textSize(25)
              text( "RANK : - "+player.rank,displayWidth/2-50,-displayHeight*4-30)
            } else   if(player.rank>1) {textSize(25);  text( player.name +" - YOU ARE RANK  " + player.rank,displayWidth/2,-displayHeight*4-30);}
        
            
          drawSprites();
   
  } 

  end()  
  {
    background(bgi)
    var plr
    Player.getPlayerInfo();
     
      if(allPlayers !== undefined)
      { 
          var display_position = 50;
          textSize(60)
          fill("black") 
          stroke("green")
          strokeWeight(5)
          text("LEADER BOARD", displayWidth/3,-displayHeight*4-200)
            for(var plr in allPlayers)
            {
              display_position+=70;
              p=createElement("h1", allPlayers[plr].name + "  : RANK   " + allPlayers[plr].rank)
              p.position(displayWidth/3,display_position)
            }
      } 
          
  }
}  
