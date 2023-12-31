const fetchContent = async (uri, body, method, callback = ()=>{}) => {
    var resp_ok = true;
    await fetch(uri, {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: body
    })
    .then((resp) => {
        if(resp.status === 400){
            resp_ok = false;
        }
        return resp.json();
    })
    .then((data) => {
        if(resp_ok){
            callback(data);
            console.log("resp_ok");
        }else{
            if(data.errors === undefined){
                alert(data);
            }
            else{
                var str = "";
                for(var element in data.errors){
                str += data.errors[element] + "\n";
                }
                alert(str);
            }
        }
    });
}

export default fetchContent;