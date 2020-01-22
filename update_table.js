function updateTable() {
    var charName = $("#select_char").val();
    var dungeon = $("#select_dungeon").val();
    var level = $("#select_level").val();
    var keyMax = $("input[name=\"key_max\"]:checked").val();
    
    var formData = new FormData();
    formData.append("char_name", charName);
    formData.append("dungeon", dungeon);
    formData.append("level", level);
    formData.append("key_max", keyMax);

    sendAjaxRequest(formData, "update_db.php", {callbackFunction: updateTableCallback});
}

function updateTableCallback() {
    alert("Refresh the page to update the table; auto-refreshing not implemented yet");
}
