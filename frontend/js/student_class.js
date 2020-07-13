import Group from './group_class'

export default class Student {
	constructor(obj, detailed) {
		if (!obj) {
			this.id = null
			this.detailed = detailed
			this.name = ''
			this.family = ''
			this.patronymic = ''
			this.group = null
			this.address = ''
			this.phone = ''
			this.parents = []
			return
		}
		this.id = obj.id
		this.name = obj.name
		this.patronymic = obj.patronymic
		this.family = obj.family
		this.group = new Group(obj.group, false)

		this.address = obj.address ? obj.adress : ''
		this.phone = obj.phone ? obj.phone : ''

		this.parents = obj.parents ? [...obj.parents] : []
		this.detailed = detailed
	}
	clone() {
		return new Student(this, this.detailed)
	}
}
