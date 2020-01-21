create database Keystones;

create table Keystones (
    RealName        varchar(20)         not null,
    CharName        varchar(20)         not null,
    CharClass       varchar(20)         not null,
    CharRoles       varchar(3),
    CharILevel      int,
    KeyDungeon      varchar(20),
    KeyLevel        int,
    MaxDungeon      varchar(20),
    MaxLevel        int,

    primary key (RealName, CharName)
);

insert into Keystones values ("Matt", "Matchi", "Monk", "123", null, null, null, null, null);
insert into Keystones values ("Matt", "Maios", "DeathKnight", "12", null, null, null, null, null);
insert into Keystones values ("Jeremy", "Demondude", "Warlock", "2", null, null, null, null, null);
insert into Keystones values ("Jeremy", "Whitelight", "Paladin", "12", null, null, null, null, null);
insert into Keystones values ("Kyle", "Aessthetics", "Druid", "13", null, null, null, null, null);
insert into Keystones values ("Bravo", "ßrâvø", "DemonHunter", "12", null, null, null, null, null);
insert into Keystones values ("Bravo", "Touka", "Druid", "2", null, null, null, null, null);
insert into Keystones values ("Ken", "Thagurok", "DeathKnight", "1", null, null, null, null, null);
insert into Keystones values ("Ken", "Magerina", "Mage", "2", null, null, null, null, null);
insert into Keystones values ("Sarah", "Risá", "Mage", "2", null, null, null, null, null);
insert into Keystones values ("Ilan", "Kohi", "Shaman", "23", null, null, null, null, null);
