autosave
========

Experimenting with implementing form input autosave using localStorage.  

Dependencies: 
jQuery
Modernizr

Usage:
-See example.html
-Create a new instance of Autosave, pass a config object of options
-These are the options:
  element (the id attribute of the parent element; can be any HTMLelement, not only 'form'.  Defaults to document.body)
  selectors (the form inputs to be auto-saved.  Nothing will be saved if not specified.)
  resourceName (the named reference to the localStorage object.  Defaults to 'autosave')
  interval (amount of time in milliseconds autosave waits to save the form content)

TODO:
1. add fallback local storage implementation for unsupported browsers
2. add all form input types to default selector configuration
