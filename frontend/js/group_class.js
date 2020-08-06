import Student from './student_class'
import Lesson from './lesson_class'
export default class Group {
	constructor(obj, detailed) {
		if (!obj) {
			this.id = null
			this.detailed = false
			this.name = ''
			this.students = []
			this.is_individual = false
			this.student_count = 0
			this.lessons = []
			return
		}
		this.id = obj.id
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
		if (obj.lessons) {
			const lessons = obj.lessons.map(function (el) {
				return new Lesson({ ...el })
			})
			this.lessons = lessons
		} else {
			this.lessons = []
		}
	}

	clone() {
		return new Group(this, this.detailed)
	}

	isEmpty() {
		return this.id === null
	}
}
