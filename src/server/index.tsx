import path from "path";
import express, { Request, Response } from "express";
import childProcess from "child_process";
import { renderToString } from "react-dom/server";
import { Route, Routes, matchRoutes, RouteObject } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import router from "@/router";
import { serverStore } from "@/store";

const bodyParser = require("body-parser");

const app = express();

app.use(express.static(path.resolve(process.cwd(), "client_build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/getDemoData", (req: Request, res: Response) => {
  res.send({
    data: req.body,
    status_code: 0,
  });
});

app.get("*", (req: Request, res: Response) => {
  const routeMap = new Map<string, () => Promise<any>>();
  router.forEach((item) => {
    if (item.path && item.loadData)
      routeMap.set(item.path, item.loadData(serverStore));
  });

  const matchRouters = matchRoutes(router as RouteObject[], req.path);

  const promises: Array<() => Promise<any>> = [];

  matchRouters?.forEach((item) => {
    if (routeMap.has(item.pathname))
      promises.push(routeMap.get(item.pathname) as () => Promise<any>);
  });

  Promise.all(promises).then(() => {
    const content = renderToString(
      <Provider store={serverStore}>
        <StaticRouter location={req.path}>
          <Routes>
            {router?.map((item, index) => {
              return <Route {...item} key={index} />;
            })}
          </Routes>
        </StaticRouter>
      </Provider>
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
            <script>
              window.context = {
                state: ${JSON.stringify(serverStore.getState())}
              }
            </script>
            <script src="/index.js"></script>
        </body>
    </html>
    `);
  });
});

app.listen(3000, () => console.log("SSR-server listen on 3000"));

childProcess.exec("start http://127.0.0.1:3000");
