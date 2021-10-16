var rok = 3000;
var rok2 = 3001;
var tableOfAvgDay =[];
var tableOfAvgAvg =[];


//###############################################################
//###############################################################
document.addEventListener('DOMContentLoaded', function() {
    //------------------------------------------------------
    //alert("welkome");
    //console.log("welkome");
   // document.querySelector('#leavePlanner').addEventListener('click', () => modulAction("leavePlanner"));
   // document.querySelector('#leaveManager').addEventListener('click', () => modulAction("leaveManager"));
   //rok=getYear();
   //rok2=getYear();
    var yyearr = JSON.parse(localStorage.getItem("yyearr"));
    yyearr = getYear();
    localStorage.setItem('yyearr', JSON.stringify(yyearr));
    rok = JSON.parse(localStorage.getItem("yyearr"));
    rok2 = JSON.parse(localStorage.getItem("yyearr"));
    //console.log("przed holidejsami="+rok2);
   // GetEmployees2avg();
   
  

    //------------------------------------------------------
     });
//###############################################################
//###############################################################
function modulAction(a) {
  alert(a);
  
  }




//###############################################################
//###############################################################
function getYear(){
  //console.log('get year');
  fetch('/getcurrentyear')
.then(response => response.json())
.then(year => {
 
  //console.log(year);
  rok2 = year.year;
  //console.log("rok="+rok2);
  localStorage.setItem('yyearr', JSON.stringify(rok2));

}).then(f=>{

  getHolidays(rok2);
  GetEmployees2avg();

});

return rok2;
}
//###############################################################
//###############################################################
holidays=[];
//###############################################################
//###############################################################
function getHolidays(yearHoliday){

        
  fetch('/holidays/'+yearHoliday)
  .then(response => response.json())
  .then(data => {
       for( item in data){
      
          let element =data[item].day_str;
          holidays.push(element);
      }


  }).then(
    f=>{
      localStorage.setItem('holidays2', JSON.stringify(holidays));
      //console.log("saving holidays to memory"+holidays);
    }
  );
  



}
//###############################################################
//###############################################################

function GetEmployees2avg(){

  tableOfAvgDay=[];
  tableOfAvgAvg=[];

//console.log('start get employes avg');
let rokk = JSON.parse(localStorage.getItem("yyearr"));
//console.log("rokk1="+rokk);
fetch('/employeesMMavg', {
method: 'PUT',
body: JSON.stringify({
  year: rokk

})
})
.then(response => response.json())
.then(lista => {

//console.log("lista avg = "+lista);
//console.log("lista avg lenght "+lista.lenght);
 tableOfAvgDay =[];
 tableOfAvgAvg =[];

for(let x in lista){
 // console.log("x = "+lista[x].str_date +" ; "+lista[x].count);
  tableOfAvgDay.push(lista[x].str_date);
  tableOfAvgAvg.push(lista[x].count);

}
//console.log("dl datek: "+tableOfAvgDay.length);
localStorage.setItem('avgDay', JSON.stringify(tableOfAvgDay));
localStorage.setItem('avgAvg', JSON.stringify(tableOfAvgAvg));
//console.log(tableOfAvgAvg);
});


}
//###############################################################
//###############################################################
