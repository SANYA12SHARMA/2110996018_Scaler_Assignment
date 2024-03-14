import express from "express";
const router = express.Router();
import {spawn} from "child_process";

router.get('/shortestPath', async (req, res) => {
    const source = parseInt(req.body.source);
    const destination = parseInt(req.body.destination);

    // Check if source and destination are valid integers
    if (isNaN(source) || isNaN(destination)) {
        return res.status(400).send('Source and destination must be valid integers.');
    }

    // Check if source and destination are within the acceptable range
    const maxNodeIndex = 5; 
    if (source < 0 || source > maxNodeIndex || destination < 0 || destination > maxNodeIndex) {
        return res.status(400).send('Source and destination must be integers between 0 and ' + maxNodeIndex + '.');
    }
    // Check if source and destination are distinct
    if (source === destination) {
        return res.status(400).send('Source and destination nodes must be distinct.');
    }
    let Data = "";
    
    const javaProgram = spawn('java', ['-cp', './algorithm', 'shortestPath', source, destination]);

    
    javaProgram.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    
    javaProgram.stdout.on('data', function (data) {
        console.log(data.toString());
        // If you want to store the data, you can append it to the Data variable
        Data += data.toString();
    });
    
    javaProgram.on('close', (code) => {
        res.send(Data);
    });
});

export default router;