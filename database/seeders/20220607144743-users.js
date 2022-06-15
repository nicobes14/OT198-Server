'use strict';
const Roles = require('../../constants/roles')

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        firstName:"Nikita", 
        lastName:"Crook", 
        email:"ncrook0@yolasite.com", 
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi", 
        photo:"http://dummyimage.com/196x100.png/ff4444/ffffff", 
        roleId:Roles.ADMIN, 
        createdAt:new Date(), 
        updatedAt:new Date()
      },
      {
        firstName:"Mannie",
        lastName:"Labern",
        email:"mlabern1@army.mil",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/213x100.png/cc0000/ffffff",
        roleId:Roles.STANDARD,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Urbano",
        lastName:"Atterbury",
        email:"uatterbury2@eepurl.com",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/223x100.png/5fa2dd/ffffff",
        roleId:Roles.ADMIN,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Jacky",
        lastName:"Labrom",
        email:"jlabrom3@tumblr.com",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/205x100.png/cc0000/ffffff",
        roleId:Roles.STANDARD,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Alvira",
        lastName:"Meeks",
        email:"ameeks4@gizmodo.com",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/103x100.png/dddddd/000000",
        roleId:Roles.ADMIN,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Aila",
        lastName:"Gibling",
        email:"agibling5@about.com",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/208x100.png/cc0000/ffffff",
        roleId:Roles.STANDARD,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Mariquilla",
        lastName:"Bauldrey",
        email:"mbauldrey6@mayoclinic.com",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/207x100.png/ff4444/ffffff",
        roleId:Roles.ADMIN,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Cecilla",
        lastName:"Eye",
        email:"ceye7@omniture.com",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/207x100.png/cc0000/ffffff",
        roleId:Roles.STANDARD,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Courtnay",
        lastName:"Devennie",
        email:"cdevennie8@hugedomains.com",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/131x100.png/5fa2dd/ffffff",
        roleId:Roles.ADMIN,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Kele",
        lastName:"Blanchflower",
        email:"kblanchflower9@spiegel.de",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/167x100.png/dddddd/000000",
        roleId:Roles.STANDARD,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Flinn",
        lastName:"Guidoni",
        email:"fguidonia@archive.org",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/208x100.png/ff4444/ffffff",
        roleId:Roles.ADMIN,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Jillian",
        lastName:"Stillert",
        email:"jstillertb@eventbrite.com",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/133x100.png/ff4444/ffffff",
        roleId:Roles.STANDARD,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Ainslee",
        lastName:"Bonsul",
        email:"abonsulc@mac.com",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/113x100.png/dddddd/000000",
        roleId:Roles.ADMIN,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Ernesto",
        lastName:"Took",
        email:"etookd@youtu.be",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/158x100.png/dddddd/000000",
        roleId:Roles.STANDARD,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Jennee",
        lastName:"Partington",
        email:"jpartingtone@washington.edu",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/125x100.png/ff4444/ffffff",
        roleId:Roles.ADMIN,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Elsbeth",
        lastName:"Stichel",
        email:"estichelf@dagondesign.com",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/166x100.png/5fa2dd/ffffff",
        roleId:Roles.STANDARD,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Jeddy",
        lastName:"Gettins",
        email:"jgettinsg@epa.gov",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/227x100.png/cc0000/ffffff",
        roleId:Roles.ADMIN,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Shae",
        lastName:"Phillpot",
        email:"sphillpoth@reverbnation.com",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/144x100.png/dddddd/000000",
        roleId:Roles.STANDARD,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Fremont",
        lastName:"Horwell",
        email:"fhorwelli@oracle.com",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/151x100.png/cc0000/ffffff",
        roleId:Roles.ADMIN,
        createdAt:new Date(),
        updatedAt:new Date()
      },
      {
        firstName:"Rania",
        lastName:"Wraggs",
        email:"rwraggsj@state.tx.us",
        password:"$2b$12$MoOasB90mwaKwp5xkbGYauyIPfWh7oBZrYmCDaSG3o.LU.o4vQMZi",
        photo:"http://dummyimage.com/193x100.png/cc0000/ffffff",
        roleId:Roles.STANDARD,
        createdAt:new Date(),
        updatedAt:new Date()
      }], {});
    },
    
    async down (queryInterface, Sequelize) {
      /**
      * Add commands to revert seed here.
      *
      * Example:
      * await queryInterface.bulkDelete('People', null, {});
      */
    }
  };
  