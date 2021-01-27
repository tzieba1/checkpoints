const sqlite3 = require('sqlite3');
const Promise = require('bluebird');

/**
 * Class represents custom query methods for backend repositories that extend the run(), get(), and all()
 *    methods supplied by the required sqlite3 database being constructed.
 */
class CheckPointsDataAccessObject {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(':memory:');
  }

  /**
   *  Method used to run an SQL query on the database.
   * @param {Query used to return a result} sql 
   * @param {Query paramters} params 
   */
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if(err) {
          console.log('Error running sql ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve({id: this.lastID});
        }
      });
    });
  }

  /**
   * Method used by repositories to return a single entry using an SQL query.
   * @param {Query used to retrieve one entry} sql 
   * @param {Query parameters} params 
   */
  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log('Error running sql: ' + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  /**
   * Method used by repositories to return an Array of entries using an SQL query.
   * @param {Query used to return many entries} sql 
   * @param {Query parameters} params 
   */
  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log('Error running sql: ' + sql)
          console.log(err)
          reject(err)
        } else {
          resolve(rows);
        }
      })
    })
  }
}

module.exports = CheckPointsDataAccessObject;