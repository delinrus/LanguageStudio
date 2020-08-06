import Student from './student_class'

export default class Lesson {
	constructor(obj) {
		if (!obj) {
			this.id = null
			this.date = Date.now()
			this.theme = 'Новая тема'
			this.homework = ''
			this.description = ''
			this.students = []
			return
		}
		this.id = obj.id
		this.date = new Date(obj.date)
		this.theme = obj.theme
		this.homework = obj.homework
		this.description = obj.description
		this.students = obj.students ? [...obj.students] : []
	}
	clone() {
		return new Lesson(this)
	}

	isEmpty() {
		return this.id === null
	}
}
