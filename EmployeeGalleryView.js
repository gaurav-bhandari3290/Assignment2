let employees = []; 
let currentIndex = 0;

async function fetchData() {
    const response = await fetch('Employees.json').catch(error => {
        console.error('Error fetching data:', error);
    });

    employees = await response.json();
    displayEmployeeDetails(0);
}


function displayEmployeeDetails(index) {
    const currentEmployee = employees[index];
    document.getElementById('img').src = currentEmployee.img;
    document.getElementById('name').textContent = `Name: ${currentEmployee.name}`;
    document.getElementById('designation').textContent = `Designation: ${currentEmployee.designation}`;
    document.getElementById('dob').textContent = `Date of Birth: ${currentEmployee.dob}`;
    document.getElementById('experience').textContent = `Experience: ${currentEmployee.experience}`;
}

function navigateEmployee(direction) {
    if (direction === 'left') {
        currentIndex = (currentIndex - 1 + employees.length) % employees.length;
    } else {
        currentIndex = (currentIndex + 1) % employees.length;
    }

    displayEmployeeDetails(currentIndex);
}

document.addEventListener('keydown', function(event) {
    switch (event.key) {
        case 'ArrowLeft':
            navigateEmployee('left');
            break;
        case 'ArrowRight':
            navigateEmployee('right');
            break;
    }
});


fetchData();


