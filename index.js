import jsonData from './index.json' assert{type: "json"}
import { v4 as uuidv4 } from 'uuid';
import http from 'http'
import fs from 'fs'
function creatingServer() {
    const server = http.createServer((req, res) => {
        if (req.url === '/') {
            res.writeHead(200, { "Content-Type": "text/plain" })
            res.end("")
        }
        else if (req.url === '/html') {
            res.writeHead(200, { "Content-Type": "text/html" })
            const htmlData = fs.readFileSync('index.html')
            res.end(htmlData)
        }
        else if (req.url === '/json') {
            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify(jsonData, null, 2))
        }
        else if (req.url === '/uuid') {
            res.writeHead(200, { "Content-Type": "application/json" })
            res.end(JSON.stringify({ uuid: uuidv4() }, null, 2))
        }
        else if (/^\/status\/([0-9]+)$/.test(req.url)) {
            let url = req.url
            res.writeHead(200, { "Content-Type": "text/plain" })
            let array = url.split('/')
            if (array[2] === '100' || array[2] === '200' || array[2] === '300' || array[2] === '400' || array[2] === '500') {
                res.end(array[2] + " status code")
            } else {
                res.end("Enter the status code value as 100 or 200 or 300 or 400 or 500 in url")
            }
        }
        else if (/^\/delay\/([0-9]+)$/.test(req.url)) {
            let url = req.url
            res.writeHead(200, { "Content-Type": "text/plain" })
            let array = url.split('/')
            setTimeout(() => {
                res.end("200 status code")
            }, Number(array[2]))
        }
        else {
            res.end("EXIT")
        }


    })
    server.listen(3000, () => {
        console.log("Server running on port 3000")
    })
}
creatingServer()