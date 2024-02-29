import path from "path";
import express, { Request, Response } from "express";
import childProcess from "child_process";
import { renderToString } from "react-dom/server";
import { Route, Routes } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { Helmet } from "react-helmet";
import router from "@/router";

const app = express();

app.use(express.static(path.resolve(process.cwd(), "client_build")));

app.get("*", (req: Request, res: Response) => {
  const content = renderToString(
    <StaticRouter location={req.path}>
      <Routes>
        {router?.map((item, index) => {
          return <Route {...item} key={index} />;
        })}
      </Routes>
    </StaticRouter>
  );

  const helmet = Helmet.renderStatic();

  res.send(`
    <html>
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
        </head>
        <body>
            <div id="root">${content}</div>
            <script src="/index.js"></script>
        </body>
    </html>
    `);
});

app.listen(3000, () => console.log("SSR-server listen on 3000"));

childProcess.exec("start http://127.0.0.1:3000");
