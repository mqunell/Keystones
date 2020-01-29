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

function getDatabaseRows() {
    sendAjaxRequest(null, "query_db.php", {callbackFunctionReturn: getDatabaseRowsCallback});
}

function getDatabaseRowsCallback(phpResponse) {
    var htmlOutput = "<table><tr><th>Player</th><th>Role(s)</th><th>Character</th><th>Keystone</th><th>Highest completed</th></tr>";

    var rows = phpResponse.split("~");
    for (var row of rows) {
        // 0:RealName, 1:CharName, 2:CharClass, 3:CharRoles, 4:CharILevel, 5:KeyDungeon, 6:KeyLevel, 7:MaxDungeon, 8:MaxLevel
        r = row.split(",");

        if (!(r[5] == "" && r[7] == "")) {
            htmlOutput += "<tr style=\"background-color: " + classColors[r[2]] + "\">";
            htmlOutput += "<td>" + r[0] + "</td>";
            htmlOutput += "<td>" + getRoles(r[3]) + "</td>";
            htmlOutput += "<td>" + r[1] + "</td>";
            htmlOutput += "<td>" + r[5] + " " + r[6] + "</td>";
            htmlOutput += "<td>" + r[7] + " " + r[8] + "</td>";
            htmlOutput += "</tr>";
        }
    }

    htmlOutput += "</table>";
    $("#table").html(htmlOutput);
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


getDatabaseRows();
//getDatabaseRows("Bravo,Touka,Druid,2,,,,,,~Bravo,ßrâvø,DemonHunter,12,,,,Temple of Sethraliss,10,~Ilan,Kohi,Shaman,23,,The MOTHERLODE!!,13,,,~Jeremy,Demondude,Warlock,2,,,,Temple of Sethraliss,10,~Jeremy,Whitelight,Paladin,12,,,,Waycrest Manor,6,~Ken,Magerina,Mage,2,,Atal'Dazar,9,Temple of Sethraliss,10,~Ken,Thagurok,DeathKnight,1,,Siege of Boralus,10,Siege of Boralus,10,~Kyle,Aessthetics,Druid,13,,,,Temple of Sethraliss,10,~Matt,Maios,DeathKnight,2,,,,,,~Matt,Matchi,Monk,123,,The MOTHERLODE!!,8,Temple of Sethraliss,10,~Sarah,Risá,Mage,2,,Freehold,8,Waycrest Manor,6");
