// src/server.js
import { Server, Model, belongsTo, RestSerializer, hasMany } from 'miragejs'

const studentList = [
	{
		id: 1,
		name: 'Иван',
		family: 'Иванов',
		patronymic: 'Иванович',
		groupId: 1,
		address: 'Адрес Иванова',
		phone: '+71234567890',
		parents: [],
	},
	{
		id: 2,
		name: 'Петя',
		family: 'Петров',
		patronymic: 'Петрович',
		groupId: 1,
		address: 'Адрес Петрова',
		phone: '+71234567891',
		parents: [],
	},
	{
		id: 3,
		name: 'Василий',
		family: 'Сидоров',
		patronymic: 'Александрович',
		groupId: 1,
		address: 'Адрес Сидорова',
		phone: '+71234567892',
		parents: [],
	},
	{
		id: 4,
		name: 'Ачумбек',
		family: 'Кызы',
		patronymic: 'Ачумбекович',
		groupId: 2,
		address: 'Адрес Кызы',
		phone: '+71234567893',
		parents: [],
	},
	{
		id: 5,
		name: 'Андрей',
		family: 'Безгрупный',
		patronymic: 'Давидович',
		groupId: null,
		address: '',
		phone: '',
		parents: [],
	},
]
const groupList = [
	{
		id: 1,
		name: '2a',
		is_individual: false,
		lessons: [],
	},
	{
		id: 2,
		name: 'Кызы Ачумбек Ачумбекович',
		is_individual: true,
		lessons: [],
	},
]

