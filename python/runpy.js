const { PythonShell } = require("python-shell");
const path = require("path");

let py;
async function handleTimeInOut(timein, timeout) {
  let dir = __dirname;
  let options = {
    scriptPath: path.join(__dirname, "./log-me-in/"),
    args: [timein, timeout, dir],
    pythonPath: path.join(__dirname, "../win-dev/scripts/python.exe"),
  };
  py = PythonShell.run("_scheduler.py", options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log(results);
  });
  return await py;
}

const killPy = () => {
  py.kill("SIGINT");
  return py;
};

module.exports = { handleTimeInOut, killPy };
