console.log('Client script executed');


function makePlan(event) {
   
    event.preventDefault();

    // Get user input
    const destination = document.getElementById('destination').value;
    const numberOfDays = document.getElementById('numberOfDays').value;

    // Make an AJAX request to your server-side script
    fetch(`/run-server-script?destination=${destination}&numberOfDays=${numberOfDays}`)
        .then(response => response.text())
        .then(data => {
            // Update the <p> tag with the response
            document.getElementById('output').textContent = data;
        })
        .catch(error => console.error('Error:', error));
}

// Attach the makePlan function to the click event of the "Make my Plan" link
document.addEventListener('DOMContentLoaded', function () {
    const makePlanLink = document.getElementById('makePlanLink');
    makePlanLink.addEventListener('click', makePlan);
});
