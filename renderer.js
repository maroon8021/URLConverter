// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.


const remote = require('electron').remote;
const {dialog} = remote;
const {BrowserWindow} = remote;
const {shell} = remote;
var fs = require('fs');
var jsonfile = require('jsonfile');

let settingsData;
fs.readFile('js/converter-data.json', 'utf-8', function(err, text){
  settingsData = JSON.parse(text);
})

/*
jsonfile.writeFile('test.json', { foo: 'aaa?', bar: 'bbb' }, {
    encoding: 'utf-8', 
    replacer: null, 
    spaces: null
}, function (err) {
});
*/

/* Status */

var array = [];
for (key in settingsData){
  array.push(settingsData[key]);  
}

jQuery.each(array, function(index, item) {
  var converter = new urlConverter(item);
  converter.rendererElement(index)
  
});

var urlConverter = function(options){
  this.title_ = options.['title'];
  this.converURL_ = options['conver-URL'];
  this.targetText_ = options['targetText'];
}

urlConverter.prototype.rendererElement(index){
  var $inputElement = ('<div class="row">'
    + '<div class="input-field">'
    + '<input id="converter-'+index+'" type="text" class="validate">'
    + '<label for="converter-'+index+'">TO '+this.title+'</label>'
    + '</div>'
    + '</div>');

  $('#input-area').append($inputElement);
}

urlConverter.prototype.bindEvent(index){
  var $inputElement = ('<div class="row">'
    + '<div class="input-field">'
    + '<input id="converter-'+index+'" type="text" class="validate">'
    + '<label for="converter-'+index+'">TO '+this.title+'</label>'
    + '</div>'
    + '</div>');

  $('#input-area').append($inputElement);
}



/* $elements  */



/****/



/****/

$('#convert-button').on('click',function(){
  var originalUrl = $('#converter-1').val();
  if(originalUrl===""){
    return;
  }
  var targetText = new RegExp("google")
  var replaceText = "yahoo"
  var replacedUrl = originalUrl.replace( targetText , replaceText ) ;
  if(replacedUrl.match(replaceText)){
    shell.openExternal(replacedUrl);
  }
});

$('#plan').on('keydown','.last_input',function(e){
  if(e.keyCode === 13) {
    $('#plan').append(dom);
    $(this).removeClass('last_input');
  }
  });

$(document).on('click',function(e){
  var $targetElement = e.target.parentElement;
  if($($targetElement).hasClass('clear-icon')){
    $($focused_).remove();
    removeCancelIcon();
  }else if(isFocus_ && !$($targetElement).hasClass('input-field')){
    removeCancelIcon();
    return;
  }else if(!isFocus_){
    return;
  }
  });

$('#plan').on('focus','.input-element',function(e){
  if(isFocus_){
    removeCancelIcon()
  }　　　

  var $inputContainer = $(this).parent().parent();
  $($inputContainer).append(clearIcon)
  $focused_ = e.target.parentElement;
  isFocus_ = true;
});


$('#plan').on('blur','.input-element',function(e){
  var value = $(e.target).val();
  if(value !== ""){
    var id = e.targetElement.attr('id');
    var textareaId = id + '-textarea'; 
    var doTextarea = ('<div class="input-field">'
    +'<textarea id="'+textareaId+'" class="materialize-textarea"></textarea>'
    +'<label for="'+textareaId+'">'+textareaId+'</label>'
    +'</div>');
    $('#do').append(doTextarea);
  }
  
});


$('#click').on('click',function(){
	var text = $('#textarea').val();
	//fs.writeFile('hoge.txt', text);
	var focusedWindow = BrowserWindow.getFocusedWindow();

	dialog.showSaveDialog(focusedWindow, options,
  // コールバック関数
  function (filename) {
    if (filename) {
      var data = text;
      writeFile(filename, data);
    }
  });
})


var win = remote.getCurrentWindow();
var options = {
  title: 'タイトル',
  defaultPath: '.',
  filters: [
    { name: 'ドキュメント', extensions: ['txt', 'text']},
    { name: 'All Files', extensions: ['*'] }
  ],
  properties: ['openFile', 'createDirectory']
};


function writeFile(path, data) {
  fs.writeFile(path, data, 'utf8', function (err) {
    if (err) {
      return console.log(err);
    }
  });
}


function removeCancelIcon(){
  $('.clear-icon').remove();
  isFocus_ = false;
}

/*
TODO
・バツボタン
・Enterで行追加 -> EventBind
・保存 -> 出力
*/

/*
問題点
blurが先に発火して、キャンセルボタンのイベントが発火しない
blur -> focus-outを観測したい  
*/
