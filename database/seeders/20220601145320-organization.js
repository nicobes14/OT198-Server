'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Organizations', [
      {
        name: 'ONG - Somos Más',
        image: 'http://ongapi.alkemy.org/storage/Ibh6Ggxr26.png',
        address: 'Paraguay 733, (C1057AAI) Ciudad Autónoma de Buenos Aires',
        phone: '1160112988',
        email: 'somosfundacionmas@gmail.com',
        facebookUrl: "https://www.facebook.com/Somos_Más",
        linkedinUrl: "",
        instagramUrl: "https://www.instagram.com/SomosMás",
        welcomeText: "Bienvenido a Somos Más",
        aboutUsText: "Somos más surge como ONG desde la necesidad de los chicos mas vulenerados socialmente. Uniendo las manos de todas las familias, las que viven en el barrio y las que viven fuera de él, es que podemos pensar, crear y garantizar estos procesos. Somos una asociación civil sin fines de lucro que se creó en 1997 con la intención de dar alimento a las familias del barrio. Con el tiempo fuimos involucrándonos con la comunidad y agrandando y mejorando nuestra capacidad de trabajo. Hoy somos un centro comunitario que acompaña a más de 700 personas a través de las áreas de: Educación, deportes, primera infancia, salud, alimentación y trabajo social.",
        createdAt: new Date,
        updatedAt: new Date
      }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Organizations', null, {});

  }
};
