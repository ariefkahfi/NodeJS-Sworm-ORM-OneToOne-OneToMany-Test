//jQuery responsive

import {FormKelas} from "./form/formKelas";
import {ListKelas} from "./list/classListApp";
import {FormWaliKelas} from "./form/formWaliKelas";
import {FormMurid} from "./form/formMurid";
import {HomeroomTeacherList} from "./list/homeroomTeacherListApp";
import {StudentList} from "./list/studentListApp";
import {FormKelasWali} from "./form/formKelasWali";
import {HomeroomForClass} from "./list/homeroomForClassListApp";

let formKelas = new FormKelas();
let formWaliKelas = new FormWaliKelas();
let listKelas = new ListKelas();
let formMurid = new FormMurid();
let listHomeroomTeacher = new HomeroomTeacherList();
let studentList = new StudentList();
let formKelasWali = new FormKelasWali();
let homeroomForClass = new HomeroomForClass();


$("#save-wali-kelas").click(()=>{
    let waliId = $("#wali-id").val();
    let waliNama = $("#wali-nama").val();
    let waliJenkel = $("input[type=radio]:checked").val();
    let waliAlamat = $("#wali-alamat").val();

    formWaliKelas.saveWaliKelas({
        wali_id : waliId,
        nama_wali:  waliNama,
        jenkel  : waliJenkel,
        alamat  : waliAlamat
    },(data)=>{
        console.log(data);
    },(err)=>{
        console.log(err);
    });

});

$("#save-class").click(()=>{
   let idKelas = $("#new-kelas-id").val();
   let namaKelas = $("#new-nama-kelas").val();


   if(idKelas === '' || idKelas === undefined
   || namaKelas === '' || namaKelas === undefined){
       alert("Fields empty");
   }else{
       formKelas.saveKelas({
           kelas_id : idKelas,
           nama_kelas : namaKelas
       },(data)=>{
           console.log(data);
       },(err)=>{
           console.log(err);
       });
   }


});

$("#save-student").click(()=>{



    let idMurid = $("#id_murid").val();
    let namaMurid = $("#nama_murid").val();
    let alamatMurid = $("#alamat_murid").val();
    let jenkelMurid = $("input[type=radio]:checked").val();
    let kelasMurid = $("#select_kelas").find("option:selected").val();



    if(idMurid === ''
        || idMurid === undefined ||
           namaMurid === '' ||
           namaMurid === undefined ||
    alamatMurid === '' ||
    alamatMurid === undefined ||
    jenkelMurid === '' ||
    jenkelMurid === undefined ||
    kelasMurid === '' ||
    kelasMurid === undefined){
        alert("Empty fields");
    }else{
        formMurid
            .saveMurid(
                {
                    murid_id: idMurid,
                    nama_murid: namaMurid,
                    alamat_murid : alamatMurid,
                    jenkel_murid : jenkelMurid,
                    kelas_id : kelasMurid
                },(data)=>{
                    console.log(data);
                },(err)=>{
                    console.log(err);
                });
    }
});


let homeroomTeacherList = ()=>{
    listHomeroomTeacher
        .getAllHomeroomTeachers((data)=>{
            $("#table-homeroom").empty();
            $("#table-homeroom").append(`
                <tr>
                    <td>Name</td>
                    <td>Gender</td>
                    <td>Address</td>
                </tr>
            `);
            data.forEach((val)=>{
               $("#table-homeroom")
                   .append(`
                        <tr>
                            <td>${val.nama_wali}</td>
                            <td>${val.jenkel}</td>
                            <td>${val.alamat}</td>
                        </tr>
                   `);
            });
        },(error)=>{
            console.log(error);
        });
}
let initStudentListData = ()=>{
    studentList
        .getAllStudentsWithClassNames((data)=>{
            $("#table-student").empty();
            $("#table-student")
                .append(`
                    <tr>
                        <td>Name</td>
                        <td>Address</td>
                        <td>Gender</td>
                        <td>Class Name</td>
                    </tr>
                `);
            data.forEach((val)=>{
                $("#table-student")
                    .append(`
                        <tr>
                            <td>${val.nama_murid}</td>
                            <td>${val.alamat}</td>
                            <td>${val.jenkel}</td>
                            <td>${val.nama_kelas}</td>
                        </tr>                    
                    `);
            });
        },(err)=>{
            console.log(err);
        });
}





