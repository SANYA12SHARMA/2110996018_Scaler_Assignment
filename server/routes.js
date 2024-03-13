import express from "express";
const router = express.Router();
import spawn from "child_process";

router.get("/checkPath", async (req, res) => {
    var source = req.query.start;
    var destination = req.query.dest;
    console.log(source, destination);
    let Data = "";
    
    const javaprog = spawn('java', ['-cp', './Algorithm', 'ShortestPath', source, destination]);
    
    javaprog.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    
    javaprog.stdout.on('data', function (data) {
        console.log(Data += data);
    });
    
    javaprog.on('close', (code) => {
        res.send(Data);
    });
});

export default router;