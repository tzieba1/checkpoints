class PinRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() { 
    const sql = `
      CREATE TABLE IF NOT EXISTS pins (
        pinId INTEGER PRIMARY KEY AUTOINCREMENT, 
        latitude REAL, 
        longitude REAL, 
        image BLOB, 
        date TEXT, 
        description TEXT,
        state TEXT
      )`;
    return this.dao.run(sql);
  }

  create(latitude, longitude, image, date, description, state) {
    return this.dao.run(`
      INSERT INTO pins (latitude, longitude, image, date, description, state) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [latitude, longitude, image, date, description, state]
    );
  }

  getById(pinId) {
    return this.dao.get(`SELECT * FROM pins WHERE pinId = ?`, [pinId])
  }

  getAll() {
    return this.dao.all(`SELECT * FROM pins`);
  }

  update(pin) {
    const {pinId, latitude, longitude, image, date, description, state} = pin;
    return this.dao.run(`
      UPDATE pins
      SET latitude = ?, longitude = ?, image = ?, date = ?, description = ?, state = ?
      WHERE pinId = ?`,
      [pinId, latitude, longitude, image, date, description, state, pinId]
    );
  }

  delete(pinId) {
    return this.dao.run(`DELETE FROM pins WHERE pinId = ?`, [pinId]);
  }
}

module.exports = PinRepository;