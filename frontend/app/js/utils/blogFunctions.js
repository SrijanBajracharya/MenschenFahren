var perpetulist = perpetulist || {};
perpetulist.admin = perpetulist.admin || {};
perpetulist.admin.blog = perpetulist.admin.blog || {};
(function ( common, $blogFunctions ) {
    
    $blogFunctions.init = function () {
        $(document).ready(function () {
            $blogFunctions.eventHandlers();
        });
    };
    
    /* handles all events */
    $blogFunctions.eventHandlers = function () {
        console.log("inside event Handlers");
        $(document).on("click", ".blog-button", function () {
            $blogFunctions.persistBlog();
        });
        
        // handles change in status functionality
        $(document).on("change", ".blog-status", function () {
            // TODO: change class name and get blogId and statusId
            $blogFunctions.saveStatusChange(blogId, statusId, function () {
                console.log("success");
            }, function () {
                console.log("error");
            });
        });
        
        /* blog mark as favorite/unfavorite functionality */
        $(document).on("click", ".favorite-icon", function () {
            // TODO: retrieve boolean value for isfavorite variable and blogId
            var isFavorite = true;
            var blogId = "4";
            $blogFunctions.toggleFavoriteBlog(blogId, isFavorite, function () {
                console.log("success");
            }, function () {
                console.log("error");
            });
        });
    };
    
    /* calls api for toggle favorite blog */
    $blogFunctions.toggleFavoriteBlog = function ( blogId, isFavorite, successCallBack, errorCallBack ) {
        var url = "api/blog/" + blogId + "/favorite/" + isFavorite;
        var method = "PUT";
        common.apiCall(url, method, null, successCallBack, errorCallBack)
    };
    
    // calls api for status change
    $blogFunctions.saveStatusChange = function ( blogId, statusId, successCallBack, errorCallBack ) {
        var url = "api/blog/" + blogId + "/status/" + statusId;
        var method = "POST";
        common.apiCall(url, method, null, successCallBack, errorCallBack);
        
    };
    
    /**
     * handles blog persist functionality
     */
    $blogFunctions.persistBlog = function () {
        // TODO: validation
        console.log("persistBlog");
        var formData = $("#blogForm").serialize();
        console.log(formData);
        if ($(".blog-hashtag-field").length > 0) {
            var selectedTagsFromDb = [];
            var newTags = [];
            var blogTags = $(".blog-hashtag-field").val();
            if (blogTags != null) {
                $.each(blogTags, function ( index, value ) {
                    if (!Number.isNaN(parseInt(value))) {
                        selectedTagsFromDb.push(value);
                    } else {
                        newTags.push(value);
                    }
                });
                formData += "&dbHashTags=" + JSON.stringify(selectedTagsFromDb) + "&newHashTags=" + JSON.stringify(newTags);
            }
        }
        console.log(formData);
        $blogFunctions.saveBlog(formData, function () {
            console.log("success");
        }, function () {
            console.log("error");
        });
    };
    
    /* calls api for saving blog */
    $blogFunctions.saveBlog = function ( formData, successCallBack, errorCallBack ) {
        var url = "api/blog/addEdit";
        var method = "POST";
        common.apiCall(url, method, formData, successCallBack, errorCallBack);
    }

})(perpetulist.admin.common, perpetulist.admin.blog);
