class TagRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() { 
    const sql = `
      CREATE TABLE IF NOT EXISTS tags (
        tagId INTEGER PRIMARY KEY AUTOINCREMENT,  
        name TEXT
      )`;
    return this.dao.run(sql);
  }

  create(name) {
    return this.dao.run(`INSERT INTO tags (name) VALUES (?)`,[name]);
  }

  getById(tagId) {
    return this.dao.get(`SELECT * FROM tags WHERE tagId = ?`, [[tagId]])
  }

  getAll() {
    return this.dao.all(`SELECT * FROM tags`)
  }

  update(tag) {
    const {tagId, name} = tag;
    return this.dao.run(`
      UPDATE tags
      SET name = ?
      WHERE tagId = ?`,
      [name, tagId]
    );
  }

  delete(tagId) {
    return this.dao.run(`DELETE FROM tags WHERE tagId = ?`, [tagId]);
  }
}

module.exports = TagRepository;