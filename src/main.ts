import { App } from "./App";
const app = new App(__dirname.replace('dist', ''));

/*
* Enable logging
*
* app.logging();
* */

/*
* Init routes
*
* app.routes();
* */

/*
* Init cookie parser
*
* app.cookie();
* */

/*
* Init body parser
*
* app.body();
* */

/*
* Serve static files
*
* app.staticFiles();
* */

/*
* Render views
* Default - pug
* app.setViewEngine(view?);
* */

/*
* Start server
*
* app.init();
* */

app.logging();
app.routes();
app.cookie();
app.body();
app.setViewEngine();
app.init();