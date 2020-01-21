function updateCharacter() {
    var charName = $("#select_char").val();
    var maxDungeon = $("#select_dungeon").val();
    var maxLevel = $("#select_level").val();
    
    var formData = new FormData();
    formData.append("char_name", charName);
    formData.append("max_dungeon", maxDungeon);
    formData.append("max_level", maxLevel);

    sendAjaxRequest(formData, "update_db.php", {callbackFunction: updateCharacterCallback});
}

function updateCharacterCallback() {
    // "refresh" the page
}
