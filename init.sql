create database Keystones;
use Keystones;

create table Toons (
    RealName        varchar(20)         not null,
    ToonName        varchar(20)         not null,
    ToonRealm       varchar(20)         not null,
    ToonClass       varchar(20)         not null,
    ToonRoles       varchar(3),

    primary key (ToonName, ToonRealm)
);

create table Keystones (
    ToonName        varchar(20)         not null,
    KeyDungeon      varchar(20),
    KeyLevel        int,
    MaxDungeon      varchar(20),
    MaxLevel        int,

    primary key (ToonName)
);

-- insert into Toons values ("Matt", "Blyskyn", "Shadowsong", "Mage", "2");
-- insert into Toons values ("Matt", "Maios", "Shadowsong", "DeathKnight", "2");
-- insert into Toons values ("Matt", "Matchi", "Shadowsong", "Monk", "123");
-- insert into Toons values ("Jeremy", "Demondude", "Shadowsong", "Warlock", "2");
-- insert into Toons values ("Jeremy", "Whitelight", "Shadowsong", "Paladin", "12");
-- insert into Toons values ("Kyle", "Aessthetics", "Darkspear", "Druid", "3");

-- insert into Toons values ("Bravo", "Bravo", "DemonHunter", "12");
-- insert into Toons values ("Bravo", "Secre", "Warrior", "2");
-- insert into Toons values ("Ilan", "Kohi", "Shaman", "23");
-- insert into Toons values ("Ken", "Magerina", "Mage", "2");
-- insert into Toons values ("Ken", "Thagurok", "DeathKnight", "1");
-- insert into Toons values ("Sarah", "Risá", "Mage", "2");
