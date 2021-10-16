var licznik = 0
var days = ["Mo","Tue","Wen","Thr","Fr","Sat","Sun"];
var dniUrlopu =[];
var pierwszeOkno = 1;
var rok = 2018;
var wymiar = 26;
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------

//---------------------------------------------------------------

//---------------------------------------------------------------
$(document).ready(function() {
  
	function getRok(){

		let variable = 2019;
		fetch('/getcurrentyear')
		.then(response => response.json())
		.then(year => {
		   
			//console.log(year);
			variable = year.year;
			//console.log("rok2a="+variable);
			localStorage.setItem('yyearr', JSON.stringify(variable));
			rok=variable;
			rok=JSON.parse(localStorage.getItem("yyearr"));
			
			
			
			
			
			

			





			
			//return variable;
			//fillStats();
			
		})
		.then(f=>{


			rok=JSON.parse(localStorage.getItem("yyearr"));
			//console.log("tutu---> "+rok);
			$("button").each(function (i, el) {
				
				var ide = $(this)[0].id;
				//console.log("ide="+ide);
				if(ide !=null){
					if(ide.substring(0,4) == rok){
						$(this).click( buttonAction(ide));
							//console.log(ide);
					}
					else{
						//console.log("nieee");
					}
						
				}
			});



		});
		var variable2 = JSON.parse(localStorage.getItem("yyearr"));
		//console.log("rok3b="+variable2);

		getMyFreeDays(variable2);
		return variable2;
	
		
	}




	rok=getRok();	

  
});
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function buttonsKlick(){

	rok=JSON.parse(localStorage.getItem("yyearr"));
	//console.log("tutu---> "+rok);
	$("button").each(function (i, el) {
		
		var ide = $(this)[0].id;
		//console.log("ide="+ide);
		if(ide !=null){
			if(ide.substring(0,4) == rok){
				$(this).click( buttonAction(ide));
					//console.log(ide);
			}
			else{
				//console.log("nieee");
			}
				
		}
	});


}


