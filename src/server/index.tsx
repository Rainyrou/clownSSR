import express, { Request, Response } from "express";
import childProcess from "child_process";

const app = express();

app.get("*", (req: Request, res: Response) => {
  res.send(`
    <html
        <body>
            <div>Hello SSR</div>
        </body>
    </html>
    `);
});

app.listen(3000, () => console.log("SSR-server listen on 3000"));

childProcess.exec("start http://127.0.0.1:3000");
