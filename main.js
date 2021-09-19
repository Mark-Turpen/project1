
let magenta

function setcookie(mag){
    if(mag){
        document.cookie="magenta=t;path=/;"
    }else{
        document.cookie="magenta=f;path=/;"
    }
}

function main(){

    console.log(document.cookie)
    console.log("_main.js")
    let body=document.getElementsByTagName('body')[0]
    let ck=document.cookie.split(";")
    magenta=true;
    if(document.cookie.match(/magenta=f/)!=null) magenta=false
    setcookie(magenta)
    if(!magenta){
        body.style.color="#23f923"
    }else{
        setcookie(true)
        body.style.color="magenta"
    }

    let tb=document.createElement("table")
    tb.classList.add("topbar")
    let tr=document.createElement("tr")
    let th1=document.createElement("th")
    let th2=document.createElement("th")
    let th3=document.createElement("th")
    let th4=document.createElement("th")
    let img=document.createElement("img")
    img.src="/~mark-turpen/githubpage/logo.png"
    img.classList.add("logo")
    th1.appendChild(img)
    th2.innerText="Mark."
    let a=document.createElement("a")
    a.href="/~mark-turpen"
    a.innerText="home."
    a.style.fontSize="30px"
    th3.appendChild(a)
    let bt=document.createElement("button")
    bt.innerText="toggle color"
    bt.onclick=()=>{
        magenta=!magenta
        setcookie(magenta)
        body.style.color=magenta?"magenta":"#23f923"
        console.log(document.cookie)
    }
    th4.appendChild(bt)
    tr.appendChild(th1)
    tr.appendChild(th2)
    tr.appendChild(th3)
    tr.appendChild(th4)
    tb.appendChild(tr)
    body.appendChild(tb)

}
main()
