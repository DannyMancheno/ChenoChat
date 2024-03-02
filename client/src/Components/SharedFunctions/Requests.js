// Authentication

export function requestAPI(method, url, data = {}, successfulStatus){
    
    console.log(`______________________________`)
    console.log(data);

    return new Promise((resolve, reject)=>{
        let request = new XMLHttpRequest();

        // Once the readyState 4 is reached, if the final status expected was recieved 
        // e.g. 200 = OK, 201 = Created, 404 = Not Found, then resolve the promise. Else reject. 
        request.onreadystatechange = ()=>{
            if(request.readyState === 4){
                if(request.status === successfulStatus){
                    resolve(request.responseText);
                }
                else{
                    reject(request.responseText);
                }
            }
        }
        // Boiler plate code below, to send data if necessary 
        request.open(method, url, true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(data));
    })
}

// export function requestSVGImage(image){
//     if(image === 'delete'){ return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86.03 126.83"><path d="M78.34,9.94H60.46a7.48,7.48,0,0,0,.28-2A7.69,7.69,0,0,0,53.05.29H33A7.69,7.69,0,0,0,25.29,8a7.48,7.48,0,0,0,.28,2H7.69a7.69,7.69,0,0,0,0,15.38H78.34a7.69,7.69,0,0,0,0-15.38Z" transform="translate(0 -0.29)"/><path d="M76.44,31.9H9.6a8.33,8.33,0,0,0-8.33,8.33V118.8a8.32,8.32,0,0,0,8.33,8.32H76.44a8.32,8.32,0,0,0,8.32-8.32V40.23A8.33,8.33,0,0,0,76.44,31.9Zm-53.12,74a4.6,4.6,0,0,1-9.19,0V47.25a4.6,4.6,0,1,1,9.19,0Zm24.29,0a4.6,4.6,0,0,1-9.19,0V47.25a4.6,4.6,0,1,1,9.19,0Zm24.3-.78a4.6,4.6,0,0,1-9.19,0V46.47a4.6,4.6,0,1,1,9.19,0Z" transform="translate(0 -0.29)"/></svg>`}
//     else if(image === 'checkmark'){ return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142.84 127.06"><path d="M649.74-6552.42h0a12,12,0,0,1,2.57,16.8l-74.58,101.5a15.75,15.75,0,0,1-22,3.37l-39-28.66a12,12,0,0,1-2.57-16.8h0a12,12,0,0,1,16.8-2.56L563.27-6455l69.67-94.83A12,12,0,0,1,649.74-6552.42Z" transform="translate(-511.81 6554.75)"/></svg>`}
//     else if(image === 'cancel'){return `<svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 152.49 152.49"><path d="M650.36-5106.22l-51.84,51.84,51.67,51.67a14.24,14.24,0,0,1,0,20.15h0a14.26,14.26,0,0,1-20.15,0l-51.67-51.67-51.83,51.83a14.24,14.24,0,0,1-20.15,0h0a14.24,14.24,0,0,1,0-20.15l51.83-51.83-52-52a14.24,14.24,0,0,1,0-20.15h0a14.26,14.26,0,0,1,20.15,0l52,52,51.84-51.84a14.26,14.26,0,0,1,20.15,0h0A14.26,14.26,0,0,1,650.36-5106.22Z" transform="translate(-502.05 5130.71)"/></svg>`}
//     else{
//         console.error('Error - Did not specify SVG return symbol');
//     }
// }