function myFunc(){
  var matr = [[0,0,0],[0,0,0],[0,0,0]]; 
  var cells = $(".game-column .game-cell");
  var cellClick = function(){
      var index = cells.index($(this));
      //Теперь выясним i и j координаты
      var i=undefined;
      var j=undefined;
      switch(index){
        case 0: 
           i=0;j=0; 
           break;
        case 1:
           i=1;j=0;    
           break;
        case 2:
           i=2;j=0;   
           break;
        case 3:
           i=0;j=1;
           break;
        case 4:
          i=1;j=1;
          break;  
        case 5:
          i=2;j=1;
          break; 
        case 6:
          i=0;j=2;
          break;  
        case 7:
         i=1;j=2;
          break;  
        case 8:
          i=2;j=2;
          break;
        default:
          break;
      } 
      changeMatrix(i,j); 
      redrowGame();
      overflow();//функция проверяющая, не переполнено ли поле
      winner();//функция, проверяющая есть ли победитель 
      //Если есть победитель
  }
  for(var i=0; i<cells.length; ++i){
    cells[i].onclick = cellClick;  
  }
  var toggleSymbol = false;
  //Функция меняющая матрицу по щелчку
  function changeMatrix(i,j){
    if((matr[i][j])==0){ 
      if(toggleSymbol==false){
         matr[i][j]=1;
         toggleSymbol = true;
      }else{
         matr[i][j]=2;
         toggleSymbol = false;
      }
    }else if(matr[i][j]==3){
         for(var i=0; i<3; ++i)
           for(var j=0; j<3; ++j){
             matr[i][j]=0;
           } 
    }
  }
  
  //Функция перерисовывающая игровое поле 
  function redrowGame(){
    for(var i=0; i<matr.length; ++i)
      for(var j=0; j<matr.length; ++j){
           var index=(j*3)+i;
           if(matr[i][j]==0){
             cells.eq(index).text("");
             cells.eq(index).css("color","");
           }else if(matr[i][j]==1){ 
             cells.eq(index).text("o");
             cells.eq(index).css("color","");
             //cells.eq(index).css("paddingBottom","10px");
             //cells.eq(index).animate({"paddingBottom":"0px"},1000); 
           }else if(matr[i][j]==2){
              cells.eq(index).text("x");
              cells.eq(index).css("color",""); 
           }else if(matr[i][j]==3){
             cells.eq(index).css("color","red");
           }else if(matr[i][j]==4){
             cells.eq(index).css("color","blue");
           } 
      }      
  }
  
  function overflow(){
     var overflow = true;  
     //Условием опр, заполнена ли игра  
     for(var i=0; i<matr.length; ++i)
      for(var j=0; j<matr.length; ++j){
          if(matr[i][j]==0){
            overflow = false;
          }
          if(matr[i][j]==3){
            overflow=false;
          } 
          if(matr[i][j]==4){
            overflow=false;
          } 
      }  
     if(overflow){
       for(var i=0; i<3; ++i)
         for(var j=0; j<3; ++j){
           matr[i][j]=3;
         } 
       redrowGame();
     }  
  }
  function winner(){
     var win = false;
     var symbol = true;
     //Проверяем по вертикали 
     for(var j=0; j<3; ++j){
       if((matr[0][j]==matr[1][j])&&(matr[0][j]==matr[2][j])&&((matr[0][j]==1)||(matr[0][j]==2))){
          win=true;
          if(matr[0][j]==2){symbol=false;} 
          for(var i=0; i<3; ++i){
            matr[i][j]=4;
          }  
       } 
     }
     //Проверяем по горизонтали
     for(var i=0; i<3; ++i){
       if((matr[i][0]==matr[i][1])&&(matr[i][0]==matr[i][2])&&((matr[i][0]==1)||(matr[i][0]==2))){
          win=true;
          if(matr[i][0]==2){symbol=false;}
          for(var j=0; j<3; ++j){
            matr[i][j]=4;
          }  
       } 
     }
     //Проверяем главную диагональ 
     if((matr[0][0]==matr[1][1])&&(matr[0][0]==matr[2][2])&&((matr[0][0]==1)||(matr[0][0]==2))){
       win=true;
       if(matr[0][0]==2){symbol=false;}
       for(var i=0; i<3; ++i){
         matr[i][i]=4;
       } 
     }
     //Проверяем второстепенную диагональ 
     if((matr[2][0]==matr[1][1])&&(matr[2][0]==matr[0][2])&&((matr[2][0]==1)||(matr[2][0]==2))){
       win=true;
       if(matr[2][0]==2){symbol=false;}
       for(var i=0; i<3; ++i){
         matr[i][2-i]=4;
       } 
     }  
     //Если есть победитель, то вывести сообщение и очистить поле 
     if(win){
       redrowGame();
       if(symbol){
        setTimeout('alert("Победили нолики!")',50);
       }else{
        setTimeout('alert("Победили крестики!")',50);
       }
       for(var i=0; i<3; ++i)
         for(var j=0; j<3; ++j){
           matr[i][j]=0;
         }
       setTimeout(redrowGame,100);
     }
  }
}
window.onload=myFunc; 
//если игра закончена или есть победитель, то все становятся красными ,
//но если есть победитель, то клетки становятся синими, которые 
//победили. 

//Надо создать матрицу из 9ти элементов и связать её с полем так,
//что бы изменение значения в матрице изменяло значение 
//в поле 