//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
$(document).ready(function() {
  
	//read from database
	//fill calendar
	
	fillStats();

  
});
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function DniUrlopuFormatuj(){
	
	var elements = $();
	if (dniUrlopu != null){
		for (var b = dniUrlopu.length-1; b >=0 ;b-- ){
				var c =b+1;
				 elements = elements.add('<p>'+'<span>'+dniUrlopu[b]+'</span>'+'</p>');
		}
	}
	return(elements);
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function buttonAction( i){
  
	
	
	return function(){

    //alert('you clicked ' + i);
	licznik++;
    //$( "#licznik").html(licznik);
    //console.log(i);
    var firstKlik = $("#"+ i ).attr("firstKlik");
    //console.log(firstKlik);
			if(firstKlik === "true" && dniUrlopu.length<wymiar){
			$(  "#"+i ).attr("firstKlik","false");
			$(  "#"+i+"_a2" ).html("W");
			//$(  "#"+i+"_a2" ).css("color","black");
			$(  "#"+i ).css("background-color","lightgreen");
			//console.log("true");
			dniUrlopu.push(i);
			
			dniUrlopu.sort(function(a,b){
						return new Date(b) - new Date(a);
				});
			
			$("#wykazDni").html(DniUrlopuFormatuj());
			fillStats();
			
			
			}else{
			$(  "#"+i ).attr("firstKlik","true");
			$(  "#"+i+"_a2" ).html("");
			$(  "#"+i ).css("background-color","");
			//console.log("false");
			dniUrlopu = dniUrlopu.filter(item => item !== i);
			dniUrlopu.sort(function(a,b){
						return new Date(b) - new Date(a);
				});
			
			$("#wykazDni").html(DniUrlopuFormatuj());
			fillStats();
			}

  }


}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function fillStats(){

	$("#status4").html(wymiar);
	$("#status5").html(dniUrlopu.length);
	$("#status2").html(wymiar-dniUrlopu.length);
	
}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
$(document).ready(function() {
	
	/*

	console.log("tutu "+rok);

  
    $("button").each(function (i, el) {
        
		var ide = $(this)[0].id;
		//console.log(ide);
		if(ide !=null){
			if(ide.substring(0,4) == rok){
				$(this).click( buttonAction(ide));
				
			}
				
		}
     });

	*/
	 
  
});
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
$(document).ready(function() {
  
  //-----------------------------
  for (var i = 5;i<13;i++){
		$( "#okno" + i ).hide();
  }
  //-----------------------------
  $( "#next1").click(function() {
		if(pierwszeOkno<9){
				 $( "#okno" + pierwszeOkno ).hide();
				  var xx= pierwszeOkno+4;
				 
				  $( "#okno" +xx  ).show();
				pierwszeOkno++;
				
	  
		}
	});
  //-----------------------------
  $( "#previous1").click(function() {
		if(pierwszeOkno>1){
			
				 var xx= pierwszeOkno-1;
				  $( "#okno" +xx  ).show();
				  xx= pierwszeOkno+3;
				 $( "#okno" + xx ).hide();
				pierwszeOkno--;
		}
	});
  //-----------------------------
  $( "#page_1").click(function() {
		for (var i = 1;i<13;i++){
			$( "#okno" + i ).hide();
		}
		for (var i = 1;i<5;i++){
			$( "#okno" + i ).show();
		}
	pierwszeOkno=1;		
	});
  //-----------------------------  
    $( "#page_2").click(function() {
		for (var i = 1;i<13;i++){
			$( "#okno" + i ).hide();
		}
		for (var i = 5;i<9;i++){
			$( "#okno" + i ).show();
		}	
			pierwszeOkno=5;	
	});
  //----------------------------- 
  $( "#page_3").click(function() {
		for (var i = 1;i<13;i++){
			$( "#okno" + i ).hide();
		}
		for (var i = 9;i<13;i++){
			$( "#okno" + i ).show();
		}	
			pierwszeOkno=9;	
	});
  //----------------------------- 
  $( "#check1").click(function() {
	
	//alert("czeck");

	});
	//----------------------------- 
	$( "#save1").click(function() {
	
		//alert("save1");
		var variable2 = $("#yearToPlan").text();
		//console.log("do kasowania="+variable2)
		fetch('/savemyfreedays', {
			method: 'PUT',
			body: JSON.stringify({
				free_days: dniUrlopu,
				year: variable2
				
				
	
			})
		  })
		  .then((response) => {
			return response.json();
		 })
		 .then((data) => {
				//console.log(data);
				//let rokkk = JSON.parse(localStorage.getItem("yyearr"));
				//getHolidays(rokkk);
	
	
		 });
		 



		 alert("saved");
		});
	//----------------------------- 
	$( "#send1").click(function() {
	
		let curret_status = $("#status1").text();
		let left_to_plan = $("#status2").text();
		let status_of_the_plan = "analyzing";
		let info_about_plan = "please approve";
		let year_of_plan = $("#yearToPlan").text();
		//console.log("left="+left_to_plan);
		//console.log("status="+curret_status);

		if(left_to_plan==0 && curret_status == "planning"){
			saveBeforeSend();
			changeStatus(status_of_the_plan,info_about_plan,year_of_plan);
			alert("sended");

		}else{
			alert("please plan all days");
		}	
		//
			
			//$( "#save1").



		
			});
	//----------------------------- 	
  fillStats();
  //----------------------------- 
});
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function saveBeforeSend(){

	var variable2 = $("#yearToPlan").text();
	//console.log("do kasowania="+variable2)
	fetch('/savemyfreedays', {
		method: 'PUT',
		body: JSON.stringify({
			free_days: dniUrlopu,
			year: variable2
			
			

		})
	  })
	  .then((response) => {
		return response.json();
	 })
	 .then((data) => {
			//console.log(data);
			//let rokkk = JSON.parse(localStorage.getItem("yyearr"));
			//getHolidays(rokkk);


	 });


}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function getMyFreeDays(year3){


	//console.log("jer3="+year3);
	getMyDimension(year3);
	//getmyStatus(year3);



	fetch('/getmyfreedays/'+year3)
	.then(response => response.json())
	.then(data => {
		//console.log("my fri dejs:");
		//console.log(data);
		//console.log("end of my fri dejs:");

		for(let d in data){
			let x= data[d].day_str;
			//console.log("dzien = "+x);
			klik(x);	

		}

	

});


}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function klik(i){

    //alert('you clicked ' + i);
	licznik++;
    //$( "#licznik").html(licznik);
    //console.log(i);
    var firstKlik = $("#"+ i ).attr("firstKlik");
    //console.log(firstKlik);
			if(firstKlik === "true" && dniUrlopu.length<wymiar){
			$(  "#"+i ).attr("firstKlik","false");
			$(  "#"+i+"_a2" ).html("W");
			//$(  "#"+i+"_a2" ).css("color","black");
			$(  "#"+i ).css("background-color","lightgreen");
			//console.log("true");
			dniUrlopu.push(i);
			
			dniUrlopu.sort(function(a,b){
						return new Date(b) - new Date(a);
				});
			
			$("#wykazDni").html(DniUrlopuFormatuj());
			fillStats();
			
			
			}else{
			$(  "#"+i ).attr("firstKlik","true");
			$(  "#"+i+"_a2" ).html("");
			$(  "#"+i ).css("background-color","");
			//console.log("false");
			dniUrlopu = dniUrlopu.filter(item => item !== i);
			dniUrlopu.sort(function(a,b){
						return new Date(b) - new Date(a);
				});
			
			$("#wykazDni").html(DniUrlopuFormatuj());
			fillStats();
			}

  }
  //---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function getMyDimension(year3){


	//console.log("jer3 in dimenison="+year3);

	fetch('/getmydimension/'+year3)
	.then(response => response.json())
	.then(data => {
		//console.log("my dimension:");
		//console.log(data.dimension);
		//console.log("end of my dimenison:");
		$("#status4").html(data.dimension);
		wymiar = data.dimension;
		fillStats();
		getmyStatus(year3);

	

});


}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function getmyStatus(year3){


	//console.log("jer3 in status="+year3);
	let currentStatus = $("#status1").text();
	let currentInfo = $("#status3").text();
	let toUpdate = false;

	fetch('/mystatus', {
		method: 'PUT',
		body: JSON.stringify({
			to_update:toUpdate,
			year: year3,
			status:currentStatus,
			info:currentInfo
			
			
			

		})
	})	
	.then(response => response.json())
	.then(data => {
		//console.log("my status:");
		//console.log(data);
		//console.log("end of my status:");
		for(let d in data){
			$("#status1").text(data[d].status);
			$("#status3").html(data[d].info);
			//console.log((data[d]).info);
			//console.log($("#status3").text())
			//wymiar = data.dimension;
			//fillStats();
			//console.log(data[d].status);
			//console.log("planning");
			if(data[d].status !="planning"){
				//console.log("to tu?");

				$("#save1").hide();
				$("#send1").hide();



			}else{
				//console.log("to nie tu?");
				$("#save1").show();
				$("#send1").show();
			}



		}
		
		

	

});


}



//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------
function changeStatus(status_of_the_plan,info_about_plan,year_of_plan){

	//console.log("jer3 in change status="+year_of_plan);
	
	let toUpdate = true;

	fetch('/mystatus', {
		method: 'PUT',
		body: JSON.stringify({
			to_update:toUpdate,
			year: year_of_plan,
			status:status_of_the_plan,
			info:info_about_plan
			
			
			

		})
	})	
	.then(response => response.json())
	.then(data => {
		//console.log("my new status:");
		//console.log(data);
		//console.log("end of my new status:");
		for(let d in data){
			$("#status1").text(data[d].status);
			$("#status3").html(data[d].info);
			//console.log((data[d]).info);
			//console.log($("#status3").text())
			//wymiar = data.dimension;
			//fillStats();
			if(data[d].status !="planning"){
				$("#save1").hide();
				$("#send1").hide();



			}



		}
		
		

	

});



}
//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------




//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------




//---------------------------------------------------------------
//---------------------------------------------------------------
//---------------------------------------------------------------




