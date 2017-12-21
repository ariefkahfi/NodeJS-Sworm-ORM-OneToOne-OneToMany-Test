const sworm = require("sworm");
/*
  database model
  1 . Kelas (kelas_id, nama_kelas )
  2. Wali Kelas (wali_id , nama_wali , jenkel , alamat)
  3. Murid (murid_id , nama_murid   , alamat , jenkel  , kelas_id(foreign_key))


  Kelas & Wali Kelas (One to One) (junction table)
  Kelas & Murid  (One To Many) (foreign key on murid's table )
 */

 function DatabaseModel(){
    this.getInstanceDB = ()=>{
        return sworm.db({
            driver : "mysql",
            config: {
                host : "localhost",
                user : "arief",
                password : "arief",
                database : "sworm_db5"
            }
        });
    }

    this.kelasModel = ()=>{
        return this
            .getInstanceDB()
            .model({table: "kelas"});
    }
    this.muridModel = ()=>{
        return this
            .getInstanceDB()
            .model({table : "murid"});
    }

    //wali_kelas table
    this.waliKelas = ()=>{
        return this
            .getInstanceDB()
            .model({table : "wali_kelas"});
    }

    //one to one bridge table between kelas and murid
    this.kelasWaliModel = ()=>{
        return this
            .getInstanceDB()
            .model({table : "kelas_wali",id:["kelas_id","wali_id"]});
    }

}

module.exports = new DatabaseModel();