let initKelasWaliInnerJoin = ()=>{


    listKelas.getKelasWaliList((data)=>{
        $("#table-class")
            .empty();
        $("#table-class")
            .append(`
                <tr>
                    <td>Class Name</td>
                    <td>Homeroom Teacher Name</td>
                    <td>Delete Action</td>
                </tr>
            `);
        data.forEach((val)=>{
            // $("#table-class")
            //     .append(`<tr><td>${val.nama_kelas}</td><td>${val.nama_wali}</td></tr>`);

            let newTr = document.createElement("tr");

            let tdNamaKelas = document.createElement("td");
            let tdNamaWali = document.createElement("td");
            let tdButton = document.createElement("td");

            let btnDelete = document.createElement("button");

            btnDelete.className = "btn-red";
            btnDelete.innerHTML = "Delete";

            btnDelete.onclick = ()=>{
                formKelasWali.deleteRelation(val.kelas_id,val.wali_id,
                (data)=>{
                    console.log(data);
                },(err)=>{
                    console.log(err);
                });
            };

            tdNamaKelas.innerHTML = val.nama_kelas;
            tdNamaWali.innerHTML = val.nama_wali;
            tdButton.append(btnDelete);

            newTr.append(tdNamaKelas);
            newTr.append(tdNamaWali);
            newTr.append(tdButton);

            $("#table-class").append(newTr);

        });
    },(err)=>{
        console.log(err);
    });
};



let initClassesID  = ()=>{


    listKelas.getAllKelasOnlyId((data)=>{
        $("#select_kelas").empty();
        data.forEach((val)=>{
           $("#select_kelas")
               .append(`
                    <option value="${val.kelas_id}">${val.kelas_id}</option>
               `);
        });
    },(error)=>{
        console.log(error);
    });
}

initClassesID();

$("#left-nav-actions-tablet").click(()=>{
   $("#left-nav-dropdown1").slideToggle();
});
$("#left-nav-list-tablet").click(()=>{
   $("#left-nav-dropdown2").slideToggle();
});


$("#toggle-right-nav-item-container").click(()=>{

    $("#right-nav-item-container").slideToggle();
});


let checkIfLessThan648px = ()=>{
    if($(window).width() <= 648){
        $(".left-nav-item-content-container").hide();

        $(".left-nav-item-container-title").hide();
        $(".left-nav-item-container-title-tablet").show();

        $("#toggle-right-nav-item-container").show();




        $("#toggle-right-nav-item-container").css({
            "color":"white",
            "padding":"12px",
            "float":"right",
            "cursor":"pointer",
            "display":"inline-block"
        });

        $("#right-nav-item-container").hide();
        $(".right-nav-item").hide();

        $("#right-nav-item-container").css({
            "display":"block",
            "float":"none",
            "margin":"0"
        });

        $(".right-nav-item").css({
            "display":"block",
            "padding":"5px",
            "margin":"0"
        });

    }else{
        $(".left-nav-item-content-container").show();

        $("#right-nav-item-container").show();
        $("#toggle-right-nav-item-container").hide();

        $(".left-nav-item-container-title").show();
        $(".left-nav-item-container-title-tablet").hide();
    }
}





checkIfLessThan648px();


$(window).resize(()=>{
   if($(window).width() <= 648){
      $(".left-nav-item-content-container").hide();

       $(".left-nav-item-container-title").hide();
       $(".left-nav-item-container-title-tablet").show();

       $("#toggle-right-nav-item-container").show();

       $("#right-nav-item-container").hide();
       $(".right-nav-item").hide();


       $("#toggle-right-nav-item-container").css({
          "color":"white",
          "padding":"12px",
          "cursor":"pointer",
          "float":"right",
          "display":"inline-block"
       });

       $("#right-nav-item-container").css({
           "display":"block",
           "float":"none",
           "margin":"0"
       });

       $(".right-nav-item").css({
           "display":"block",
           "padding":"5px",
           "margin":"0"
       });

   }else{
       $(".left-nav-item-content-container").show();
       $("#right-nav-item-container").show();

       $("#right-nav-item-container").css({
           "display":"inline-block",
           "float":"right",
           "margin":"12px 12px"
       });

       $(".right-nav-item").css({
           "display":"inline",
           "margin":"0 7px 0 7px"
       });

       $(".left-nav-item-container-title").show();
       $(".left-nav-item-container-title-tablet").hide();

       $("#toggle-right-nav-item-container").hide();
   }
});


