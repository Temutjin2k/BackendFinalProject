const form = document.querySelector("#bmiForm");

async function sendData() {
    const weight = document.querySelector("#weight_id").value.trim();
    const height = document.querySelector("#height_id").value.trim();
    const resultContainer = document.querySelector("#resultContainer");

    if (!weight || !height) {
        resultContainer.innerHTML = `<p class="text-danger">Please enter both weight and height.</p>`;
        return;
    }

    const params = new URLSearchParams({
        weight: encodeURIComponent(weight),
        height: encodeURIComponent(height)
    }).toString();

    try {
        const response = await fetch(`/api/bmi?${params}`);

        if (response.ok) {
            const result = await response.json();

            let categoryClass = "text"; 
            if (result.category === "Normal") categoryClass = "text-success";
            if (result.category === "Overweight") categoryClass = "text-warning";
            if (result.category === "Obese") categoryClass = "text-danger";

            resultContainer.innerHTML = `
                <div class="alert ${categoryClass} mt-3">
                    <h4 class="mb-2">BMI: ${result.bmi.toFixed(2)}</h4>
                    <p class="mb-0"><strong>Category: ${result.category}</strong></p>
                </div>
            `;
        } else {
            const errorData = await response.json();
            resultContainer.innerHTML = `<p class="text-danger">Failed to calculate BMI. ${errorData.error}</p>`;
        }
    } catch (error) {
        console.error("Error:", error);
        resultContainer.innerHTML = `<p class="text-danger">An error occurred while sending data.</p>`;
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendData();
});
