exports.seed = function(knex) {
  return knex('cars').truncate()
    .then(function () {
      return knex('cars').insert([
        {make: 'Tesla', model: 'Model 3', year: '2020'},
        {make: 'Mercedes-Benz', model: 'S 63 Coupe', year: '2019'},
        {make: 'Audi', model: 'r8', year: '2020'},
        {make: 'Porsche', model: '911 Turbo S', year: '2020'}
      ]);
    });
};
