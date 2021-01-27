class ProvincialParkRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() { 
    const sql = `
      CREATE TABLE IF NOT EXISTS provincialParks (
        provincialParkId INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        shortName TEXT, 
        className TEXT, 
        clusterName TEXT, 
        area REAL, 
        geometry TEXT,
        coordinates BLOB
      )`;
    return this.dao.run(sql);
  }

  create(name, shortName, className, clusterName, area, geometry, coordinates) {
    return this.dao.run(`
      INSERT INTO provincialParks (name, shortName, className, clusterName, area, geometry, coordinates) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, shortName, className, clusterName, area, geometry, coordinates]
    );
  }

  getById(provincialParkId) {
    return this.dao.get(`SELECT * FROM provincialParks WHERE provincialParkId = ?`, [provincialParkId])
  }

  getAll() {
    return this.dao.all(`SELECT * FROM provincialParks`);
  }

  update(provincialPark) {
    const {provincialParkId, name, shortName, className, clusterName, area, geometry, coordinates} = provincialPark;
    return this.dao.run(`
      UPDATE provincialParks
      SET name = ?, shortName = ?, className = ?, clusterName = ?, area = ?, geometry = ?, coordinates = ?
      WHERE provincialParkId = ?`,
      [name, shortName, className, clusterName, area, geometry, coordinates, provincialParkId]
    );
  }

  delete(provincialParkId) {
    return this.dao.run(`DELETE FROM provincialParks WHERE provincialParkId = ?`, [provincialParkId]);
  }
}

module.exports = ProvincialParkRepository;