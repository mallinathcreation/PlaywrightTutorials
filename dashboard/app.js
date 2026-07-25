fetch("results.json")
    .then(response => response.json())
    .then(data => {

        document.getElementById("status").innerHTML = data.status;

        document.getElementById("passed").innerHTML = data.passed;

        document.getElementById("failed").innerHTML = data.failed;

        document.getElementById("skipped").innerHTML = data.skipped;

        document.getElementById("duration").innerHTML = data.duration;

        document.getElementById("branch").innerHTML = data.branch;

        document.getElementById("run").innerHTML = data.run;

    });