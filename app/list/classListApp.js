export class ListKelas{
    getAllKelasOnlyId(callbackSuccess,callbackError){
        $.ajax({
            type : "GET",
            url : "http://localhost:9600/kelas",
            success : (result,status,xhr)=>{
                callbackSuccess(result);
            },
            error : (xhr,status,error)=>{
                callbackError(error);
            }
        });
    }

    getKelasWaliList(
        callbackSuccess,
        callbackError
    ){
        $.ajax({
            type: "GET",
            url:"http://localhost:9600/kelas-wali",
            success : (result,status,xhr)=>{
                callbackSuccess(result);
            },
            error : (xhr,status,error)=>{
                callbackError(error);
            }
        });
    }
}