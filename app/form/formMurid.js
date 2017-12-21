export class FormMurid{
    saveMurid(
        murid,
        callbackSuccess,
        callbackError
    ){
        $.ajax({
            type  : "POST",
            url  : "http://localhost:9600/murid",
            success : (result,status,xhr)=>{
                callbackSuccess(result);
            },
            error : (xhr,status,error)=>{
                callbackError(error);
            },
            data : murid
        });
    }
}