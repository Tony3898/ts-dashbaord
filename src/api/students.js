const Base = require('./base')

class Student extends Base {
  constructor(collectionName) {
    super(collectionName)
    this.doc_id = 'id';
    super.setContext({doc_id: this.doc_id})
  }

  async defaultValues() {
    try {
      let previousData = await this.getAll()
      if (previousData && previousData.length) {
        return 'already inserted students'
      }
      let data = [],
          allSkills = ['JAVA', 'C++', 'C', 'Javascript', 'Physics', 'Maths', "Aptitude", 'Python', 'PHP', 'Biology', 'Chemistry']
      let id = 1
      for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
          id++
          let skills = []
          for (let s = 0; s < 5; s++) {
            skills = [...skills, allSkills[Math.floor(Math.random() * (allSkills.length - 1))]]
          }
          data.push({
            id: id,
            name: super.randomString(Math.floor(Math.random() * 10) + 1) + ' ' + super.randomString(Math.floor(Math.random() * 10) + 1).trim(),
            yearBatch: 1990 + Math.floor(Math.random() * 10),
            college_id: i + 1,
            skills: Array.from(new Set(skills)),
          })
        }
      }
      return await this.insert(data)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async insert(options) {
    try {
      await super.insert(options)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getStudentDetails(options) {
    try {
      if (!options.query && !options.query._id)
        throw new Error('_id is required')
      let pipeline = [
        {
          '$match': {
            '_id': options.query._id
          }
        }, {
          '$lookup': {
            'from': 'colleges',
            'localField': 'college_id',
            'foreignField': '_id',
            'as': 'college'
          }
        }, {
          '$unwind': {
            'path': '$college',
            'preserveNullAndEmptyArrays': true
          }
        }
      ]
      return await super.getByPipeline(pipeline)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getAll(options) {
    try {
      return await super.getAll(options)
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

module.exports = new Student('students')