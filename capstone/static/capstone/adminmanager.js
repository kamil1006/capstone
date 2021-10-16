//-------------------------------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {


//    document.querySelector('#accept1').addEventListener('click', () => AcceptAction("accept"));
  //  document.querySelector('#reject1').addEventListener('click', () => AcceptAction("reject1"));
   // document.querySelector('#acceptAll').addEventListener('click', () => AcceptAction("acceptAll"));
    document.querySelector('#am_select_pages').addEventListener('change', () => refreshPage());


 
   GetEmployeesPagesCount();
   GetEmployees(1);
   //GetEmployees(2);


   document.querySelector('#form_years').onsubmit = function() {
    save_year();
    GetEmployeesPagesCount();
    GetEmployees(1);
    let rokkk = JSON.parse(localStorage.getItem("yyearr"));
    getHolidays(rokkk);
    return false;

    };


    document.querySelector('#form_holidays').onsubmit = function() {
       

        let selectForm = document.getElementById("txt_holiday").value;
        //alert(ifDate(selectForm));
        if(ifDate(selectForm)){
            saveDateOfHliday(selectForm,false);
            let rokkk = JSON.parse(localStorage.getItem("yyearr"));
            //console.log("rokk->="+rokkk);
           
            GetEmployeesPagesCount();
            GetEmployees(1);
            getHolidays(rokkk);

        }
        let rokkk = JSON.parse(localStorage.getItem("yyearr"));
        getHolidays(rokkk);
        return false;
    
        };


        let selselectedYear = document.getElementById("am_select_choices");
        let rokkk = JSON.parse(localStorage.getItem("yyearr"));
        selselectedYear.value = rokkk;
        getHolidays(rokkk);



return false;
});
//-------------------------------------------------------------------------------------------------------------
function getYear(){

    var rok2;
   // console.log('get year');
    fetch('/getcurrentyear')
  .then(response => response.json())
  .then(year => {
   
   // console.log(year);
    rok2 = year.year;
   // console.log("rok="+rok2);
    return rok2;
  });
  
  return rok2;
  }
//-------------------------------------------------------------------------------------------------------------

function GetEmployeesPagesCount(){
    
    fetch('/employeesscount')
    .then(response => response.json())
    .then(pages_count => {
       
        //paginatePosts(pages_count.pages_count,currentPage);
       
        let selectForm = document.getElementById("am_select_pages");
        while (selectForm.firstChild) {
            selectForm.removeChild(selectForm.lastChild);
        }


        let pc =parseInt(pages_count.pages_count);
        //console.log(pages_count);
       // console.log(pc);
        for( let i = 1; i <=pc;i++){
            const e1 = document.createElement('option');
            e1.id="pageOption"+i;
            e1.innerHTML = i;
            selectForm.appendChild(e1);
           // console.log("i="+i);

        }


    });


}

