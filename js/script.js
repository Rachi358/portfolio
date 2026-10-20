
document.addEventListener("DOMContentLoaded", function () {
    // Check whether EmailJS loaded
    if (typeof emailjs === "undefined") {
        console.error("EmailJS library is not loaded.");
        return;
    }

    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (!contactForm || !formStatus) {
        console.error("Contact form or status element not found.");
        return;
    }

    emailjs.init({
        publicKey: "nYxBn7O8EL_kf3UJL"
    });

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const sendButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        sendButton.disabled = true;
        sendButton.textContent = "Sending...";
        formStatus.textContent = "Sending your message...";
        formStatus.className = "";

        try {
            const response = await emailjs.sendForm(
                "service_z97m3jq",
                "template_bbn196e",
                contactForm
            );

            console.log("EmailJS response:", response);

            formStatus.textContent = "Message sent successfully!";
            formStatus.className = "text-success";

            contactForm.reset();

        } catch (error) {
            console.error("EmailJS error details:", error);

            formStatus.textContent =
                "Failed to send: " +
                (error.text || error.message || JSON.stringify(error));

            formStatus.className = "text-danger";

        } finally {
            sendButton.disabled = false;
            sendButton.textContent = "Send Message";
        }
    });
});
