const menu_icon = document.getElementById('menu_icon');
const navLinks = document.getElementById('nav-links');

// Toggles mobile menu icon on screen shrink
menu_icon.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menu_icon.classList.toggle('active');
});

// Closes mobile navigation menu when option selected
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menu_icon.classList.remove('active');
    });
});

//clipboard action for email/phone no.
// Add click event listeners to all contact items
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('click', function(e) {
        const textToCopy = this.getAttribute('data-copy-text');
        const tooltip = this.querySelector('.tooltip');
        
        // Check if Clipboard API is available
        if (!navigator.clipboard) {
            console.log("Clipboard API not available - falling back to execCommand");
            // Fallback for older browsers
            fallbackCopyTextToClipboard(textToCopy, tooltip);
            return;
        }
        
        // Use modern Clipboard API
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                // Success
                console.log("Text copied successfully");
                showTooltip(tooltip, "Copied!");
            })
            .catch(err => {
                // Error
                console.error("Clipboard write failed: ", err);
                showTooltip(tooltip, "Copy failed");
                
                // Try fallback
                fallbackCopyTextToClipboard(textToCopy, tooltip);
            });
    });
});

// Fallback function for older browsers
function fallbackCopyTextToClipboard(text, tooltip) {
    try {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        
        // Select and copy
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
            console.log("Fallback: Text copied successfully");
            showTooltip(tooltip, "Copied!");
        } else {
            console.log("Fallback: Copy command was unsuccessful");
            showTooltip(tooltip, "Copy failed");
        }
    } catch (err) {
        console.error("Fallback: Could not copy text: ", err);
        showTooltip(tooltip, "Copy failed");
    }
}

// Function to show copy tooltip with animation
function showTooltip(tooltip, message) {
    // Update tooltip text
    tooltip.textContent = message;
    
    // Reset animation by removing class
    tooltip.classList.remove('show');
    
    // Force browser to recognize the removal before adding again
    void tooltip.offsetWidth;
    
    // Show tooltip with animation
    tooltip.classList.add('show');
    
    // Reset tooltip text after animation completes if it was an error
    if (message !== "Copied!") {
        setTimeout(() => {
            tooltip.textContent = "Copied!";
        }, 2500);
    }
}

// Confidential Information Warning, triggered on form submission
// const form = document.getElementById('contact-form');

// function confirmDisclaimer(event) {
//     const confirmed = confirm(
//         "Please do not include personal or medical information in inquiries. " +
//         "For private matters, please make an appointment, or call us directly " +
//         "at (315) 729-5964.\n\nSelect OK to confirm and send."
//     );

//     if (!confirmed) {
//         event.preventDefault(); // Stop the form submission only if they cancel
//         return false;
//     }
//     // If confirmed, form submits normally
//     return true;
// };

// const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 15,
//     center: {lat:42.6564, lng:-77.0714},
// });

// const marker = new google.maps.Marker({
//     position: {lat:42.6564, lng:-77.0714},
//     map: map,
//     title: "Axis Integrative Services",
// });



const showModal = (id) => {
    document.getElementById(id).style.display = 'block';
};

const hideModal = (id) => {
    document.getElementById(id).style.display = 'none';
};

document.getElementById('attributionsLink').addEventListener('click', (e) => {
    e.preventDefault();
    showModal('attributionsModal');
});

document.getElementById('creditsLink').addEventListener('click', (e) => {
    e.preventDefault();
    showModal('creditsModal');
});

document.querySelectorAll('.close').forEach(span => {
    span.addEventListener('click', () => {
        hideModal(span.getAttribute('data-modal'));
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

