const timein = document.getElementById("timein");
const timeout = document.getElementById("timeout");

timein.textContent = localStorage.getItem("setTime").substring(0, 5);
timeout.textContent = localStorage.getItem("setTime").substring(6, 12);

const timeinInt =
  parseInt(timein.textContent.substring(0, 2)) +
  parseFloat(timein.textContent.substring(4, 6) / 60);
const timeoutInt =
  parseInt(timeout.textContent.substring(0, 2)) +
  parseFloat(timeout.textContent.substring(4, 6) / 60);

document.querySelectorAll(".scale-out").forEach(async (elem) => {
  await new Promise((r) => setTimeout(r, 100));
  elem.classList.add("scale-in");
});

const btnCancel = document.querySelector(".btn");
btnCancel.onclick = () => {
  window.restart.seppuku();
  window.localStorage.clear();
  window.location = "main.html";
};

const eLoop = async () => {
  const date = new Date();
  const currentHours = date.getHours();
  const currentMinutes = parseFloat(date.getMinutes() / 60);
  const currentTime = currentHours + currentMinutes;
  if (timeoutInt <= currentTime) {
    document.getElementById("status").textContent = "Logging in...";
    await new Promise((r) => setTimeout(r, 2000));
    document.getElementById("status").textContent = "Done";
    timein.style.transform = "scale(1)";
    timeout.style.transform = "scale(1)";
    btnCancel.textContent = "Go Back";
    clearInterval(id);
    window.localStorage.clear();
  } else if (timeinInt === currentTime) {
    document.getElementById("status").textContent = "Logging in...";
  } else if (timeinInt > currentTime) {
    document.getElementById("status").textContent = "Waiting";
    timein.style.transform = "scale(2)";
    timeout.style.transform = "scale(1)";
  } else {
    document.getElementById("status").textContent = "Waiting";
    timein.style.transform = "scale(1)";
    timeout.style.transform = "scale(2)";
  }
};

const id = setInterval(eLoop, 1000);
timein.style.transform = "scale(1)";
timeout.style.transform = "scale(1)";
