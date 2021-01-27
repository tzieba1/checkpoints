class PinTagRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() { 
    const sql = `
      CREATE TABLE IF NOT EXISTS pinTags (
        pinTagId INTEGER PRIMARY KEY AUTOINCREMENT,  
        pinId INTEGER,
        tagId INTEGER,
        CONSTRAINT pinTags_fk_pinId FOREIGN KEY (pinId)
          REFERENCES pins(pinId) ON UPDATE CASCADE ON DELETE CASCADE,
        CONSTRAINT pinTags_fk_tagId FOREIGN KEY (tagId)
          REFERENCES tags(tagId) ON UPDATE CASCADE ON DELETE CASCADE   
      )`;
    return this.dao.run(sql);
  }

  create(pinId, tagId) {
    return this.dao.run(`INSERT INTO pinTags (pinId, tagId) VALUES (?, ?)`,[pinId, tagId]);
  }

  getById(pinTagId) {
    return this.dao.get(`SELECT * FROM pinTags WHERE pinTagId = ?`, [[pinTagId]])
  }

  getByPinId(pinId) {
    return this.dao.all(`SELECT * FROM pinTags WHERE pinId = ?`, [pinId])
  }

  getByTagId(tagId) {
    return this.dao.all(`SELECT * FROM pinTags WHERE tagId = ?`, [tagId])
  }

  delete(pinTagId) {
    return this.dao.run(`DELETE FROM pinTags WHERE pinTagId = ?`, [pinTagId]);
  }
}

module.exports = PinTagRepository;