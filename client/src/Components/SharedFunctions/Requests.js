// Authentication

export function requestAPI(method, url, data){
    let request = new XMLHttpRequest();
    request.open(method, url);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify(data));
}