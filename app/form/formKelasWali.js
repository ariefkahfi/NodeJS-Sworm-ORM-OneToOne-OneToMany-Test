export class FormKelasWali{
    saveToKelasWali(kelasWali,
                    callbackSuccess,
                    callbackError){
        $.ajax({
            type : "POST",
            url : "http://localhost:9600/kelas-wali",
            success : (result,status,xhr)=>{
                callbackSuccess(result);
            },
            error : (xhr ,status, error)=>{
                callbackError(error);
            },
            data : kelasWali
        });
    }

    deleteRelation(
        kelas_id,wali_id,callbackSuccess,callbackError){
        $.ajax({
            type : "GET",
            url : `http://localhost:9600/kelas-wali/${wali_id}/${kelas_id}`,
            success : (result,status,xhr)=>{
                callbackSuccess(result);
            },
            error : (xhr ,status , error)=>{
                callbackError(error);
            }
        });
    }
}