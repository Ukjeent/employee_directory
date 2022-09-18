

const employeesDiv = document.getElementById('employees-div');
const employeeInfo = {
    name: '',
    email: '',
    phone: '',
    image: '',
    city: '',
    dob: '',
};
let allEmployeeInfo = {};

// Fetches information from randomuser.me and stores the information in a new object then adds the information to t
fetch('https://randomuser.me/api/?results=12&?inc=,name,location,email,picture,phone,dob&noinfo')
.then(checkStatus)
.then((res) => res.json())
.then((data) => { 
    console.log(data); 
        allEmployeeInfo = data;
        storeInfoInObjectAndCreateDiv();
})
.catch(error => console.log('There is a problem with the api.', error));

// Loops through the employee informations and creates employee div. 
function storeInfoInObjectAndCreateDiv() {
    for (let i = 0; i < 12; i++) {
        employeeInfo.name = `${allEmployeeInfo.results[i].name.first} ${allEmployeeInfo.results[i].name.last}`;
        employeeInfo.email = allEmployeeInfo.results[i].email;
        employeeInfo.image = allEmployeeInfo.results[i].picture.large;
        employeeInfo.city = allEmployeeInfo.results[i].location.city;
        createEmployeeDiv(employeeInfo.image, employeeInfo.name, employeeInfo.email, employeeInfo.city, i);
    }
}
console.log(employeeInfo);


    // fetch('https://randomuser.me/api/?results=12&?inc=,name,location,email,picture,phone,dob&noinfo')
    //     .then(checkStatus)
    //     .then((res) => res.json())
    //     .then((data) => { 
    //         console.log(data); 
    //         for (let i = 0; i < 12; i++) {
    //             employeeInfo2 = data;
    //             employeeInfo.name = `${data.results[i].name.first} ${data.results[i].name.last}`;
    //             employeeInfo.email = data.results[i].email;
    //             employeeInfo.phone = data.results[i].phone;
    //             employeeInfo.image = data.results[i].picture.medium;
    //             employeeInfo.state = data.results[i].location.state;
    //             employeeInfo.dob = data.results[i].dob.date.substring(0, 10);
    //             createEmployeeDiv(employeeInfo.image, employeeInfo.name, employeeInfo.email, employeeInfo.state);
    //         }
    //     })
    //     .catch(error => console.log('There is a problem with the api.', error));


// Creates a div with emplyeeinfo and append
function createEmployeeDiv(imageUrl, employeeName, emplyeeEmail, employeeCity, arrNumb) {
    const mainDiv = document.createElement('div');
    mainDiv.className = 'employee';
    mainDiv.dataset.arrNumber = arrNumb;

    const employeeImg = `<image class="employee-img" src="${imageUrl}" alt="profile image of ${employeeName}" data-arr-number="${arrNumb}">`;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'employee-info';
    mainDiv.dataset.arrNumber = arrNumb;

    const employeeInfo = `
    <h3 data-arr-number="${arrNumb}">${employeeName}</h3>
    <p data-arr-number="${arrNumb}">${emplyeeEmail}<br>
    ${employeeCity}</p>
    `;

    mainDiv.innerHTML = employeeImg;
    mainDiv.appendChild(infoDiv);
    infoDiv.innerHTML = employeeInfo;
    employeesDiv.appendChild(mainDiv);
}


// Checks the status of the fetch request
function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}


//
// Overlay
//

const overlay = document.getElementById('employee-overlay');
const employee = document.getElementById('employee')

// Open overlay

document.addEventListener('click', (e) => {
    const mClick = e.target;

    if ( mClick.classList.contains('employee') || mClick.parentElement.classList.contains('employee') || mClick.parentElement.parentElement.classList.contains('employee') ) {
        overlay.classList.add('show');
        overlay.classList.remove('hide');
        const arrayNumber = mClick.dataset.arrNumber;
        createPopupContent(arrayNumber)

    }
});

// Close overlay

document.addEventListener('click', (e) => {
    const mClick = e.target;

    if (mClick.id === 'close-btn' || mClick.id === 'employee-overlay') {
        overlay.classList.add('hide');
        overlay.classList.remove('show');
    }
});


// Overlay content

function createEmployeePopupContent(imageUrl, employeeName, emplyeeEmail, employeeCity, employeeCell, emplyeeAddress, employeeDob) {
    const popupDiv = document.getElementById('employee-popup');
    const image = document.getElementById('employee-popup-img')
    const mainInfoDiv = document.getElementsByClassName('employee-popup-info')[0];
    const secondInfoDiv = document.getElementsByClassName('employee-popup-info-second')[0];
    image.src = `${imageUrl}`;
    image.alt = `profile image of ${employeeName}`;
    
    
    mainInfoDiv.innerHTML = `
    <h3>${employeeName}</h3>
    <p>${emplyeeEmail}<br>
    ${employeeCity}</p>
    `;

    secondInfoDiv.innerHTML = `
    <p> ${employeeCell}<br>
    ${emplyeeAddress}<br>
    ${employeeDob} </p>
    `;
}

function createPopupContent(arrNumb) {
    const imageUrl = allEmployeeInfo.results[arrNumb].picture.large;
    const employeeName = `${allEmployeeInfo.results[arrNumb].name.first} ${allEmployeeInfo.results[arrNumb].name.last}`;
    const emplyeeEmail =  allEmployeeInfo.results[arrNumb].email;
    const employeeCity = allEmployeeInfo.results[arrNumb].location.city;
    const employeeCell = allEmployeeInfo.results[arrNumb].phone;
    const emplyeeAddress = `${allEmployeeInfo.results[arrNumb].location.street.name} ${allEmployeeInfo.results[arrNumb].location.street.number}, ${allEmployeeInfo.results[arrNumb].location.state} ${allEmployeeInfo.results[arrNumb].location.postcode}`;
    const employeeDob =  `Birthday: ${allEmployeeInfo.results[arrNumb].dob.date.substring(0, 10)}`;

    createEmployeePopupContent(imageUrl, employeeName, emplyeeEmail, employeeCity, employeeCell, emplyeeAddress, employeeDob)
}