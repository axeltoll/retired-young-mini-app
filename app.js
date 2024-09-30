document.getElementById('get-started-btn').addEventListener('click', () => {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('form-screen').style.display = 'block';
});

document.getElementById('details-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect user data
    const userData = {
        full_name: document.getElementById('full-name').value,
        jifu_id: document.getElementById('jifu-id').value,
        email: document.getElementById('email').value,
        phone_number: document.getElementById('phone-number').value
    };

    // Send data to your CRM
    await sendToCRM(userData);

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
    } else {
        alert('Thank you for completing the onboarding!');
    }
});

// Function to send data to the CRM
async function sendToCRM(userData) {
    const url = 'https://connect.pabbly.com/workflow/sendwebhookdata/IjU3NjYwNTZkMDYzMTA0MzQ1MjZlNTUzNTUxMzci_pc';
    const headers = {
        'X-API-Key': 'pit-7ec957d2-3a33-463d-b45b-5f2a0345fcfb',
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('CRM response:', data);
    } catch (error) {
        console.error('Failed to send data to CRM:', error);
    }
}