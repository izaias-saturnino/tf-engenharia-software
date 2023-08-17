const fetchContent = async (uri, body, method) => {
    var resp_ok = true;
    var response = await fetch(uri, {
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
    })
    .catch(error => {
        //TO DO
    });
    var data;
    if(response == undefined){
        data = {};
    }
    else{
        data = await response.json();
    }
    return data;
}

export default fetchContent;