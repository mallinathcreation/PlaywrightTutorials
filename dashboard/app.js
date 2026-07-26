fetch("results.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Unable to load results.json");
        }
        return response.json();
    })

    .then(data => {

        document.getElementById("passed").textContent = data.passed;
        document.getElementById("failed").textContent = data.failed;
        document.getElementById("skipped").textContent = data.skipped;
        document.getElementById("duration").textContent = data.duration;
        document.getElementById("branch").textContent = data.branch;
        document.getElementById("run").textContent = "#" + data.run;

        // Success Rate

        const total =
            Number(data.passed) +
            Number(data.failed) +
            Number(data.skipped);

        const successRate =
            total === 0
                ? 0
                : ((data.passed / total) * 100).toFixed(1);

        document.getElementById("successRate").textContent =
            successRate + "%";

        document.getElementById("summary").textContent =
            `${data.passed} / ${total} Tests Passed`;

        // Animate Progress Bar
        setTimeout(() => {
            document.getElementById("progressBar").style.width =
                successRate + "%";
        }, 200);

        // Status Badge

        const status = document.getElementById("status");

        if (data.status.toUpperCase() === "SUCCESS") {

            status.innerHTML =
                `<span class="badge success">SUCCESS</span>`;

        } else {

            status.innerHTML =
                `<span class="badge failed">FAILED</span>`;

        }

    })

    .catch(error => {

        console.error(error);
        document.getElementById("status").innerHTML =
            `<span class="badge failed">ERROR</span>`;

    });