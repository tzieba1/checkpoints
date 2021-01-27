class MunicipalParkRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() { 
    const sql = `
      CREATE TABLE IF NOT EXISTS municipalParks (
        municipalParkId INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        locationDescription TEXT, 
        geographicalDescription TEXT, 
        area REAL, 
        geometry TEXT,
        coordinates BLOB
      )`;
    return this.dao.run(sql);
  }

  create(name, locationDescription, geographicalDescription, area, geometry, coordinates) {
    return this.dao.run(`
      INSERT INTO municipalParks (name, locationDescription, geographicalDescription, area, geometry, coordinates) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [name, locationDescription, geographicalDescription, area, geometry, coordinates]
    );
  }

  getById(municipalParkId) {
    return this.dao.get(`SELECT * FROM municipalParks WHERE municipalParkId = ?`, [municipalParkId])
  }

  getAll() {
    return this.dao.all(`SELECT * FROM municipalParks`)
  }


  update(municipalPark) {
    const {municipalParkId, name, locationDescription, geographicalDescription, area, geometry, coordinates} = municipalPark;
    return this.dao.run(`
      UPDATE municipalParks
      SET name = ?, locationDescription = ?, geographicalDescription = ?, area = ?, geometry = ?, coordinates = ?
      WHERE municipalParkId = ?`,
      [name, locationDescription, geographicalDescription, area, geometry, coordinates, municipalParkId]
    );
  }

  delete(municipalParkId) {
    return this.dao.run(`DELETE FROM municipalParks WHERE municipalParkId = ?`, [municipalParkId]);
  }
}

module.exports = MunicipalParkRepository;