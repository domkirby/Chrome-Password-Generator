$(document).ready(function() {
  var passwordButton = document.getElementById('newPass');
  var nonPronPassBtn = document.getElementById('newStrong');
  $("#password").hide();
  passwordButton.addEventListener('click', function() {
    $.ajax({
      url:"http://www.dinopass.com/password/strong",
      dataType: "text",
      error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus + ': ' + errorThrown);
            },
      success: function(data) {
        $("#password").html(data);
        $("#password").show();
        copyToClipboard(data);
        $("#copied").html("Copied to Clipboard");
      }
    })
  });
  nonPronPassBtn.addEventListener('click', function() {
    var length = document.getElementById('length').value;
    if(length < 8) {
      alert('Too Short!\nMinimum length is 8.');
      return false;
    }
    if (length > 150) {
      alert('Too Long!\nMax length is 150 to prevent crashing.');
      return false;
    }
    var thepass = generateNonPronPassword(length);
    $("#password").html(thepass);
    $("#password").show();
    copyToClipboard(thepass);
    $("#copied").html("Copied to Clipboard");
  });
});

function generateNonPronPassword(length) {
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&()",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function copyToClipboard( text ){
                var copyDiv = document.createElement('div');
                copyDiv.contentEditable = true;
                document.body.appendChild(copyDiv);
                copyDiv.innerHTML = text;
                copyDiv.unselectable = "off";
                copyDiv.focus();
                document.execCommand('SelectAll');
                document.execCommand("Copy", false, null);
                document.body.removeChild(copyDiv);
              }
