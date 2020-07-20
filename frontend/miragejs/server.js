// src/server.js
import { Server, Model, belongsTo, RestSerializer } from 'miragejs'

const studentList = [
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
]
const groupList = [
	{
		name: '2a',
		is_individual: false,
	},
	{
		name: 'Кызы Ачумбек Ачумбекович',
		is_individual: true,
	},
]

function convertToStudentShort(student) {
	return {
		id: student.id,
		name: student.name,
		family: student.family,
		patronymic: student.patronymic,
		group: student.group,
	}
}
var ApplicationSerializer = RestSerializer.extend({
	root: false,
	keyForAttribute(attr) {
		//by default Serializer convert snake_case attr to camelCase. This function disable this behaviour
		return attr
	},
})
export function makeServer({ environment = 'development' } = {}) {
	let server = new Server({
		environment,

		models: {
			student: Model.extend({
				group: belongsTo(),
			}),
			group: Model,
		},

		seeds(server) {
			groupList.forEach((el) => {
				server.create('group', el)
			})
			studentList.forEach((el) => {
				server.create('student', {
					...el,
					group: server.schema.groups.findBy({ name: el.group }),
				})
			})
		},

		extractGroupByName(name) {
			var group = schema.groups.all().find((g) => g.name === name)
			if (group === null) return null
			group.student_count = this.studentList.filter(
				(s) => s.group === name
			).length
			return { ...group }
		},
		routes() {
			this.namespace = 'api'
			this.timing = 500
			this.get('/students', function (schema, request) {
				const students = schema.students.all()
				var json = this.serialize(students, 'student-short')
				json.forEach((el) => {
					if (!el.group) return
					const g = schema.groups.find(el.group)
					el.group = this.serialize(g, 'group-short')
				})
				return json
			})
			this.get('/students/:id', function (schema, request) {
				const student = schema.students.find(request.params.id)
				var json = this.serialize(student, 'student')
				if (json.group) {
					const g = schema.groups.find(json.group)
					json.group = this.serialize(g, 'group-short')
				}
				return json
			})
			this.get('/groups', function (schema, request) {
				const groups = schema.groups.all()
				var json = this.serialize(groups, 'group-short')
				return json
			})
			this.get('/groups/:id', function (schema, request) {
				const group = schema.groups.findBy({ name: request.params.id })
				var json = this.serialize(group, 'group')
				const students = schema.students.where({ groupId: group.id })
				const students_jsons = this.serialize(students, 'student-short')
				students_jsons.forEach((el) => {
					el.group = this.serialize(group, 'group-short')
				})
				json.students = students_jsons
				return json
			})
			this.del('/students/:id', function (schema, request) {
				const student = schema.students.find(request.params.id)
				if (student.group && student.group.is_individual) {
					student.group.destroy()
				}
				student.destroy()
			})
			this.post('/students/', function (schema, request) {
				var attr = JSON.parse(request.requestBody)
				const student = schema.students.create(attr)
				const json = this.serialize(student, 'student')
				return json
			})
			this.post('/students/:id', function (schema, request) {
				var attr = JSON.parse(request.requestBody)
				if (attr.group) {
					attr.group = schema.groups.findBy({ name: attr.group })
					attr.groupId = attr.group.id
				} else {
					attr.group = null
					attr.groupId = null
				}

				//update student
				var student = schema.db.students.update(request.params.id, attr)

				var s2 = schema.students.find(student.id)
				var json = this.serialize(s2, 'student')
				if (json.group) {
					const g = schema.groups.find(json.group)
					json.group = this.serialize(g, 'group-short')
				}
				return json
			})
			this.post('/groups/', function (schema, request) {
				var attr = JSON.parse(request.requestBody)
				const group = schema.groups.create(attr)
				const json = this.serialize(group, 'group')
				return json
			})
			this.post('/groups/:id', function (schema, request) {
				var attr = JSON.parse(request.requestBody)
				const group = schema.groups.findBy({ name: request.params.id })
				group.update('name', attr.name)
				group.update('is_idividual', attr.is_individual)
				const json = this.serialize(group, 'group')
				return json
			})
			this.del('/groups/:id', function (schema, request) {
				const group = schema.groups.findBy({ name: request.params.id })
				group.destroy()
			})
		},

		serializers: {
			application: ApplicationSerializer,
			student: ApplicationSerializer,
			studentShort: ApplicationSerializer.extend({
				attrs: ['id', 'name', 'family', 'patronymic', 'group'],
				embed: false,
			}),
			group: ApplicationSerializer,
			groupShort: ApplicationSerializer.extend({
				attr: ['name', 'is_individual'],
				serialize(object, options) {
					let json = RestSerializer.prototype.serialize.apply(this, arguments)
					if (Array.isArray(json)) {
						//if serialize array
						json.forEach((element) => {
							element.student_count = this.schema.students.where({
								groupId: element.id,
							}).length
						})
					} else {
						//if serialize single object
						json.student_count = this.schema.students.where({
							groupId: arguments[0].id,
						}).length
					}
					return json
				},
			}),
			/*
			export default Serializer.extend({
  include: function(request,obj) {
    if (request.queryParams.posts) {
      return ['blogPosts'];
    } else {
      return [];
    }
  }
});
*/
		},
	})

	return server
}