//-------------------------------------------------------------------------------------------------------------
function GetEmployees(pageNumber){

   // console.log('start get employes, page no: '+pageNumber);
    let rokk = JSON.parse(localStorage.getItem("yyearr"));
   // console.log("rokk1="+rokk);
    fetch('/employeesAM/'+pageNumber, {
        method: 'PUT',
        body: JSON.stringify({
            year: rokk

        })
    })
    .then(response => response.json())
    .then(lista => {
       
      // console.log("lista = "+lista);
     //  console.log("lista lenght "+lista.lenght);
              
        let selectForm = document.getElementById("am_blok3");
        selectForm.innerHTML = showPageOfEmployees(lista);
      
        //var array = []
        let y=0;
        for(let x in lista){
          //  console.log("x= "+x);
            let item = lista[y];
            let item_id = lista[y].id;
          //  console.log(item);
          //  console.log(item_id);
            let btnClicked = document.getElementById("btndecision_"+item_id);
            btnClicked.addEventListener('click', () => UpdateCredentialAction(item_id));
          
            //array.push(item);
            y++;
        }
      
        

    });


}
//-------------------------------------------------------------------------------------------------------------
function AcceptAction(a) {
    alert(a);

}
//-------------------------------------------------------------------------------------------------------------
function refreshPage(){
    let wybor = document.querySelector('#am_select_pages').value;
   // console.log(wybor);
    GetEmployees(wybor);


}
//-------------------------------------------------------------------------------------------------------------
function showPageOfEmployees(list){
   // console.log("lista in "+list);
   // console.log("lista lenght "+list.lenght);

    var array = []
    let y=0;
    for(let x in list){
      //  console.log("x= "+x);
        let item = list[y++];
      //  console.log(item);
        array.push(item);
    }
   // console.log("array dwa "+array);
   // class='d-flex'

    let outputString = "<div class='container'><table class='table  table-sm table-hover ' > ";

    outputString+="<thead class='thead-dark'>";
    outputString+="<tr>";
    outputString+="<th scope='col'>id</th>";
    outputString+="<th scope='col'>Employee</th>";
    outputString+="<th scope='col'>Permissions</th>";
    outputString+="<th scope='col style='width: 50px;' >Dimension</th>";
    outputString+="<th scope='col'>Decision</th>";
      
    outputString+="</tr>";
    outputString+="</thead><tbody>";



    array = []
    y=0;
    for(let x in list){
       // console.log("x= "+x);
        let item = list[y++];
       // console.log(item);
        array.push(item);
    
        outputString+="<tr>";
            outputString+="<td>";
            outputString+=item.id;
            outputString+="</td>";
            
            outputString+="<td>";
            outputString+=item.surname_name;
            outputString+="</td>";

            outputString+="<td>";
            //outputString+=item.role;

            outputString+="<select class='form-control' id='am_select_priv_"+item.id+"'>";

            switch(item.role){
                case "admin":
                    outputString+="<option>employee</option>";
                    outputString+="<option>manager</option>";
                    outputString+="<option selected>admin</option>";
                    break;
                case "manager":
                    outputString+="<option>employee</option>";
                    outputString+="<option selected>manager</option>";
                    outputString+="<option>admin</option>";
                break;
                default:
                    outputString+="<option selected>employee</option>";
                    outputString+="<option>manager</option>";
                    outputString+="<option>admin</option>";
                break;

            }

            outputString+="</select>";
            outputString+="</td>";


            outputString+="<td style='width: 50px;'>";
            outputString+="<input class='form-control' type='text' value='"+item.dimension+"' id='txtdimension_"+item.id+"' ></input>";
            outputString+="</td>";

// style='width: fit-content;'

            outputString+="<td >";
            outputString+="<input class='btn btn-warning' type='submit' value='Update' id='btndecision_"+item.id+"'></input>";
            outputString+="</td>";
        outputString+="</tr>";

    
    }
    
    outputString+="</tbody></table></div>";
    
return outputString;
}
//-------------------------------------------------------------------------------------------------------------
function UpdateCredentialAction(item_id){

    let selectionField = document.getElementById("am_select_priv_"+item_id);
    let value = selectionField.value;
    let dimensionField = document.getElementById("txtdimension_"+item_id);
    let valueDimension = dimensionField.value;
    let yearrr = JSON.parse(localStorage.getItem("yyearr"));
    //console.log("rok koleny = "+yearrr)

    fetch('/savecredentials', {
        method: 'PUT',
        body: JSON.stringify({
            id: item_id,
            credentials: value,
            dimension: valueDimension,
            year: yearrr

        })
      })
      .then((response) => {
        return response.json();
     })
     .then((data) => {

     });

     alert("user with id no "+item_id + " will now have role: "+value+" and dimension: "+ valueDimension);
     return false;


}
//-------------------------------------------------------------------------------------------------------------
function save_year(){
    let selectionField = document.getElementById("am_select_choices");
    let value = selectionField.value;
    fetch('/saveyear', {
        method: 'PUT',
        body: JSON.stringify({
            year: value
            

        })
      })
      .then((response) => {
        return response.json();
     })
     .then((data) => {

     });

     alert("Now we have year: "+value);
     localStorage.setItem('yyearr', JSON.stringify(value));
     
     return false;

}
//-------------------------------------------------------------------------------------------------------------
function ifDate(candidateToDate){

    let answer = false;
   // console.log(candidateToDate);
    var d = new Date(candidateToDate);
   // console.log(d);
    if (Object.prototype.toString.call(d) === "[object Date]"){
        if (isNaN(d.getTime())) { 
            answer = false;
        }
        else {
            answer = true;
        }



    }


    const tab1 = candidateToDate.split('-');
    var y = tab1[0];
    var m = tab1[1];
    var dm = tab1[2];
    let dm2 = d.getUTCDate();
    if(dm2!=dm)
        answer = false;


   // console.log(answer);
    return answer;


}
//-------------------------------------------------------------------------------------------------------------
function  saveDateOfHliday(candidateToDate,ifDelete){
    var d = new Date(candidateToDate);
    const tab1 = candidateToDate.split('-');
    var y = tab1[0]*1;
    var m = tab1[1]*1;
    var dm = tab1[2]*1;
    var data_str = y+"-"+m+"-"+dm;

    fetch('/saveholiday', {
        method: 'PUT',
        body: JSON.stringify({
            date_date: d,
            date_str: data_str,
            if_delete: ifDelete

        })
      })
      .then((response) => {
        return response.json();
     })
     .then((data) => {
          //  console.log(data);
            let rokkk = JSON.parse(localStorage.getItem("yyearr"));
            getHolidays(rokkk);


     });

    // alert("Now we have year: "+value);
     //localStorage.setItem('yyearr', JSON.stringify(value));
     
     return false;


}
//-------------------------------------------------------------------------------------------------------------
function getHolidays(yearHoliday){

 
    fetch('/holidays/'+yearHoliday)
    .then(response => response.json())
    .then(data => {
      // console.log(data);
       
       let place = document.getElementById("am_blok1b");
       while (place.firstChild) {
            place.removeChild(place.lastChild);
        }
       
        for( item in data){
            let element = document.createElement('button');
            element.id =data[item].day_str;
            element.className="btn btn-secondary przycisk";
            element.setAttribute("style","font-weight: bold; margin-right:5px;margin-top:5px;");
            {
                let zmienna = data[item].day_str;
                element.addEventListener('click', function() {
    
                modifyHoliday(zmienna);
                    
                    
                
                
                });
            }
            element.innerHTML = data[item].day_str;
            place.appendChild(element);
        }


    });




}
//-------------------------------------------------------------------------------------------------------------
function modifyHoliday(data){

    //alert(data);

    if (confirm('Are you sure you want to delete  '+data+' date ?')) {
        // Save it!
        //console.log('data was deleted from the database.');
       {
        saveDateOfHliday(data,true);
            {
           
           
            }
       }

      } else {
        // Do nothing!
       // console.log('data was not deleted from the database.');



      }
      let rokkk = JSON.parse(localStorage.getItem("yyearr"));
      getHolidays(rokkk);
}


//-------------------------------------------------------------------------------------------------------------



