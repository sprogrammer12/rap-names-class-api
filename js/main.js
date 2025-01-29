document.querySelector("button").addEventListener("click", response)

function response(){
    console.log('response')
    alert('response')
}


//  async function response(){
//     const rapperName = document.querySelector("input").value

//     try{
//         const res = await fetch(`https://rap-names-class-api-render.onrender.com/api/${rapperName}`)
//         const data = await res.json()
//         console.log(data)
//         document.querySelector("h2").innerText += " " + data.birthName
//     }
//     catch(err){
//         console.log(err)
//     }
// }