const Base = require('./base')

class College extends Base {
  constructor(collectionName) {
    super(collectionName)
    this.doc_id = 'id';
    super.setContext({doc_id: this.doc_id})
  }

  async defaultValues() {
    try {
      let previousData = await this.getAll()
      if (previousData && previousData.length) {
        return 'already inserted colleges'
      }
      let data = []
      let city = [], state = ["Andhra Pradesh",
            "Arunachal Pradesh",
            "Assam",
            "Bihar",
            "Chhattisgarh",
            "Goa",
            "Gujarat",
            "Haryana",
            "Himachal Pradesh",
            "Jammu and Kashmir",
            "Jharkhand",
            "Karnataka",
            "Kerala",
            "Madhya Pradesh",
            "Maharashtra",
            "Manipur",
            "Meghalaya",
            "Mizoram",
            "Nagaland",
            "Odisha",
            "Punjab",
            "Rajasthan",
            "Sikkim",
            "Tamil Nadu",
            "Telangana",
            "Tripura",
            "Uttarakhand",
            "Uttar Pradesh",
            "West Bengal",
            "Andaman and Nicobar Islands",
            "Chandigarh",
            "Dadra and Nagar Haveli",
            "Daman and Diu",
            "Delhi",
            "Lakshadweep",
            "Puducherry"],
          courses = ['Computer Science', 'IT', 'Electronics', 'Mechanical', 'Economics', 'MBBS', "BA", 'MBA', 'BCA', 'MCA']
      for (let i = 0; i <= 10; i++) {
        city.push(super.randomString(Math.floor(Math.random() * 10) + 1) + ' ' + super.randomString(Math.floor(Math.random() * 10) + 1).trim())
      }
      for (let i = 0; i < 100; i++) {
        let courseOffered = []
        for (let c = 0; c < 5; c++) {
          courseOffered = [...courseOffered, courses[Math.floor(Math.random() * (courses.length - 1))]]
        }
        data.push({
          id: i + 1,
          name: super.randomString(Math.floor(Math.random() * 10) + 1) + ' ' + super.randomString(Math.floor(Math.random() * 10) + 1).trim(),
          yearFounded: 1990 + Math.floor(Math.random() * 10),
          city: city[Math.floor(Math.random() * (city.length - 1))],
          state: state[Math.floor(Math.random() * (state.length - 1))],
          country: 'India',
          totalStudents: 100,
          courses: Array.from(new Set(courseOffered)),
        })
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

  async getAll(options) {
    try {
      return await super.getAll(options)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getDataByState(options) {
    try {
      let pipeline = []
      if (options.query)
        pipeline = [...pipeline, {
          $match: options.query
        }]

      pipeline = [...pipeline,
        {
          '$group': {
            '_id': '$state',
            'total': {
              '$sum': 1
            },
            'data': {
              '$push': '$$ROOT'
            }
          }
        }
      ]
      return await super.getByPipeline(pipeline)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getDataByCourse(options) {
    try {
      let pipeline = []
      if (options.query)
        pipeline = [...pipeline, {
          $match: options.query
        }]

      pipeline = [...pipeline,
        {
          '$unwind': {
            'path': '$courses',
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$group': {
            '_id': '$courses',
            'total': {
              '$sum': 1
            }
          }
        }
      ]
      return await super.getByPipeline(pipeline)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  async getDetails(options) {
    try {
      let pipeline = [
        {
          '$match': {
            '_id': options.query._id
          }
        }, {
          '$lookup': {
            'from': 'students',
            'localField': '_id',
            'foreignField': 'college_id',
            'as': 'stduentData'
          }
        }, {
          '$lookup': {
            'from': 'colleges',
            'as': 'similar',
            'let': {
              'courses': '$courses',
              'state': '$state',
              'id': '$_id'
            },
            'pipeline': [
              {
                '$match': {
                  '$expr': {
                    '$eq': [
                      '$$state', '$state'
                    ]
                  }
                }
              }, {
                '$match': {
                  '$expr': {
                    '$ne': [
                      '$$id', '$_id'
                    ]
                  }
                }
              }, {
                '$unwind': '$courses'
              }, {
                '$match': {
                  '$expr': {
                    '$in': [
                      '$courses', '$$courses'
                    ]
                  }
                }
              }
            ]
          }
        }
      ]
      return await super.getByPipeline(pipeline)
    } catch (e) {
      throw new Error(e.message)
    }
  }
}

module.exports = new College('colleges')