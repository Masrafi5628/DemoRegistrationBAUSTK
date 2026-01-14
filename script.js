const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const responseMessage = document.getElementById('responseMessage');

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwtA_eS7PbjBmIc-gKgZBq5Xe1V8sJIWXaJmnxQOhMw9UGrKJUsinZCH51nmbo_yNSA/exec';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

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
            showMessage('Form submitted successfully!', 'success');
            form.reset();
        } else {
            showMessage('Error submitting form. Please try again.', 'error');
        }
    } catch (error) {
        showMessage('Network error. Please check your connection and try again.', 'error');
        console.error('Error:', error);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit';
    }
});

function showMessage(message, type) {
    responseMessage.textContent = message;
    responseMessage.className = `message ${type} show`;
    setTimeout(() => {
        responseMessage.classList.remove('show');
    }, 5005);
}
