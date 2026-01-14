const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const responseMessage = document.getElementById('responseMessage');

// Replace with your Apps Script Web App URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyrTM0OT8RRHCpHDSvzLleZcRu_u0fNBwuoEHH0w1J4UNJ8shFiBhTNoXjGp3kEvJc/exec';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validate passwords match
    if (password !== confirmPassword) {
        showMessage('Passwords do not match. Please try again.', 'error');
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Registering...';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.timestamp = new Date().toISOString();

    try {
        const response = await fetch(SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'text/plain',
            },
        });

        const result = await response.json();

        if (result.status === 'success') {
            showMessage('Registration successful!', 'success');
            form.reset();
        } else {
            showMessage('Error submitting form. Please try again.', 'error');
        }
    } catch (error) {
        showMessage('Network error. Please check your connection and try again.', 'error');
        console.error('Error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Register';
    }
});

function showMessage(message, type) {
    responseMessage.textContent = message;
    responseMessage.className = `message ${type} show`;
    setTimeout(() => {
        responseMessage.classList.remove('show');
    }, 5000);
}
