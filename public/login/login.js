async function testfunction() {
    try {
        event.preventDefault();
        const data1 = document.getElementById('user').value;
        const data2 = document.getElementById('pwd').value;
        if(data1.length==0){
            alert("Username should not be empty")
            return
        }
        else if(data2.length==0){
            alert("Password should not be empty")
            return
        }
        const response = await fetch("/check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username:data1, pass: data2 }) // Convert JSON object to string
        });
        const data = await response;
        console.log(data)

        if(data.status===200){
            window.location.href = `../index.html?username=${data1}`;
        }
        else if(data.status===409){
            alert("Password is incorrect")
        }
        else{
            alert("User not exists");
        }
    }

    catch (error) {
        console.log('Error :', error);
    }
    
}
