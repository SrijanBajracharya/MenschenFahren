/*
 * @author Sanish Maharjan <sanishmaharjan@lftechnology.com>
 */
var perpetulist = perpetulist || {};
perpetulist.languageTranslate = perpetulist.languageTranslate || {};
(function ( languageTranslate, commonFunctions) {
    $.extend(languageTranslate, {
        apiKey : null,
        apiTranslateUrl : "https://www.googleapis.com/language/translate/v2",
        setApiKey : function(key){
            languageTranslate.apiKey = null;
        },
        getTranslate : function(sourceLang, targetLang, text, successCallback, failCallback){
            var data = {
                key : languageTranslate.apiKey,
                source : sourceLang,
                target : targetLang,
                q : text.replace(/\n/g, "<br />")
            };
            commonFunctions.apiCall(languageTranslate.apiTranslateUrl, "GET", data, function(response){
                if(typeof successCallback != "undefined" && successCallback != null){
                    var translatedText = '';
                    if(typeof response.data.translations[0] != "undefined"){
                        var translatedText = response.data.translations[0].translatedText.replace(/ <br ?\/?> /g,"\n");
                    }
                    successCallback(translatedText);
                }
            }, function(error){
                if(typeof failCallback != "undefined" && failCallback != null){
                    failCallback(error);
                }
            });
        }
    });
})(perpetulist.languageTranslate, perpetulist.admin.common);