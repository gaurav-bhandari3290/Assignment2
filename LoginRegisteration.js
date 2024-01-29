function showForm(formId) {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => form.className = '');

    const activeForm = document.getElementById(formId);
    activeForm.className = 'active-form';
}


function register() {
    const name = document.getElementById('registerName').value;
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    const validationError = validateInputs(name, username, password);

    if (validationError) {
        displayError(validationError);
        return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isUsernameTaken = existingUsers.some(user => user.username === username);

    if (isUsernameTaken) {
        alert('Username already taken. Please choose a different username.');
        return;
    }

    const newUser = { name, username, password };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Registration successful!');
    console.log('Register:', name, username, password);
    document.getElementById('registerForm').reset();
}


function validateInputs(name, username, password) {
    if (!name.trim()) {
        return 'Name cannot be empty.';
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
        return 'Name can only contain letters (both lowercase and uppercase) and spaces.';
    }

    if (!username.trim()) {
        return 'Username cannot be empty.';
    }

    if (username.includes(' ')) {
        return 'Username cannot contain spaces.';
    }

    if (!password.trim()) {
        return 'Password cannot be empty.';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        return 'Password must meet the specified criteria.';
    }
 

    return null; 
}



function displayError(error) {
    alert(error);
}


function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const userWithUsername = existingUsers.find(user => user.username === username);

    if (userWithUsername) {
        if (userWithUsername.password === password) {
            window.location.href = 'EmployeeGalleryView.html';
        } else {
            alert('Incorrect password. Please try again.');
        }
    } else {
        alert('Username not found. Please check your username.');
    }
}

