$(function(){
  onDOMLoad();
  });

function onDOMLoad(){
	$("#syncButton").live('click',function(){showAlert();});
	
	$("#mainMenuButton").live('click',function(e){
							  $("#mainMenu").slideToggle();
							  });
	
	
	$("#contactSearch").live('click',function(){
							 get_contacts();
							 });
}

$("#demoPage").live("pagecreate",function(event){
					var b = $("#selectList").find("button").clone(true).removeAttr("class");
					$("#selectList").empty().append(b);
					});

function showAlert() {
	navigator.notification.confirm(
								   'Abhishek has completed his self evaluation for 2011 Plan.',  // message
								   function(){},              // callback to invoke with index of button pressed
								   'Peopleclick Authoria: TMo',            // title
								   'View,Cancel'          // buttonLabels
								   );
}

function get_contacts()
{
	var obj = new ContactFindOptions();
	obj.filter="";
	obj.multiple=true;
	obj.limit=5;
	
	navigator.service.contacts.find(["displayName"], contacts_success, contacts_fail, obj);
}

function createList(){
	$("#selectList").html("<select id='contactList'><option>contd. Search Online</option></select>");
	$("#contactList").click(function(e){get_contacts();});
}


function contacts_success(contacts)
{
	
	if(contacts.length){
		$("#contactList").html("<option>contd. Search Online</option>");
		$.each(contacts,function(i,contact){
			   var c= $("<option/>",{text:contact.displayName});
			   $("#contactList").append(c);   
			   });
	}
	
	/* * /
	 var msg = contacts.length + " contacts returned";
	 navigator.notification.alert(
	 msg,  // message
	 function(){},         // callback
	 'PCA:TMo',            // title
	 'Close'                  // buttonName
	 );
	 /* */
}

function contacts_fail(){
	alert("Error fetching contacts");
}