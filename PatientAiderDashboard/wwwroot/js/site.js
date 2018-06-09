﻿$(document).ready(function () {
    sortable('.topicList', {
        placeholderClass: "foo"
    });

    $(".saveTopicOrder").on("click", function(e) {
        e.preventDefault();
        console.log("inside .saveTopicOrder click event!");
        var result = sortable($("#" + $(this).data('listid')), 'serialize');
        console.log('returning serialized topicList for' + $(this).data("listid"));

        //construct string of ids to store in db...
        var topicOrder = "";
        $.each(result[0].items, function (index, item) {
            var $topicItem = $("<div>" + item.html.trim() + "</div>");
            var topicId = $topicItem.find('a').data('id');
            topicOrder += topicId + ",";
        });
        topicOrder = topicOrder.substring(0, topicOrder.length - 1);
        //TODO:  ajax call to persist new order to db.
        alert("New Topic Order: " + topicOrder + "");
    });

    $('.addRemoveTopics').on('click', function () {
        $.ajax({
            type: "GET",
            async: false,
            cache: false,
            url: "/Home/GetTopicsForAddRemove/?sectionId=" + $(this).data('sectionid')+ "&encounterId=" + $(this).data('encounterid'),
            dataType: "json",
            complete: function (mselect) {
                var r = mselect.responseJSON;
                $("#addRemoveTopicsListbox").val('').trigger('chosen:updated');
                $.each(r, function (index, item) {
                    if (item.selected) {
                        $('#addRemoveTopicsListbox').append("<option selected value='" + item.value + "'>" + item.text + "</option>");
                    } else {
                        $('#addRemoveTopicsListbox').append("<option value='" + item.value + "'>" + item.text + "</option>");
                    }
                });
                $("#addRemoveTopicsListbox").trigger('chosen:updated');
                $('#addRemoveTopicsListbox').chosen({
                    disable_search_threshold: 10,
                    no_results_text: "Oops, no topics found!",
                    width: "100%",
                    placeholder_text_multiple: "Add/Remove Topics..."
                });
                $('#addRemoveTopicsDialog').modal('show');
            }
        });
    });

    $("#btnSaveTopics").on("click", function(e) {
        e.preventDefault();
        //TODO:  Persist new topic list to db.
    });
});
