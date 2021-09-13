class vec3{
  constructor( x_, y_, z_){
    this.x=x_;this.y=y_;this.z=z_;
  }
  copy(v){
    this.x=v.x;this.y=v.y;this.z=v.z;
  }
  normalize(){
    return this.mult(1/this.mag());
  }
  add(v){
    return new vec3(this.x+v.x,this.y+v.y,this.z+v.z);
  }
  sub(v){
    return new vec3(this.x-v.x,this.y-v.y,this.z-v.z);
  }
  dot(v){
    return v.x*this.x+v.y*this.y+v.z*this.z;
  }
  cross(v){
    return new vec3(this.y*v.z-this.z*v.y,this.z*v.x-this.x*v.z,this.x*v.y-this.y*v.x);
  }
  mult(a){
    return new vec3(a*this.x,a*this.y,a*this.z);
  }
  div(a){
    return new vec3(this.x/a,this.y/a,this.z/a);
  }
  mag(){
    return (this.x**2+this.y**2+this.z**2)**.5;
  }
  translate(v){
    return this.add(v);
  }
  scale(v){
    return this.hadamat(v);
  }
  hadamat(v){
    return new vec3(this.x*v.x,this.y*v.y,this.z*v.z);
  }
  transform(M){
    let v=[x,y,z,1];
    let w=Dot(v,M[3]);
    return new vec3(Dot(v,M[0])/w,Dot(v,M[1])/w,Dot(v,M[2])/w);
  }
  rotX(theta){
    let M=[[1,0,0,0],
    [0,cos(theta),sin(theta),0],
    [0,-sin(theta),cos(theta),0],
    [0,0,0,1]];
    return this.transform(M);
  }
  rotY(theta){
    let M=[[cos(theta),0,-sin(theta),0],
    [0,1,0,0],
    [sin(theta),0,cos(theta),0],
    [0,0,0,1]];
    return this.transform(M);
  }
  rotZ(theta){
    let M=[[cos(theta),sin(theta),0,0],
    [-sin(theta),cos(theta),0,0],
    [0,0,1,0],
    [0,0,0,1]];
    return this.transform(M);
  }
  rotate(t,a){
    return this.conj(angleAxis(t,a)).v;
  }
  prt(){
    print(" x = ");print(x);
    print(" y = ");print(y);
    print(" z = ");print(z);
    print("\n");
  }
  conj(q){
    let P=new Quaternion(0,this);
    return (q.mult(P)).mult(q.inv());
  }
  random3D(){
    return new vec3(2*random()-1,2*random()-1,2*random()-1).normalize();
  }
  draw(p){
    if(this.mag()<.01) return;
    let u=p.add(this.normalize().mult(.04));
    line(p.x,p.y,p.z,u.x,u.y,u.z);
  }
  toPV(){
    return new p5.Vector(this.x,this.y,this.z);
  }
  isZero(){
    if (this.x==0 && this.y==0 && this.z==0) return true;
    return false;
  }
}

class Quaternion{
  constructor(s_,v_){
    this.s=s_;this.v=v_;
  }
  prt(){
    println(s);v.prt();
  }
  getAngle(){
    return 2*atan2(this.v.mag(),this.s);
  }
  getAxis(){
    return new vec3(this.v.x/this.v.mag(),this.v.y/this.v.mag(),this.v.z/this.v.mag());
  }
  mult(q){
    let S=this.s*q.s-this.v.dot(q.v);
    let V=((this.v.mult(q.s)).add(q.v.mult(this.s))).add(this.v.cross(q.v));
    return new Quaternion(S,V);
  }
  inv(){
    return new Quaternion(this.s,this.v.mult(-1));
  }
  copy(){
    return new Quaternion(this.s,this.v.mult(1));
  }
}

function angleAxis(t,a){
  a=a.normalize();
  let s=cos(t/2.0);
  let v=a.mult(sin(t/2.0));
  return new Quaternion(s,v);
}

function Dot(v,u){
  if (v.Length!=u.Length){
    println("error");
    return 0;
  }
  let d=0;
  for (let i=0;i<v.Length;i++){
    d+=v[i]*u[i];
  }
  return d;
}

function copyMtx(M){
  let N=new Array();//float[M.length][M[0].length];
  for (let i=0;i<M.length;i++){
    let Ni=new Array();
    for (let j=0;j<M[0].length;j++){
      Ni.push(M[i][j]);
    }
    N.push(Ni);
  }
  return N;
}

function getRotX(theta){
  let M=       [[1,0,0,0],
                [0,cos(theta),sin(theta),0],
                [0,-sin(theta),cos(theta),0],
                [0,0,0,1]];
  return M;
 }

function getRotY(theta){
  let M=       [[cos(theta),0,-sin(theta),0],
                [0,1,0,0],
                [sin(theta),0,cos(theta),0],
                [0,0,0,1]];
  return M;
}

function getRotZ(theta){
  let M=       [[cos(theta),sin(theta),0,0],
                [-sin(theta),cos(theta),0,0],
                [0,0,1,0],
                [0,0,0,1]];
  return M;
}

function getScale(v){
  let M=       [[v.x,0,0,0],
                [0,v.y,0,0],
                [0,0,v.z,0],
                [0,0,0,1]];
  return M;
}

function getTrans(v){
  let M=       [[1,0,0,v.x],
                [0,1,0,v.y],
                [0,0,1,v.z],
                [0,0,0,1]];
  return M;
}

function transpose(M){
  let N=copyMtx(M);//float[M[0].length][M.length];
  for (let i=0;i<M.length;i++){
    for (let j=0;j<M[0].length;j++){
      N[j][i]=M[i][j];
    }
  }
  return N;
}

function multMtx(A,B){
  let M=new Array();//float[A.length][A[0].length];
  A=transpose(A);
  for (let i=0;i<M.length;i++){
    let Mi=new Array();
    for (let j=0;j<M[0].length;j++){
      Mi.push(Dot(A[j],B[i]));
    }
    M.push(Mi);
  }
  return M;
}

function qMtx(q){
  let w=q.s;let x=q.v.x;let y=q.v.y;let z=q.v.z;
  let M=       [[1-2*y*y-2*z*z,2*x*y-2*w*z,2*x*z+2*w*y,0],
                [2*x*y+2*w*z,1-2*x*x-2*z*z,2*y*z-2*w*x,0],
                [2*x*z-2*w*y,2*y*z+2*w*x,1-2*x*x-2*y*y,0],
                [0,0,0,1]];
  return transpose(M);
}

function proj(b,a){
  return (a.normalize()).mult(b.dot(a.normalize()));
}

function comp(b,a){
  return a.normalize().mult(b.dot(a.normalize()));
}

function getAngle(a,b){
  return acos((a.normalize()).dot(b.normalize()));
}

function distance(a,b){
  return sqrt(pow(a.x-b.x,2)+pow(a.y-b.y,2)+pow(a.z-b.z,2));
}

function copyVec(a){
  let b=new vec3(a.x,a.y,a.z);
  return b;
}

function fromTo(a,b){
  if (a.cross(b).isZero()){
    a=a.rotate(.001,new vec3(0,0,1));
  }
  return angleAxis(getAngle(a,b),a.normalize().cross(b.normalize()));
}
