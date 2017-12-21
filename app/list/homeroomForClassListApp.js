export class HomeroomForClass{
    getRemainingClasses(
        callbackSuccess,
        callbackError
    ){
        $.ajax({
            type : "GET",
            url : "http://localhost:9600/remaining-class",
            success : (result,status,xhr)=>{
                callbackSuccess(result);
            },
            error : (status , xhr , error)=>{
                callbackError(error);
            }
        });
    }
    getRemainingHomeroom(
        callbackSuccess,
        callbackError
    ){
      $.ajax({
          type : "GET",
          url : "http://localhost:9600/remaining-homeroom",
          success : (result,status,xhr)=>{
              callbackSuccess(result);
          },
          error : (status,xhr,error)=>{
              callbackError(error);
          }
      });
    }
}