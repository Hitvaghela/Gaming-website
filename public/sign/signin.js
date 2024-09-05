async function testfunction() {
    try {

        const data1 = await document.getElementById('user1').value;
        const data2 = await document.getElementById('pwd1').value;
        const data3 = await document.getElementById('pwd2').value;
        console.log(data1)
        if (data2 !== data3) {
            alert("Password do not match");
            window.location.href = "sign.html";
            return;
        }
        
        const response = await fetch("/store", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: data1, pass: data2 }) // Convert JSON object to string
        });
        const data = await response;
        
        if(data.status===409){
            alert("Username already exits try to use with differ username");
            window.location.href = "sign.html";
        }
        else if(data.status===400){
            alert("Internal problem try again")
            window.location.href = "sign.html";
        }
        else{
            alert("Successfully sign in");
            window.location.href=`../index.html?username=${data1}`;
        }
    }

    catch (error) {
        console.log('Error :', error);
    }
}