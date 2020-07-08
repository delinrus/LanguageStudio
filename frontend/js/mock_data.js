import { extend } from 'lodash'
var Mock = {
	studentList: [
		{
			id: 1,
			name: 'Иван',
			family: 'Иванов',
			patronymic: 'Иванович',
			group: '2a',
			address: 'Адрес Иванова',
			phone: '+71234567890',
			parents: [],
		},
		{
			id: 2,
			name: 'Петя',
			family: 'Петров',
			patronymic: 'Петрович',
			group: '2a',
			address: 'Адрес Петрова',
			phone: '+71234567891',
			parents: [],
		},
		{
			id: 3,
			name: 'Василий',
			family: 'Сидров',
			patronymic: 'Александрович',
			group: '2a',
			address: 'Адрес Сидорова',
			phone: '+71234567892',
			parents: [],
		},
		{
			id: 4,
			name: 'Ачумбек',
			family: 'Кызы',
			patronymic: 'Ачумбекович',
			group: 'Кызы Ачумбек Ачумбекович',
			address: 'Адрес Кызы',
			phone: '+71234567893',
			parents: [],
		},
		{
			id: 5,
			name: 'Андрей',
			family: 'Безгрупный',
			patronymic: 'Давидович',
			group: null,
			address: '',
			phone: '',
			parents: [],
		},
	],
	groupList: [
		{
			name: '2a',
			is_individual: false,
		},
		{
			name: 'Кызы Ачумбек Ачумбекович',
			is_individual: true,
		},
	],
	TIMEOUT: 500,
	_extractGroupByName(name) {
		var group = this.groupList.find((g) => g.name === name)
		if (group === null) return null
		group.student_count = this.studentList.filter(
			(s) => s.group === name
		).length
		return { ...group }
	},
	_convertToStudentShort(student) {
		return {
			id: student.id,
			name: student.name,
			family: student.family,
			patronymic: student.patronymic,
			group: student.group,
		}
	},
	_generateId() {
		var maxId = 0
		this.studentList.forEach((element) => {
			maxId = Math.max(element.id, maxId)
		})
		return maxId + 1
	},
	async sleep() {
		await new Promise((r) => setTimeout(r, this.TIMEOUT))
	},
	async getGroups() {
		await this.sleep()
		const studentsWithGroup = this.studentList.filter((s) => s.group)
		var result = [...this.groupList]
		result.forEach((g) => {
			g.student_count = studentsWithGroup.filter(
				(s) => g.name === s.group
			).length
		})

		return result
	},

	async getGroupDetailsByName(name) {
		await this.sleep()
		const shortGroup = { ...this._extractGroupByName(name) }
		var result = { ...shortGroup }
		if (!result) return null
		result.students = this.studentList
			.filter((s) => s.group === result.name)
			.map(this._convertToStudentShort)
		//replace group_id by short group info
		result.students.forEach((el) => (el.group = shortGroup))
		return result
	},
	async getStudents() {
		await this.sleep()
		var result = this.studentList.map(this._convertToStudentShort)
		result.forEach((el) => {
			el.group = el.group ? this._extractGroupByName(el.group) : null
		})
		return [...result]
	},
	async getStudentById(id) {
		await this.sleep()
		var result = { ...this.studentList.filter((s) => s.id === id)[0] }
		result.group = result.group ? this._extractGroupByName(result.group) : null
		return result
	},

	async addStudent(student) {
		await this.sleep()
		const newId = this._generateId()

		const added_student = { ...student, id: newId }

		this.studentList.push(added_student)
		return { ...added_student }
	},
	async addGroup(group) {
		await this.sleep()
		if (this.groupList.find((el) => el.name === group.name)) {
			throw {
				message: "Can't create group. Group with this name already exist",
			}
		}
		this.groupList.push({ ...group })
		return { ...group }
	},

	async deleteGroupByName(name) {
		await this.sleep()
		this.groupList = this.groupList.filter((el) => el.name !== name)
		//remove this group from all students
		this.studentList.forEach(
			(el) => (el.group = el.group === name ? null : el.group)
		)
	},

	async deleteStudentById(student) {
		await this.sleep()
		this.studentList = this.studentList.filter((el) => el.id !== student.id)
	},

	isDifferentGroups(g1, g2) {
		if (g1 === null && g2 !== null) return true
		if (g1 !== null && g2 === null) return true
		return g1.name !== g2.name
	},

	async updateStudent(newStudentData) {
		await this.sleep()
		var s = this.studentList.find((el) => el.id === newStudentData.id)
		//if group changed
		if (this.isDifferentGroups(newStudentData.group, s.group)) {
			//if added group
			if (newStudentData.group) {
				var addedGroup = this._extractGroupByName(newStudentData.group)
				if (!addedGroup) throw { message: "Can't update student.Wrong group" }
				s.group = addedGroup.name
			} else {
				//delete group
				if (s.group.is_individual) {
					this.groupList = this.groupList.filter((g) => g.name !== s.group.name)
				}
				s.group = null
			}
		}
		extend(s, newStudentData)
		return await this.getStudentById(s.id)
	},
	async updateGroup(name, newGroupData) {
		await this.sleep()
		var g = this.groupList.find((el) => el.name === name)
		//if name changed
		if (name !== newGroupData.name) {
			this.studentList.forEach((element) => {
				element.group = newGroupData.name
			})
		}
		extend(g, newGroupData)
		return await this.getGroupDetailsByName(g.name)
	},
	async studentSetGroup(student, group_id) {
		return await this.updateStudent({ ...student, group: group_id })
	},
}
export default Mock
