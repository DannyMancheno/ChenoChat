
// This library is purpose built for background UI element styling. 

export function containerHovered(event, parent, color1, color2, demoColors){
    let color1Final = color1;
    let color2Final = color2;
    if(demoColors === true){
        color1Final = `red`;
        color2Final = `blue`;
    }
    let container = document.getElementById(parent);
    let location = container.getBoundingClientRect();
    let xCord = event.clientX - location.x;
    let yCord = event.clientY - location.y;
    container.style.background = `radial-gradient(circle at ${xCord}px ${yCord}px, ${color1Final}, ${color2Final} 65%)`;
}   

export function containerExited(event, duration, color1, color2, demoColors){
    let color1Final = color1;
    let color2Final = color2;
    if(demoColors === true){
        color1Final = `red`;
        color2Final = `blue`;
    }
    let location = event.target.getBoundingClientRect();
    let xCord = event.clientX - location.x;
    let yCord = event.clientY - location.y;
    let i = 0;  
    let curr = 0;
    do{
        setTimeout(()=>{
            event.target.style.background =
                `radial-gradient(circle at ${xCord}px ${yCord}px, ${color2Final}, ${color1Final} ${curr++  * 3}%)`;
        }, i * duration);
        i++;
    }while(i < 100)
}