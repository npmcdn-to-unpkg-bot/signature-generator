const path = require("path");
const express = require("express");
const child_process = require("child_process");

/**
 * Start stylus compilation process
 */
const stylusBin = path.join(__dirname, "node_modules", "stylus", "bin", "stylus");
const stylusProcess = child_process.spawn(stylusBin, [
    "--sourcemap",
    "-w",
    path.join(__dirname, "styles", "sig.styl"),
    "--out",
    path.join(__dirname, "site/styles")
]);

stylusProcess.stdout.pipe(process.stdout);
stylusProcess.stderr.pipe(process.stdout);

stylusProcess.on("error", (error) => {
    console.log(`Stylus error: ${error}`);
});

stylusProcess.on("close", (code) => {
    if (code !== 0) {
        console.log(`Stylus exited with code ${code}.`);
    }
});

/**
 * Start express HTTP server
 */
const app = express();

app.use(express.static(path.join(__dirname, "site")));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on ${process.env.PORT || 3000}`);
});
