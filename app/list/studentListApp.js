export class StudentList{
    getAllStudentsWithClassNames(
        callbackSuccess,
        callbackError
    ){
        $.ajax({
            type : "GET",
            url : "http://localhost:9600/murid",
            success : (result, status ,xhr)=>{
                callbackSuccess(result);
            },
            error : (xhr,status,error)=>{
                callbackError(error);
            }
        });
    }
}