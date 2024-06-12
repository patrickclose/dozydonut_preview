document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            firstName: document.getElementById('first-name').value,
            lastName: document.getElementById('last-name').value,
            workEmail: document.getElementById('work-email').value,
            businessPhone: document.getElementById('business-phone').value,
            companyWebsite: document.getElementById('company-website').value,
            businessChallenges: document.getElementById('business-challenges').value,
        };

        const response = await fetch('/api/send_email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Email sent successfully!');
            form.reset();
        } else {
            alert('Failed to send email.');
        }
    });
});
