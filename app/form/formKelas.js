export class FormKelas{
    saveKelas(student, callbackSuccess, callbackError){
        $.ajax({
            type : "POST",
            url : "http://localhost:9600/kelas",
            success : (result,status,xhr)=>{
                callbackSuccess(result);
            },
            error  : (xhr,status,error)=>{
                callbackError(error);
            },
            data : student
        });
    }
}