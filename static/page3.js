
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
    		var selector = `button[name='${data.Name}']`;
    		var button = $(selector);
    		var parent = button.parent();
    		parent.remove()

    	}

    	function deleteHandler(e) {
    		// NEW
        e.preventDefault();
    		$.ajax(
    			'/api/upload',{
    				method: 'delete',
    				success: successfulDeleteHandler,
    				data: {_id: e.target.id, Name: e.target.value,Height: e.target.value,Weight: e.target.value,url: e.target.value},
    		},
    		)
    	}

    	$.get('/api/upload', function (data) {

    		// We can use EITHER jQuery or vanilla javascript to get references to
    		// HTML elements. Here we use jQuery to grab a reference to the cassette-list
    		// UL element...
        //piece = cassette
    		var resp = $('#resp');
        resp.html("");

    		for (piece of data) {
    		    var _id = piece._id;



    		    // Here we use jQuery's append method to add children to the cassette-list element...
            resp.append(`<div id='div-${_id}'></div>`)
            $(`#div-${_id}`).append(`<li id='li-${_id}'>Please note this id for updating: ${piece._id}</li>`);
    		    $(`#div-${_id}`).append(`<li id='li-${_id}'>${piece.Name}</li>`);
            $(`#div-${_id}`).append(`<li id='li-${_id}'>${piece.Height}</li>`);
            $(`#div-${_id}`).append(`<li id='li-${_id}'>${piece.Weight}</li>`);
            $(`#div-${_id}`).append(`<li id='li-${_id}'>img src=${piece.url}</li>`);



    		    // And here we use vanilla JS, to create the button element and set its :
    		    var button = document.createElement('button');
    		    button.id = _id;
    		    button.name = `${piece.Name}`;
    		    button.value = `${piece.Name}`;
    		    button.addEventListener('click', deleteHandler);
    		    button.innerText = 'X';

    		    // Then, here, I can use jQuery to append a vanilla JS html element.
    		    $(`#div-${_id}`).append(button);


    		}
    		console.log(data);
    	}).fail()

    })
