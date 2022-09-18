

const employeesDiv = document.getElementById('employees-div');
const employeeInfo = {
    name: '',
    email: '',
    phone: '',
    image: '',
    state: '',
    dob: '',
};

    fetch('https://randomuser.me/api/?results=12&?inc=,name,location,email,picture,phone,dob')
        .then(checkStatus)
        .then((res) => res.json())
        .then((data) => { 
            console.log(data); 
            for (let i = 0; i < 12; i++) {
                employeeInfo.name = `${data.results[i].name.first} ${data.results[i].name.last}`;
                employeeInfo.email = data.results[i].email;
                employeeInfo.phone = data.results[i].phone;
                employeeInfo.image = data.results[i].picture.medium;
                employeeInfo.state = data.results[i].location.state;
                employeeInfo.dob = data.results[i].dob.date.substring(0, 10);
                createEmployeeDiv(employeeInfo.image, employeeInfo.name, employeeInfo.email, employeeInfo.state);
            }
        })
        .catch(error => console.log('There is a problem with the api.', error));


    console.log(employeeInfo);




// Creates a div with emplyeeinfo and append
function createEmployeeDiv(imageUrl, employeeName, emplyeeEmail, employeeState) {
    const mainDiv = document.createElement('div');
    mainDiv.className = 'employee';

    const employeeImg = `<image class="employee-img" src="${imageUrl}" alt="profile image of ${employeeName}">`;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'employee-info';

    const employeeInfo = `
    <p>${employeeName}</p>
    <p>${emplyeeEmail}</p>
    <p>${employeeState}</p>
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