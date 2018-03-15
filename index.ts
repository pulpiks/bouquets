import Service from "./service";

process.stdin.setEncoding("utf8");

const bloomonService = new Service();

process.stdin.pipe(require("split")())
    .on("data", (line) => {
        bloomonService.processInput(line);
    })
    .on("end", () => {
        console.log("end");
    });
