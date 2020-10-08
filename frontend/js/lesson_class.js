import Student from './student_class'

export default class Lesson {
	constructor(obj) {
		this.detailed = false
		if (!obj) {
			this.id = null
			this.group_id = null
			this.date = Date.now()
			this.theme = 'Новая тема'
			this.homework = ''
			this.description = ''
			this.students = []
			return
		}
		this.id = obj.id
		this.group_id = obj.group_id
		this.date = new Date(obj.date)
		this.theme = obj.theme
		this.homework = obj.homework
		this.description = obj.description
		this.students = obj.students ? [...obj.students] : []
		this.items = []
	}
	clone() {
		return new Lesson(this, this.detailed)
	}
	setItems(items) {
		this.items = items
		this.detailed = true
	}
	clearItems() {
		this.items = []
		this.detailed = false
	}
	isDetailed() {
		return this.detailed
	}
	isEmpty() {
		return this.id === null
	}
}
