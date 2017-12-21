const path = require("path");


let initCSSFile = (expressApp , expressStatic)=>{
    expressApp.use("/css",expressStatic.static(path.join(__dirname,"css")));
}

let initJSFile = (expressApp,expressStatic)=>{
    expressApp.use("/js",expressStatic.static(path.join(__dirname,"dist")));
}

let loadHTMLFile = (response,htmlFileName)=>{
    response.sendFile(path.join(__dirname+"/public_html",htmlFileName+".html"));
}



module.exports = {
    ldHTMLFile : loadHTMLFile,
    initCSSFile : initCSSFile,
    initJSFile : initJSFile
}
