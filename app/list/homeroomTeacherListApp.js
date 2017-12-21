export class HomeroomTeacherList{
    getAllHomeroomTeachers(
        callbackSuccess,
        callbackError
    ){
        $.ajax({
            type : "GET",
            url : "http://localhost:9600/wali-kelas",
            success : (result,status,xhr)=>{
                callbackSuccess(result);
            },
            error : (xhr,status,error)=>{
                callbackError(error);
            }
        });
    }
}