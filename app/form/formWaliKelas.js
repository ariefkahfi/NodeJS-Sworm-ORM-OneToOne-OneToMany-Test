export class FormWaliKelas{
    saveWaliKelas(
        waliKelas,
        callbackSuccess,
        callbackError
    ){
        $.ajax({
            type : "POST",
            url : "http://localhost:9600/wali-kelas",
            data : waliKelas,
            success : (result,status,xhr)=>{
                callbackSuccess(result);
            },
            error : (xhr,status,error)=>{
                callbackError(error);
            }
        })
    }
}