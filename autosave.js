(function ($) {
  'use strict';	

  var Autosave = function (config) {
  // our constructor/initial properties
	
    // the element to target; target the document body if not specified
    this.element = document.getElementById(config.element) || document.body;

    // the form inputs to select; all inputs are selected if not specified
    // TODO: add all form input types
    this.selectors = config.selectors || '';

    // the key name for the localStorage object
    this.resourceName = config.resourceName || 'autosave';
	
    // milliseconds to wait before auto-saving
    this.interval = config.interval || 30000;
    
    // set the inputs as soon as the page is loaded
    this.setInputs();
	
    // immediately start running if 'autorun' is true,
    // else autosave has to be called manually
    if (config.autorun) {
	this.run();
    }

  };
  
  // this method gets the inputs from the page and sets up a locaStorage object
  Autosave.prototype.getInputs = function () {
  
    // TODO: add fallback local storage implementation for unsupported browsers
    if (Modernizr.localstorage) {
	
      // our local storage array
      var autosave = [];
	  
      // iterate through all of the inputs, 
      // building an object for each element, and add to autosave array appropriately
      $(this.element).find(this.selectors).each(function (index, element) {

	var $type = $(this).attr('type'),
	    item = {
		'id': index,
		'type': $type || $(this).prop("tagName").toLowerCase()
	    };
		
	// check for radio button and use name/checked value
	if (item.type === 'radio') {
	
	  if ($(this).prop('checked')) {
	    item.name = $(this).attr('name');
	    item.value = $(this).val();
		
	    autosave.push(item);
	  }
	  
	} else {		
	 // use id/value for everything else
          item.name = element.id; 
	  item.value = $(element).val();
	  
	  autosave.push(item);		  
	}
		
      });      

      // set autosave as a localStorage item
      window.localStorage.setItem(this.resourceName, JSON.stringify(autosave));
		
    } else {
	  
	// do some other implementation of local storage
	  
    }
	
  };
  
  // this method gets a locaStorage object and sets it the onto the page
  Autosave.prototype.setInputs = function () {
  
    if (window.localStorage[this.resourceName]) {
    
      var LSText = window.localStorage.getItem(this.resourceName),
	  LSObject = JSON.parse(LSText);
	
      LSObject.forEach(function (item) {
		
        if ( item.type === 'radio' ) {
		
          $('input[name="' + item.name + '"][value="' + item.value + '"]')
		.prop('checked', true);
		  
        } else if (item.type === 'select') {

	  $('#' + item.name + ' option[value="' + item.value + '"]')
		.prop('selected', true);
		  
	} else {

	  $('#' + item.name + '').val(item.value);
		  
	}
		  
      });
      
    }
	
  };
  
  // this method clears the autosave key from localStorage
  Autosave.prototype.clearStorage = function () {
  
     window.localStorage.removeItem(this.resourceName);
	
  };
  
   // this method runs a loop that gets the inputs and saves the locaStorage object
  Autosave.prototype.run = function () {
  
    var self = this;
    
    this.timeout = window.setTimeout(function(){
      
      self.getInputs();
      self.run();
      
    }, this.interval);
    
  };
  
  // this method stops autosave	
  Autosave.prototype.stop = function () {
  
    window.clearTimeout(this.timeout);
	
  };
  
  // assign our class to the global window object
  window.Autosave = Autosave;
  
}(window.jQuery));
