
document.querySelector('#button').addEventListener('click',getUrl)
document.querySelector('.emailButton').addEventListener('click',checkEmail)
document.querySelector('.phoneButton').addEventListener('click',checkPhone)
document.querySelector('.myIp').addEventListener('click',myIP)

function getUrl(){
    document.querySelector('.listInfo')
    let val = document.querySelector('.urlInput').value
    
    fetch(`http://ip-api.com/json/${val}`)

    .then(res => res.json())
    .then(data => {
    console.table(data)
    console.log(Object.entries(data))
    
    Object.entries(data).forEach(arr =>{
        let li = document.createElement('li')
        console.log(`${arr[0].toUpperCase()}     :      ${arr[1]}`)
        li.textContent = `${arr[0].toUpperCase()}                      :      ${arr[1]}`
        document.querySelector('.listInfo').appendChild(li)
    })

    var map = new ol.Map({
        target: 'map',
        layers: [
          new ol.layer.Tile({
            source: new ol.source.OSM()
          })
        ],
        view: new ol.View({
          center: ol.proj.fromLonLat([data.lon, data.lat]),
          zoom: 15
        })
      });
        
})
    .catch(err => {
    console.log(`error ${err}`)
})
       
}

function checkEmail(){
    const options = {method: 'GET', headers: {Accept: 'application/json', Key:'7tr81t5j859iepvizg4textfyt8xi4znu4r9w4pqxqrv8bsg'}};
    const email = document.querySelector('.emailInput').value
    fetch(`https://emailrep.io/${email}`, options)
    .then(response => response.json())
    .then(response => {console.log(response.details)
        Object.entries(response).forEach(elem => {
            if(elem[0].toString()=='details'){
                elem.forEach(el => {
                    console.log(el)
                    console.log(`${el[0]}   :   ${el[1]}`)
                    let li = document.createElement('li')
                    li.textContent=`${el[0]}   :   ${el[1]}`
                    document.querySelector('.listInfo2').appendChild(li)
                })
            }else{
                let li = document.createElement('li')
                li.textContent=`${elem[0]}   :   ${elem[1]}`
                document.querySelector('.listInfo2').appendChild(li)
            }
    })})
    .catch(err => console.error(err));
}

function checkPhone(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'veriphone.p.rapidapi.com',
            'X-RapidAPI-Key': '46eb500198msh9de5a2dd9479c20p15adf4jsn949031093e76'
        }
    };

    let phone = document.querySelector('.phoneInput').value
    
    fetch(`https://veriphone.p.rapidapi.com/verify?phone=%2B${phone}`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

function myIPx(ip) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'ip-geolocation-ipwhois-io.p.rapidapi.com',
            'X-RapidAPI-Key': '46eb500198msh9de5a2dd9479c20p15adf4jsn949031093e76'
        }
    };
    
    fetch(`https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/${ip}`, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

function myIP(){
    fetch('https://api.ipify.org?format=json')
    .then(data => data.json())
    .then(data => {
        console.log(data)
        myIPx(data.ip)
    })
    .catch(err => console.error(`Error: ${err}`))
}