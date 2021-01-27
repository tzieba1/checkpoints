class TrailSegmentRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() { 
    const sql = `
      CREATE TABLE IF NOT EXISTS trailSegments (
        trailSegmentId INTEGER PRIMARY KEY AUTOINCREMENT, 
        hazard TEXT, 
        onRoad INTEGER, 
        surface TEXT, 
        structure TEXT, 
        structureDescription TEXT,
        geometry TEXT,
        coordinates BLOB
      )`;
    return this.dao.run(sql);
  }

  create(hazard, onRoad, surface, structure, structureDescription, geometry, coordinates) {
    return this.dao.run(`
      INSERT INTO trailSegments (hazard, onRoad, surface, structure, structureDescription, geometry, coordinates) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [hazard, onRoad, surface, structure, structureDescription, geometry, coordinates]
    );
  }

  getById(trailSegmentId) {
    return this.dao.get(`SELECT * FROM trailSegments WHERE trailSegmentId = ?`, [trailSegmentId])
  }

  getAll() {
    return this.dao.all(`SELECT * FROM trailSegments`)
  }

  update(trailSegment) {
    const {trailSegmentId, hazard, onRoad, surface, structure, structureDescription, geometry, coordinates} = trailSegment;
    return this.dao.run(`
      UPDATE trailSegments
      SET hazard = ?, onRoad = ?, surface = ?, structure = ?, structureDescription = ?, geometry = ?, coordinates = ?
      WHERE trailSegmentId = ?`,
      [hazard, onRoad, surface, structure, structureDescription, geometry, coordinates, trailSegmentId]
    );
  }

  delete(trailSegmentId) {
    return this.dao.run(`DELETE FROM trailSegments WHERE trailSegmentId = ?`, [trailSegmentId]);
  }
}

module.exports = TrailSegmentRepository;