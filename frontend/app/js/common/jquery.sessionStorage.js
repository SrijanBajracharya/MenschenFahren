/*
 * @author Sanish Maharjan <sanishmaharjan@lftechnology.com>
 */
var perpetulist = perpetulist || {};
perpetulist.sessionStorage = perpetulist.sessionStorage || {};
(function ( sessionStorage ) {
    $.extend(sessionStorage, {
        setItem : function ( key, value ) {
            if(Storage !== undefined){
                window.sessionStorage.setItem(key, JSON.stringify(value));
            }
        },
        getItem : function ( key ) {
            if(Storage !== undefined){
            if (window.sessionStorage.getItem(key)) {
                try {
                    var value = window.sessionStorage.getItem(key);
                    if(value == '{}'){
                        return {};
                    }else{
                        return JSON.parse(value);
                    }
                } catch ( e ) {
                    return window.sessionStorage.getItem(key);
                }
            }
           }     
            return null;
        },
        deleteItem : function(key){
            window.sessionStorage.removeItem(key);
        },
        clearAll : function () {
            window.sessionStorage.clear();
        }
    });
})(perpetulist.sessionStorage);