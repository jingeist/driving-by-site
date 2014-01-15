/**
  *@desc get JSONP data from the service
  *
*/
var prefs= new gadgets.Prefs();

/**
  *@desc get JSONP data from the service
  *
*/
function getData() {
	$.getScript('https://script.google.com/a/macros/google.com/s/AKfycbwmZruKO8ai1W35I1ebDBryaPb-ai37nIBl_NUtzBfqw5AtiJo/exec'
				+ '?id=' + prefs.getString("folderid")
				+ '&debug=' + prefs.getString("debug")
				, handleData);
}
		
/**
  *@desc handle the data from the getData() service
  *
*/
function handleData(){
	$('#loading').hide();
	$('#pageslabel').append(prefs.getString("pageslabel"));
	
	$('#thisFolder').append('<a target="_blank" href="' + data.driveurl + '">Open "' + data.name + '" in Drive').fadeIn();
	for (var pageKey in data.pages){
		var page=data.pages[pageKey];
   		$('#pages').append('<tr>'
		      + '<td class="entity page">'
			  + '<a target="_top" href="' + page.siteurl + '">'
		      + page.name 
		      + '</a>'
		      + '</td>'
		      + '<td class="shortcuts">'
		      + '<a class="drive icon" target="_blank" href="' + page.driveurl + '">Open related Drive folder</a>'
		      + '</td>'
		      + '</tr>').fadeIn();
	}
	for (var folderKey in data.folders){
		var folder=data.folders[folderKey];
   		$('#files').append('<tr>'
		      + '<td class="entity folder">'
		      + '<a target="_blank" href="' + folder.driveurl + '">'
		      + folder.name 
		      + '</a>'
		      + '</td>'
		      + '<td></td>'
		      + '</tr>').fadeIn();
	}
	for (var fileKey in data.files){
		var file=data.files[fileKey];
   		$('#files').append('<tr>'
		      + '<td class="entity file ' + file.type + '">'
		      + '<a target="_blank" href="' + file.driveurl + '">'
		      + file.name 
		      + '</a>'
		      + '</td>'
		      + '<td></td>'
		      + '</tr>').fadeIn();
	}
	if (prefs.getBool("debug")){
	    if ($('#debug')){
			if (data.debug){
				for (var debugKey in data.debug){
					$('#debug').append('<div>' + debugKey + ':' + data.debug[debugKey] + '</div>');
				}
			} else {
				$('#debug').append('<div> debug is empty </div>');
			}
		} 
		if ($('#debugButton')) {
			$('#debugButton').click(function(){$('#debug').slideToggle();});
			$('#debugButton').fadeIn();
		}
	}
}

/**
  *@desc register an OnLoadHandler to call getData() when the gadget is loaded.
  *
*/
gadgets.util.registerOnLoadHandler(getData);