//
let hideListContainer = (listStudentContainer, listHomeroomTeacherContainer, listClassContainer)=>{
   $("#list-student-container").prop("hidden",listStudentContainer);
   $("#list-homeroom-teacher-container").prop("hidden",listHomeroomTeacherContainer);
   $("#list-class-container").prop("hidden",listClassContainer);
}

//hideAllFormContainer
let hideFormContainer = (newContainerStudent , newContainerHomeroomteacher,newClassContainer,newHomeroomForClass)=>{
   $("#new-student-container").prop("hidden",newContainerStudent);
   $("#new-homeroom-teacher").prop("hidden",newContainerHomeroomteacher);
   $("#new-class-container").prop("hidden",newClassContainer);
   $("#new-homeroom-for-class-container").prop("hidden",newHomeroomForClass);
}

hideListContainer(true,true,true);
hideFormContainer(false,true,true,true);



let initDataToSelectTagForRemainingClasses = ()=>{
    homeroomForClass
        .getRemainingClasses((data)=>{
            $("#select_id_kelas").empty();
            data.forEach((val)=>{
               $("#select_id_kelas")
                   .append(`
                        <option value="${val.kelas_id}">${val.kelas_id}</option>
                   `);
            });
        },(err)=>{
            console.log(err);
        });
}
let initDataToSelectTagForRemainingHomeroomTeacher = ()=>{
    homeroomForClass
        .getRemainingHomeroom((data)=>{
            $("#select_id_wali").empty();
            data.forEach((val)=>{
               $("#select_id_wali")
                   .append(`
                        <option value="${val.wali_id}">${val.wali_id}</option>
                   `);
            });
        },(err)=>{
            console.log(err);
        });
}

let refreshSelectTagRemaining = ()=>{
    initDataToSelectTagForRemainingHomeroomTeacher();
    initDataToSelectTagForRemainingClasses();
}

// clickListener for form
$("#submit-homeroom-for-class").click(()=>{

    let selectIDKelas = $("#select_id_kelas").find("option:selected").val();
    let selectIDWali = $("#select_id_wali").find("option:selected").val();



    formKelasWali
        .saveToKelasWali({
            kelas_id : selectIDKelas,
            wali_id:  selectIDWali
        },(data)=>{
            console.log(data);
            refreshSelectTagRemaining();
        },(err)=>{
            console.log(err);
        });

});
$("#new-homeroom-for-class-a-click").click(()=>{
    hideFormContainer(true,true,true,false);
    hideListContainer(true,true,true);
    refreshSelectTagRemaining();
});

$("#new-student-a-click").click(()=>{
   hideFormContainer(false,true,true,true);
   hideListContainer(true,true,true);
   initClassesID();
});

$("#new-homeroom-a-click").click(()=>{
    hideFormContainer(true,false,true,true);
    hideListContainer(true,true,true);
});

$("#new-class-a-click").click(()=>{
    hideFormContainer(true,true,false,true);
    hideListContainer(true,true,true);
});


//clickListener for list
$("#list-student-container-a-click").click(()=>{
      hideListContainer(false,true,true);
      hideFormContainer(true,true,true,true);
      initStudentListData();
});
$("#list-homeroom-teacher-container-a-click").click(()=>{
      hideListContainer(true,false,true);
      hideFormContainer(true,true,true,true);
      homeroomTeacherList();
});
$("#list-class-container-a-click").click(()=>{
      hideListContainer(true,true,false);
      hideFormContainer(true,true,true,true);
      initKelasWaliInnerJoin();
});


// $(window).click((event)=>{
//    console.log(event.target);
// });

//jQuery left-nav
$(window).scroll(()=>{
   if($(window).scrollTop() > 0){
      $("#left-nav").css("top","0");
      // $("#left-nav").css("z-index","1");
   }else{
      $("#left-nav").css("top","43px");
      // $("#left-nav").css("z-index","-1");
   }
});