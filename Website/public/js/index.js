    // Getting the button
    const control = document.querySelectorAll("button")
    let ws;

    function init(){
        if(ws){
            ws.onerror = ws.onopen = ws.onclose = null;
            ws.close();
        }
        let HOST = location.origin.replace(/^http/, 'ws')
        //let HOST = "ws://127.0.0.1:5000"
        console.log(HOST)
        ws = new WebSocket(HOST);
        ws.onopen = ()=>{
            console.log('Connection Open');
        }
        ws.onclose = function(){
            ws = null;
        }
    }
    // Listening to each button controller, dekstop or on mobile
    // Where each button have different respond, according to their ID
    control.forEach(c =>{
        c.addEventListener('mousedown',(e)=>{
        if(!ws){
            console.log("No Websocket Connection")
        }
        const command = e.target.id
        ws.send(command)
        })

        c.addEventListener('mouseup',(e)=>{
        if(!ws){
            console.log("No Websocket Connection")
        }
        const command = "brake"
        ws.send(command)
        })

        c.addEventListener('touchstart',(e)=>{
            if(!ws){
            console.log("No Websocket Connection")
            }
        const command = e.target.id
        ws.send(command)
        })

        c.addEventListener('touchend',(e)=>{
            if(!ws){
            console.log("No Websocket Connection")
            }
        const command = "brake"
        ws.send(command)
        })
    })

    init();