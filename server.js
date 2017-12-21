let express = require("express");
let app = express();
let pthReader = require("./pathReader");
let databaseModel = require("./app/databaseModel");
let bodyParser = require("body-parser");

let kelas = databaseModel.kelasModel();
let waliKelas = databaseModel.waliKelas();

//one to one model
let kelasWali = databaseModel.kelasWaliModel();

let murid = databaseModel.muridModel();

app.use(bodyParser.urlencoded({extended : true}));

/*
api endpoints
 */



app.get("/remaining-class",(req,res)=>{
    databaseModel
        .getInstanceDB()
        .query("select wk.wali_id , wk.nama_wali , k.kelas_id  from wali_kelas wk  " +
            " right join kelas_wali kw  on wk.wali_id = kw.wali_id  " +
            " right join kelas k  on k.kelas_id = kw.kelas_id" +
            "    where wk.wali_id is null ")
        .then((data)=>{
            res.json(data);
        })
        .catch((err)=>{
            // res.writeHead(500);
            res.json(err);
        });
});
app.get("/remaining-homeroom",(req,res)=>{
    databaseModel
        .getInstanceDB()
        .query(" select wk.wali_id , wk.nama_wali , k.kelas_id  from wali_kelas wk " +
            " left join kelas_wali kw  on wk.wali_id = kw.wali_id " +
            " left join kelas k  on k.kelas_id = kw.kelas_id" +
            " where k.kelas_id is null ")
        .then((data)=>{
            res.json(data);
        })
        .catch(reason => {
            // res.writeHead(500);
            res.json(reason);
        });
});

app.get("/kelas",(req,res)=>{
   databaseModel
       .getInstanceDB()
       .query("select kelas_id from kelas")
       .then((result)=>{
           res.json(result);
       })
       .catch((err)=>{
           // res.writeHead(500);
           res.json(err);
       });
});
app.post("/kelas",(req,res)=>{
    kelas({
        kelas_id : req.body.kelas_id,
        nama_kelas : req.body.nama_kelas
    }).save()
        .then(()=>{
           res.json({
               message : "Query ok /kelas",
               statusCode : 200
           })
        })
        .catch((err)=>{
            // res.writeHead(500);
            res.json(err);
        });
});

//insert data (/wali-kelas)(POST)
app.post("/wali-kelas",(req,res)=>{
    waliKelas({
        wali_id : req.body.wali_id ,
        nama_wali : req.body.nama_wali ,
        jenkel : req.body.jenkel,
        alamat : req.body.alamat
    }).save()
        .then(()=>{
            res.json({
                message : "Query OK /wali-kelas",
                statusCode : 200
            })
        })
        .catch((err)=>{
            // res.json(500);
            res.json(err);
        });
});
//list data (/wali-kelas)(GET)
app.get("/wali-kelas",(req,res)=>{
   databaseModel
       .getInstanceDB()
       .query("select * from wali_kelas")
       .then((result)=>{
           res.json(result);
       })
       .catch((err)=>{
           // res.writeHead(500);
           res.json(err);
       });
});

//one to one bridge table(POST=>insert_data)
app.post("/kelas-wali",(req,res)=>{
    kelasWali({
        kelas_id : req.body.kelas_id ,
        wali_id : req.body.wali_id
    }).save()
        .then(()=>{
            res.json({
                message : "Query ok /kelas-wali (one-to-one)",
                statusCode : 200
            })
        })
        .catch((err)=>{
            // res.writeHead(500);
            res.json(err);
        });
});

//one to one bridge table(delete data)
app.get("/kelas-wali/:wali_id/:kelas_id",(req,res)=>{
   databaseModel
       .getInstanceDB()
       .query("delete from kelas_wali where wali_id = @w_id and kelas_id = @k_id",
           {
               w_id : req.params.wali_id,
               k_id : req.params.kelas_id
           }
           )
       .then(()=>{
            res.json({
                message : "query OK delete relation one-to-one",
                statusCode : 200
            });
       })
       .catch((err)=>{
          res.json(err);
       });
});

//one to one bridge table(GET=>inner_join)
app.get("/kelas-wali",(req,res)=>{
    databaseModel
        .getInstanceDB()
        .query("select k.kelas_id , k.nama_kelas , wk.nama_wali , wk.wali_id " +
            "     from kelas k inner join kelas_wali kw" +
            "     on k.kelas_id = kw.kelas_id " +
            "     inner join wali_kelas wk" +
            "     on wk.wali_id = kw.wali_id")
        .then((data)=>{
            res.json(data);
        })
        .catch((error)=>{
            // res.writeHead(500);
            res.json(error);
        });
});

//one to many foreign key (murid's table)(GET=> select data)
app.get("/murid",(req,res)=>{
   databaseModel
       .getInstanceDB()
       .query("select m.kelas_id , m.nama_murid, m.alamat , m.jenkel , k.nama_kelas " +
           " from murid m " +
           " inner join kelas k  on m.kelas_id = k.kelas_id")
       .then((data)=>{
           res.json(data);
       })
       .catch((err)=>{
          // res.writeHead(500);
          res.json(err);
       });
});
//one to many foreign key (murid's table)(POST=>insert data)
app.post("/murid",(req,res)=>{
    murid({
        murid_id : req.body.murid_id,
        nama_murid : req.body.nama_murid ,
        alamat : req.body.alamat_murid,
        jenkel : req.body.jenkel_murid,
        kelas_id : req.body.kelas_id
    }).save()
        .then(()=>{
            res.json({
                message : "Query ok /murid",
                statusCode : 200
            });
        })
        .catch((err)=>{
           // res.writeHead(500);
           res.json(err);
        });
});
/*
api endpoints
 */



pthReader.initCSSFile(app,express);
pthReader.initJSFile(app,express);






app.get("/",(req,res)=>{
    pthReader.ldHTMLFile(res,"index");
});



//default listen to localhost
app.listen(9600,()=>{
    console.log("listening on port 9600");
});
