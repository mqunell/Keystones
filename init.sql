create database Keystones;
use Keystones;

create table Toons (
    RealName        varchar(20)         not null,
    ToonName        varchar(20)         not null,
    ToonClass       varchar(20)         not null,
    ToonRoles       varchar(3),

    primary key (RealName, ToonName)
);

create table Keystones (
    ToonName        varchar(20)         not null,
    KeyDungeon      varchar(20),
    KeyLevel        int,
    MaxDungeon      varchar(20),
    MaxLevel        int,

    primary key (ToonName)
);

-- insert into Toons values ("Matt", "Blyskyn", "Mage", "2");
-- insert into Toons values ("Matt", "Maios", "DeathKnight", "2");
-- insert into Toons values ("Matt", "Matchi", "Monk", "123");
-- insert into Toons values ("Jeremy", "Demondude", "Warlock", "2");
-- insert into Toons values ("Jeremy", "Whitelight", "Paladin", "12");
-- insert into Toons values ("Kyle", "Aessthetics", "Druid", "13");
-- insert into Toons values ("Bravo", "Bravo", "DemonHunter", "12");
-- insert into Toons values ("Bravo", "Secre", "Warrior", "2");
-- insert into Toons values ("Ilan", "Kohi", "Shaman", "23");
-- insert into Toons values ("Ken", "Magerina", "Mage", "2");
-- insert into Toons values ("Ken", "Thagurok", "DeathKnight", "1");
-- insert into Toons values ("Sarah", "Risá", "Mage", "2");
