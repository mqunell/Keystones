/*
 * buildForm() and buildFormCallback() get the character names from keystones.php and add <option>s to select#select_toon
 * buildTable() and buildTableCallback() get the table data from keystones.php and create the HTML table for div#table
 * updateTable() and updateTableCallback() pass form information to keystones.php and refresh the table
 */

var classColors = {
    DeathKnight: "rgb(196, 30, 59)",
    DemonHunter: "rgb(163, 48, 201)",
    Druid: "rgb(255, 125, 10)",
    Hunter: "rgb(171, 212, 115)",
    Mage: "rgb(105, 204, 240)",
    Monk: "rgb(0, 255, 150)",
    Paladin: "rgb(245, 140, 186)",
    Priest: "rgb(255, 255, 255)",
    Rogue: "rgb(255, 245, 201)",
    Shaman: "rgb(0, 112, 222)",
    Warlock: "rgb(148, 130, 201)",
    Warrior: "rgb(199, 156, 110)"
};


function getAffixes() {
    var formData = new FormData();
    formData.append("task", "affixes");

    sendAjaxRequest(formData, "keystones.php", {callbackFunctionReturn: getAffixesCallback});
}

function getAffixesCallback(phpResponse) {
    var output = "";

    json = JSON.parse(phpResponse);
    json["affix_details"].forEach(function(affix) {
        output += `<p><b><a href=${affix["wowhead_url"]}>${affix["name"]}</a></b>: ${affix["description"]}</p>`
    });

    $("#affixes").html(output);
}

function buildForm() {
    var formData = new FormData();
    formData.append("task", "build_form");

    sendAjaxRequest(formData, "keystones.php", {callbackFunctionReturn: buildFormCallback});
}

function buildFormCallback(phpResponse) {
    var htmlOutput = "";

    var rows = phpResponse.split("~");
    for (var row of rows) {
        htmlOutput += "<option value=\"" + row + "\">" + row + "</option>";
    }

    $("#select_toon").html(htmlOutput);
}

function buildTable() {
    var formData = new FormData();
    formData.append("task", "build_table");

    sendAjaxRequest(formData, "keystones.php", {callbackFunctionReturn: buildTableCallback});
}

function buildTableCallback(phpResponse) {
    var htmlOutput = "<table><tr><th>Player</th><th>Character</th><th>Role(s)</th><th>Keystone</th><th>Highest completed</th></tr>";

    var rows = phpResponse.split("~");
    for (var row of rows) {
        // 0:RealName, 1:ToonName, 2:ToonRealm, 3:ToonClass, 4:ToonRoles, 5:KeyDungeon, 6:KeyLevel, 7:MaxDungeon, 8:MaxLevel
        r = row.split(",");

        if (!(r[4] == "" && r[6] == "")) {
            htmlOutput += "<tr style=\"background-color: " + classColors[r[3]] + "\">";
            htmlOutput += "<td>" + r[0] + "</td>";
            htmlOutput += `<td><a href="https://raider.io/characters/us/${r[2]}/${r[1]}">${r[1]}</a></td>`;
            htmlOutput += "<td>" + getRoles(r[4]) + "</td>";
            htmlOutput += "<td>" + r[5] + " " + r[6] + "</td>";
            htmlOutput += "<td>" + r[7] + " " + r[8] + "</td>";
            htmlOutput += "</tr>";
        }
    }

    htmlOutput += "</table>";
    $("#table").html(htmlOutput);
}

function updateTable() {
    var toonName = $("#select_toon").val();
    var dungeon = $("#select_dungeon").val();
    var level = $("#select_level").val();
    var keyMax = $("input[name=\"key_max\"]:checked").val();  // "key" or "max"
    
    var formData = new FormData();
    formData.append("task", "update_table");
    formData.append("toon_name", toonName);
    formData.append("dungeon", dungeon);
    formData.append("level", level);
    formData.append("key_max", keyMax);

    sendAjaxRequest(formData, "keystones.php", {callbackFunction: updateTableCallback});
}

function updateTableCallback() {
    buildTable();
}

function getRoles(nums) {
    var roles = "";
    if (nums.includes("1")) {
        roles += "Tank";
    }
    if (nums.includes("2")) {
        if (roles != "") {
            roles += "/";
        }
        roles += "DPS";
    }
    if (nums.includes("3")) {
        if (roles != "") {
            roles += "/";
        }
        roles += "Healer";
    }

    return roles;
}

getAffixes();
buildForm();
buildTable();
