// This is the frontend JS. We place it inside a document.ready event handler
// because we want to make sure our JS runs when the browser has finished 
// building the document from the HTML and CSS -- that is, when the document
// is "ready", rather than at the ear
$(document).ready(function (){
	/*
	- First problem: we want to get the data from the 
	API 
	- and then insert HTML representing that data into 
	the document.


	In order to implement a delete button for each cassette:
	- we need to add the button to the List Item
	- we need to add an event handler for clicking the button
		- that sends some info to the Express API
	- We also need to add a delete handler in the Express server

	*/
	
	

	function successfulDeleteHandler(data, status, req){
		// This is the callback that gets called 
		/* To Do
		- [x] send the delete w AJAX
		- [x] update the UI !!
		*/
		console.log(data);
		var selector = `button[name='${data.title}']`;
		var button = $(selector);
		var parent = button.parent();
		parent.remove()		

	}

	function deleteHandler(e) {
		// NEW
		$.ajax(
			'/api/cassettes',{
				method: 'delete', 
				success: successfulDeleteHandler,
				data: {_id: e.target.id, title: e.target.	value},
		},			
		)
	}

	$.get('/api/cassettes', function (data) {

		// We can use EITHER jQuery or vanilla javascript to get references to 
		// HTML elements. Here we use jQuery to grab a reference to the cassette-list
		// UL element...
		var cassette_list = $('#cassette-list');

		for (cassette of data) {
		    var _id = cassette._id;

		    // Here we use jQuery's append method to add children to the cassette-list element...
		    cassette_list.append(`<li id='li-${_id}'>${cassette.title}</li>`);
		    
		    // And here we use vanilla JS, to create the button element and set its :
		    var button = document.createElement('button');
		    button.id = _id;
		    button.name = `${cassette.title}`;
		    button.value = `${cassette.title}`;
		    button.addEventListener('click', deleteHandler);
		    button.innerText = 'X';

		    // Then, here, I can use jQuery to append a vanilla JS html element.
		    $(`#li-${_id}`).append(button);


		}
		console.log(data);
	}).fail()






})