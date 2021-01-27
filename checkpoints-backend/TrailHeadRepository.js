class TrailHeadRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() { 
    const sql = `
      CREATE TABLE IF NOT EXISTS trailHeads (
        trailHeadId INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT, 
        grouping TEXT, 
        association TEXT, 
        associationWebsite TEXT, 
        description TEXT,
        geometry TEXT,
        coordinates BLOB
      )`;
    return this.dao.run(sql);
  }

  create(name, grouping, association, associationWebsite, description, geometry, coordinates) {
    return this.dao.run(`
      INSERT INTO trailHeads (name, grouping, association, associationWebsite, description, geometry, coordinates) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, grouping, association, associationWebsite, description, geometry, coordinates]
    );
  }

  getById(trailHeadId) {
    return this.dao.get(`SELECT * FROM trailHeads WHERE trailHeadId = ?`, [trailHeadId])
  }

  getAll() {
    return this.dao.all(`SELECT * FROM trailHeads`)
  }

  update(trailHead) {
    const {trailHeadId, name, grouping, association, associationWebsite, description, geometry, coordinates} = trailHead;
    return this.dao.run(`
      UPDATE trailHeads
      SET name = ?, grouping = ?, association = ?, associationWebsite = ?, description = ?, geometry = ?, coordinates = ?
      WHERE trailHeadId = ?`,
      [name, grouping, association, associationWebsite, description, geometry, coordinates, trailHeadId]
    );
  }

  delete(trailHeadId) {
    return this.dao.run(`DELETE FROM trailHeads WHERE trailHeadId = ?`, [trailHeadId]);
  }
}

module.exports = TrailHeadRepository;