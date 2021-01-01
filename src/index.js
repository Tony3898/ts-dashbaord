const college = require("./api/college")
const student = require("./api/students")
let source = {college,student} // to add your classes, for api calls
// do not change this, just add all the class at *source* for api calls to work
Object.assign(APICLASSES, source)
college.defaultValues().then(r => console.log(r)).catch(e => console.log(e))
student.defaultValues().then(r => console.log(r)).catch(e => console.log(e))
