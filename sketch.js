//let nb;
//let nb2;
//let nb3;
let nbarray = [];
// 初始內容
function setup() {
  createCanvas(600, 600, WEBGL); // 決定 使用 3D 方式進行渲染
  for(let i=0;i<5;i+=1){
    // 怎麼把東西放到 nbarray 袋子裡面的公式
    nbarray.push(new myBox(50,-height/2+(height/5)*i,0,50));
  }
  //nb = new myBox(50,50,0,50);
  //nb2 = new myBox(-50,150,0,25);
  //nb3 = new myBox(-150,100,0,50);

}

function draw() {
  let step = frameCount % 20;
  background(200);
  noStroke();
  translate(50, 50);
  // Equivalent to scale(x, y);
  applyMatrix(1 / step, 0, 0, 1 / step, 0, 0);
  rect(0, 0, 50, 50);
}
  
function draw() {
  background(150,0,0);
  fill(250,250,0,80)
  
  // 將袋子中 所有 東西 稱為 V 執行他的相關函式
  nbarray.forEach((v)=>{
    v.display();
  })
  //nb.display();
  //nb2.display();
  //nb3.display();
}
// 自訂一個類別物件
class myBox{
  // 怎樣建構這個物件 只執行一次
  constructor(x,y,z,size){
    this.x=x;
    this.y=y;
    this.z=z;
    this.size=size;
    this.mx = 1;
    this.my = 1;
  }
  // 定義一些能力 我們呼叫時 執行 
  // 能力1:顯現這box
  display(){
    push();
      translate(this.x,this.y,this.z);  
      if (mouseX-width/2 > this.x-this.size/2 && 
          mouseX-width/2 < this.x+this.size/2 &&
          mouseY-height/2 > this.y-this.size/2 && 
          mouseY-height/2 < this.y+this.size/2){
        rotateX(frameCount*0.01);
        rotateY(frameCount*0.01);
        this.mx = this.mx+1.5;
        this.my = this.my+1.5;
        }
      box(this.size);
    pop();
    this.move();
    
  }
  //能力1:移動規則
  move(){
    if (this.x>width/2){this.mx = -1*this.mx;}
    if (this.x<-width/2){this.mx = -1*this.mx;}
    this.x = this.x + this.mx;
    if (this.y>height/2){this.my = -1*this.my;}
    if (this.y<-height/2){this.my = -1*this.my;} 
    this.y = this.y + this.my;
   //能力2:storm
    rotateY(PI / 6);
  stroke(153);
  box(35);
  let rad = millis() / 1000;
  // Set rotation angles
  let ct = cos(rad);
  let st = sin(rad);
  // Matrix for rotation around the Y axis
  applyMatrix(  ct, 0.0,  st,  0.0,
               0.0, 1.0, 0.0,  0.0,
               -st, 0.0,  ct,  0.0,
               0.0, 0.0, 0.0,  1.0);
    //能力3:Optical illusion + lazer
    //move your mouse to change light position
  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;
  // to set the light position,
  // think of the world's coordinate as:
  // -width/2,-height/2 -------- width/2,-height/2
  //                |            |
  //                |     0,0    |
  //                |            |
  // -width/2,height/2--------width/2,height/2
  ambientLight(50);
  spotLight(200, 0, 0, locX, locY, 200, 0, 0, -1, Math.PI / 16);
  noStroke();
  sphere(800);

    
  }
  
}
