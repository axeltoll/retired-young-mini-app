document.getElementById('get-started-btn').addEventListener('click', () => {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('form-screen').style.display = 'block';
});

document.getElementById('details-form').addEventListener('submit', (event) => {
    event.preventDefault();

    // Collect user data
    const userData = {
        fullName: document.getElementById('full-name').value,
        jifuId: document.getElementById('jifu-id').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phone-number').value
    };

    // Send data to your CRM (example code)
    sendToCRM(userData);

    // Transition to next steps screen
    document.getElementById('form-screen').style.display = 'none';
    document.getElementById('next-steps').style.display = 'block';
});

document.getElementById('next-steps-btn').addEventListener('click', () => {
    document.getElementById('next-steps').style.display = 'none';
    document.getElementById('final-screen').style.display = 'block';
});

document.getElementById('finish-btn').addEventListener('click', () => {
    // Close the Mini App
    if (window.Telegram && window.Telegram.WebApp) {
        window.Telegram.WebApp.close();
    }
});

// Function to send data to the CRM
function sendToCRM(userData) {
    fetch('https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZkMDYzMTA0MzQ1MjZlNTUzNTUxMzci_pc', {
        method: 'POST',
        headers: {
            'X-API-Key': 'pit-7ec957d2-3a33-463d-b45b-5f2a0345fcfb',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => {
        if (response.ok) {
            console.log('Data successfully sent to CRM');
        } else {
            console.error('Failed to send data to CRM');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}