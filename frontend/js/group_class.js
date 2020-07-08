import Student from './student_class'

export default class Group {
	constructor(obj, detailed) {
		if (!obj) {
			this.detailed = false
			this.name = ''
			this.students = []
			this.is_individual = false
			this.student_count = 0
			return
		}
		this.detailed = detailed
		this.name = obj.name
		this.is_individual = obj.is_individual
		this.student_count = obj.student_count
		if (obj.students) {
			const studentList = obj.students.map(function (el) {
				return new Student({ ...el }, false)
			})
			this.students = studentList
		} else {
			this.students = []
		}
	}

	clone() {
		return new Group(this, this.detailed)
	}
}
