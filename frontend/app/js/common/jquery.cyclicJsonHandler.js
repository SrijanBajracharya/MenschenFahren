/*
 * @author Sanish Maharjan <sanishmaharjan@lftechnology.com>
 */
var perpetulist = perpetulist || {};
perpetulist.cyclicJsonHandler = {};
(function ( cyclicJsonHandler ) {
    $.extend(cyclicJsonHandler, {
        accumulateJsonObjects : function ( data, keyValuePairs ) {
            $.each(data, function ( key, value ) {
                if (typeof key == "string" && typeof value == "object" && value != null) {
                    if (!keyValuePairs.hasOwnProperty(key)) {
                        keyValuePairs[key] = [];
                    }
                    if (!Array.isArray(value)) {
                        keyValuePairs[key].push(value);
                    } else if (typeof value[0] != "undefined") {
                        if (typeof(value[0]["id"]) != "undefined") {
                            keyValuePairs[key] = keyValuePairs[key].concat(value);
                        }
                    }

                    if (typeof value == "object" && value != null && Object.keys(value).length > 0) {
                        if (Array.isArray(value)) {
                            for ( var i = 0; i < Object.keys(value).length; i++ ) {
                                if (typeof value[i] == "object") {
                                    cyclicJsonHandler.accumulateJsonObjects(value[i], keyValuePairs);
                                }
                            }
                        } else {
                            cyclicJsonHandler.accumulateJsonObjects(value, keyValuePairs);
                        }
                    }
                }
            });
        },
        processJson : function ( jsonData ) {
            if (typeof jsonData != "string") {
                try {
                    var keyValuePairs = [];
                    var parentNodes = [];
                    cyclicJsonHandler.accumulateJsonObjects(jsonData, keyValuePairs);
                    cyclicJsonHandler.reStructureJsonData(jsonData, keyValuePairs);
                    cyclicJsonHandler.removeCyclic(jsonData, parentNodes);
                } catch ( e ) {
                    return jsonData;
                }
            }

            return jsonData;
        },
        reStructureJsonData : function ( data, keyValuePairs ) {
            $.each(data, function ( key, value ) {
                if (typeof value == 'number') {
                    if (keyValuePairs.hasOwnProperty(key)) {
                        for ( var i = 0; i < Object.keys(keyValuePairs[key]).length; i++ ) {
                            if (keyValuePairs[key][i]["id"] == value) {
                                data[key] = keyValuePairs[key][i];
                            }
                        }
                    }
                }
                else if (typeof value == 'object' && value != null) {
                    if (Array.isArray(value)) {
                        for ( var j = 0; j < value.length; j++ ) {
                            if (typeof value[j] == "number" && keyValuePairs.hasOwnProperty(key)) {
                                for ( var i = 0; i < Object.keys(keyValuePairs[key]).length; i++ ) {
                                    if (keyValuePairs[key][i]["id"] == value[j]) {
                                        value[j] = keyValuePairs[key][i];
                                    }
                                }
                            }
                        }
                    } else {
                        cyclicJsonHandler.reStructureJsonData(data[key], keyValuePairs);
                    }
                }
            });
        },
        removeCyclic : function ( data, parentNodes ) {
            $.each(data, function ( key, value ) {
                if (typeof value == 'object' && value != null) {
                    if ($.inArray(key, parentNodes) != -1) {
                        delete data[key];
                    } else {
                        parentNodes.push(key);
                        cyclicJsonHandler.removeCyclic(data[key], parentNodes);
                    }
                    parentNodes.pop();
                }
            });
        }
    });
})(perpetulist.cyclicJsonHandler);