const firstGroupLessons = [
	{
		id: 1,
		date: new Date(2020, 6, 3),
		theme: 'Present Simple',
		homework: '',
		description: 'Очень простое примечание',
		students: [1, 2, 4],
	},
	{
		id: 2,
		date: new Date(2020, 6, 1),
		theme: 'Present Perfect',
		homework: 'Задала домашнее задание, упражнения №1,2,3',
		description:
			'Длинное длинное длинное примечание, очень и очень простое примечание. Здесь можно написать кто виноват и что делали на уроке',
		students: [1, 2, 4],
	},
	{
		id: 3,
		date: new Date(2020, 6, 8),
		theme: 'Тема Have/Has got',
		homework:
			'Длинное домашнее задание, сделать много упражнений и собственных примером. Сделать дома тест',
		description: '',
		students: [1, 2, 4],
	},
	{
		id: 4,
		date: new Date(2020, 6, 10),
		theme: 'The Alphabet (Алфавит)',
		homework:
			'Listen and read. Number the pictures. – Послушайте и прочитайте. Пронумеруйте картинки.',
		description: '',
		students: [1, 2, 4],
	},
	{
		id: 5,
		date: new Date(2020, 6, 15),
		theme: 'There is / There are (Оборот "есть", "имеется", "находится")',
		homework: 'Write the words in the chart. – Впишите слова в таблицу.',
		description: '',
		students: [1, 2, 4],
	},
	{
		id: 6,
		date: new Date(2020, 6, 17),
		theme: 'Can / Can’t (Глагол "уметь", "мочь")',
		homework:
			'Look at the photos. In pairs, ask and answer the questions. – Посмотрите на фотографии. Отработайте вопросы в парах. (Сначала один задает, другой отвечает, и наоборот).',
		description: '',
		students: [1, 2, 4],
	},
	{
		id: 7,
		date: new Date(2020, 6, 30),
		theme: 'Regular and Irregular Verbs (Правильные и неправильные глаголы)',
		homework:
			'Fill in the gaps in these sentences (with suitable…) – Заполните пропуски в этих предложениях (с помощью подходящих…)',
		description: '',
		students: [1, 2, 4],
	},
	{
		id: 8,
		date: new Date(2020, 7, 3),
		theme:
			'Present Continuous for future (Настоящее продолженное время для обозначения будущего)',
		homework:
			'Choose a word from the box below to match each definition. – Для каждого определения выберите подходящее слово из рамки, представленной ниже.',
		description: '',
		students: [1, 2, 4],
	},
	{
		id: 9,
		date: new Date(2020, 7, 5),
		theme: 'Suggestions, invitations and offers',
		homework:
			'Find a word in the diagram above that fits each definition. – Для каждого определения найдите подходящее слово в диаграмме, представленной выше.',

		description: '',
		students: [1, 2, 4],
	},
	{
		id: 10,
		date: new Date(2020, 7, 10),
		theme: 'Future Simple (Будущее простое время)',
		homework: 'Describe… - Опишите…',
		description: '',
		students: [1, 2, 3],
	},
	{
		id: 11,
		date: new Date(2020, 7, 12),
		theme: 'To be in the Future (Глагол "быть" в будущем)',
		homework: '',
		description: '',
		students: [1, 2, 3],
	},
]

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
			group: Model.extend({
				lessons: hasMany(),
			}),
			lesson: Model.extend({
				group: belongsTo(),
			}),
		},
		seeds(server) {
			groupList.forEach((el) => {
				server.create('group', el)
			})
			firstGroupLessons.forEach((el) => {
				server.create('lesson', { ...el, groupId: 1 })
			})
			//debugger
			studentList.forEach((el) => {
				server.create('student', el)
			})
		},
		routes() {
			this.namespace = 'api'
			this.logging = false
			this.timing = 500
			//STUDENTS
			//get students
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
			//view student details
			this.get('/students/:id', function (schema, request) {
				const student = schema.students.find(request.params.id)
				var json = this.serialize(student, 'student')
				if (json.group) {
					const g = schema.groups.find(json.group)
					json.group = this.serialize(g, 'group-short')
				}
				return json
			})

			//create student
			this.post('/students/', function (schema, request) {
				var attr = JSON.parse(request.requestBody)
				if (attr.group) {
					attr.groupId = attr.group
				} else {
					attr.groupId = null
				}
				const student = schema.students.create(attr)
				const json = this.serialize(student, 'student')
				return json
			})
			//update student
			this.post('/students/:id', function (schema, request) {
				var attr = JSON.parse(request.requestBody)
				if (attr.group) {
					attr.group = schema.groups.find(attr.group)
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
			//delete student
			this.del('/students/:id', function (schema, request) {
				const student = schema.students.find(request.params.id)
				if (student.group && student.group.is_individual) {
					student.group.destroy()
				}
				student.destroy()
			})

			//GROUPS
			//get groups
			this.get('/groups', function (schema, request) {
				const groups = schema.groups.all()
				var json = this.serialize(groups, 'group-short')
				return json
			})
			//view group's details
			this.get('/groups/:id', function (schema, request) {
				const group = schema.groups.find(request.params.id)
				var json = this.serialize(group, 'group')
				const students = schema.students.where({ groupId: group.id })
				const students_jsons = this.serialize(students, 'student-short')
				students_jsons.forEach((el) => {
					el.group = this.serialize(group, 'group-short')
				})
				json.students = students_jsons
				var lessons = schema.lessons
					.where({ groupId: group.id })
					.sort((a, b) => {
						return a.date - b.date
					})
				const lessons_jsons = this.serialize(lessons, 'lesson')
				json.lessons = lessons_jsons
				return json
			})
			//create group
			this.post('/groups/', function (schema, request) {
				var attr = JSON.parse(request.requestBody)
				const group = schema.groups.create(attr)
				const json = this.serialize(group, 'group')
				return json
			})
			//update group
			this.post('/groups/:id', function (schema, request) {
				var attr = JSON.parse(request.requestBody)
				var group = schema.groups.find(request.params.id)
				group.update('name', attr.name)
				group.update('is_individual', attr.is_individual)
				//return details json
				var json = this.serialize(group, 'group')
				const students = schema.students.where({ groupId: group.id })
				const students_jsons = this.serialize(students, 'student-short')
				students_jsons.forEach((el) => {
					el.group = this.serialize(group, 'group-short')
				})
				json.students = students_jsons
				return json
			})
			//delete group
			this.del('/groups/:id', function (schema, request) {
				//remove students with deleting group from group
				const students = schema.db.students.where({
					groupId: request.params.id,
				})
				if (students) {
					students.forEach((el) => {
						el.groupId = null
						el.group = null
						schema.db.students.update(el.id, el)
					})
				}
				var group = schema.groups.find(request.params.id)
				group.destroy()
			})

			//LESSONS
			//create lesson
			this.post('/groups/:group_id/lessons', function (schema, request) {
				var attr = JSON.parse(request.requestBody)
				var group = schema.groups.find(request.params.group_id)
				const students = schema.db.students
					.where({ groupId: group.id })
					.map((el) => el.id)
				var lesson = schema.lessons.create({
					...attr,
					students: students,
					groupId: group.id,
					date: new Date(attr.date),
				})
				//return details json
				var json = this.serialize(lesson, 'lesson')
				return json
			})
			//update lesson
			this.post('/groups/:group_id/lessons/:lesson_id', function (
				schema,
				request
			) {
				var attr = JSON.parse(request.requestBody)
				var lesson = schema.lessons.find(request.params.lesson_id)
				//lesson have unique id
				lesson.update('theme', attr.theme)
				lesson.update('date', attr.date)
				lesson.update('homework', attr.homework)
				lesson.update('description', attr.description)
				//return details json
				var json = this.serialize(lesson, 'lesson')
				return json
			})
		},
		serializers: {
			application: ApplicationSerializer,
			student: ApplicationSerializer,
			studentShort: ApplicationSerializer.extend({
				attrs: ['id', 'name', 'family', 'patronymic', 'group'],
				embed: false,
			}),
			group: ApplicationSerializer.extend({
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
			groupShort: ApplicationSerializer.extend({
				attr: ['id', 'name', 'is_individual'],
				serialize(object, options) {
					let json = RestSerializer.prototype.serialize.apply(this, arguments)
					if (Array.isArray(json)) {
						//if serialize array
						json.forEach((element) => {
							element.student_count = this.schema.students.where({
								groupId: element.id,
							}).length
							delete element.lessons
						})
					} else {
						//if serialize single object
						json.student_count = this.schema.students.where({
							groupId: arguments[0].id,
						}).length
						delete json.lessons
					}
					return json
				},
			}),
			lesson: ApplicationSerializer.extend({
				attr: ['id', 'date', 'theme', 'homework', 'description', 'students'],
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
