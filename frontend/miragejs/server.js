// src/server.js
import { Server, Model, belongsTo, RestSerializer, hasMany } from 'miragejs'
import { AttendanceEnum, HomeworkEnum } from '@/js/lesson_item_class'
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
		//students: [1, 2, 4],
	},
	{
		id: 2,
		date: new Date(2020, 6, 1),
		theme: 'Present Perfect',
		homework: 'Задала домашнее задание, упражнения №1,2,3',
		description:
			'Длинное длинное длинное примечание, очень и очень простое примечание. Здесь можно написать кто виноват и что делали на уроке',
		//students: [1, 2, 4],
	},
	{
		id: 3,
		date: new Date(2020, 6, 8),
		theme: 'Тема Have/Has got',
		homework:
			'Длинное домашнее задание, сделать много упражнений и собственных примером. Сделать дома тест',
		description: '',
		//students: [1, 2, 4],
	},
	{
		id: 4,
		date: new Date(2020, 6, 10),
		theme: 'The Alphabet (Алфавит)',
		homework:
			'Listen and read. Number the pictures. – Послушайте и прочитайте. Пронумеруйте картинки.',
		description: '',
		//students: [1, 2, 4],
	},
	{
		id: 5,
		date: new Date(2020, 6, 15),
		theme: 'There is / There are (Оборот "есть", "имеется", "находится")',
		homework: 'Write the words in the chart. – Впишите слова в таблицу.',
		description: '',
		//students: [1, 2, 4],
	},
	{
		id: 6,
		date: new Date(2020, 6, 17),
		theme: 'Can / Can’t (Глагол "уметь", "мочь")',
		homework:
			'Look at the photos. In pairs, ask and answer the questions. – Посмотрите на фотографии. Отработайте вопросы в парах. (Сначала один задает, другой отвечает, и наоборот).',
		description: '',
		//students: [1, 2, 4],
	},
	{
		id: 7,
		date: new Date(2020, 6, 30),
		theme: 'Regular and Irregular Verbs (Правильные и неправильные глаголы)',
		homework:
			'Fill in the gaps in these sentences (with suitable…) – Заполните пропуски в этих предложениях (с помощью подходящих…)',
		description: '',
		//students: [1, 2, 4],
	},
	{
		id: 8,
		date: new Date(2020, 7, 3),
		theme:
			'Present Continuous for future (Настоящее продолженное время для обозначения будущего)',
		homework:
			'Choose a word from the box below to match each definition. – Для каждого определения выберите подходящее слово из рамки, представленной ниже.',
		description: '',
		//students: [1, 2, 4],
	},
	{
		id: 9,
		date: new Date(2020, 7, 5),
		theme: 'Suggestions, invitations and offers',
		homework:
			'Find a word in the diagram above that fits each definition. – Для каждого определения найдите подходящее слово в диаграмме, представленной выше.',

		description: '',
		//students: [1, 2, 4],
	},
	{
		id: 10,
		date: new Date(2020, 7, 10),
		theme: 'Future Simple (Будущее простое время)',
		homework: 'Describe… - Опишите…',
		description: '',
		//students: [1, 2, 3],
	},
	{
		id: 11,
		date: new Date(2020, 7, 12),
		theme: 'To be in the Future (Глагол "быть" в будущем)',
		homework: '',
		description: '',
		//students: [1, 2, 3],
	},
]
const lessonsData = [
	//lesson 1 (students 1,2,4)
	{
		id: 1,
		lessonId: 1,
		studentId: 1,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 2,
		lessonId: 1,
		studentId: 2,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 3,
		lessonId: 1,
		studentId: 4,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	//lesson 2 (students 1,2,4)
	{
		id: 4,
		lessonId: 2,
		studentId: 1,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 5,
		lessonId: 2,
		studentId: 2,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 6,
		lessonId: 2,
		studentId: 4,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	//lesson 3 (students 1,2,4)
	{
		id: 7,
		lessonId: 3,
		studentId: 1,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 8,
		lessonId: 3,
		studentId: 2,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 9,
		lessonId: 3,
		studentId: 4,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	//lesson 4 (students 1,2,4)
	{
		id: 10,
		lessonId: 4,
		studentId: 1,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 11,
		lessonId: 4,
		studentId: 2,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 12,
		lessonId: 4,
		studentId: 4,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	//lesson 5 (students 1,2,4)
	{
		id: 13,
		lessonId: 5,
		studentId: 1,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 14,
		lessonId: 5,
		studentId: 2,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 15,
		lessonId: 5,
		studentId: 4,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	//lesson 6 (students 1,2,4)
	{
		id: 16,
		lessonId: 6,
		studentId: 1,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 17,
		lessonId: 6,
		studentId: 2,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 18,
		lessonId: 6,
		studentId: 4,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	//lesson 7 (students 1,2,4)
	{
		id: 19,
		lessonId: 7,
		studentId: 1,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 20,
		lessonId: 7,
		studentId: 2,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 21,
		lessonId: 7,
		studentId: 4,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	//lesson 8 (students 1,2,4)
	{
		id: 22,
		lessonId: 8,
		studentId: 1,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 23,
		lessonId: 8,
		studentId: 2,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 24,
		lessonId: 8,
		studentId: 4,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	//lesson 9 (students 1,2,4)
	{
		id: 25,
		lessonId: 9,
		studentId: 1,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 26,
		lessonId: 9,
		studentId: 2,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 27,
		lessonId: 9,
		studentId: 4,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	//lesson 10 (students 1,2,3)
	{
		id: 28,
		lessonId: 10,
		studentId: 1,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 29,
		lessonId: 10,
		studentId: 2,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 30,
		lessonId: 10,
		studentId: 3,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	//lesson 11 (students 1,2,3)
	{
		id: 31,
		lessonId: 11,
		studentId: 1,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 32,
		lessonId: 11,
		studentId: 2,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
	},
	{
		id: 33,
		lessonId: 11,
		studentId: 3,
		attendance: AttendanceEnum.EXIST,
		homework: HomeworkEnum.NOT_DONE,
		description: '',
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
				data: hasMany('lesson_item'),
			}),
			lesson_item: Model.extend({
				lesson: belongsTo(),
				student: belongsTo(),
			}),
		},
		seeds(server) {
			groupList.forEach((el) => {
				server.create('group', el)
			})
			firstGroupLessons.forEach((el) => {
				server.create('lesson', { ...el, groupId: 1 })
			})
			studentList.forEach((el) => {
				server.create('student', el)
			})
			lessonsData.forEach((el) => {
				server.create('lesson_item', el)
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

			//view group/student lessons
			this.get('/lessons', function (schema, request) {
				var lessons = schema.lessons.all()
				if (request.queryParams['filter[group]']) {
					lessons = schema.lessons.where({
						groupId: request.queryParams['filter[group]'],
					})
				} else if (request.queryParams['filter[student]']) {
					const lessonsId = schema.db.lessonItems
						.where({ studentId: request.queryParams['filter[student]'] })
						.map((item) => item.lessonId)
					lessons = schema.lessons.find(lessonsId)
				}
				lessons = lessons.sort((a, b) => {
					return a.date - b.date
				})

				var lessons_jsons = this.serialize(lessons, 'lesson')
				//Collect all students associated with this lesson
				//parse all lesson_data of lesson and get studentId to array
				lessons_jsons.forEach((l) => {
					const items = schema.db.lessonItems.where({ lessonId: l.id })
					l.students = items.map((i) => {
						return i.studentId
					})
					l.group_id = String(l.group)
					delete l.group
				})

				return lessons_jsons
			})

			//get lesson items
			this.get('/lessons/items', function (schema, request) {
				var lessonItems = []

				if (request.queryParams['filter[lesson]']) {
					lessonItems = schema.lessonItems.where({
						lessonId: request.queryParams['filter[lesson]'],
					})
				} else if (request.queryParams['filter[student]']) {
					lessonItems = schema.lessonItems.where({
						studentId: request.queryParams['filter[student]'],
					})
				}
				lessonItems = lessonItems.sort((a, b) => {
					return a.lesson.date - b.lesson.date
				})
				var lessonItems_jsons = this.serialize(lessonItems, 'lessonItem')
				lessonItems_jsons.forEach((j) => {
					j.lesson_id = String(j.lesson)
					j.student_id = String(j.student)
					delete j.lesson
					delete j.student
				})
				return lessonItems_jsons
			})

			//create lesson
			this.post('/lessons', function (schema, request) {
				const attr = JSON.parse(request.requestBody)
				const group = schema.groups.find(request.queryParams.group)
				const students = schema.db.students
					.where({ groupId: group.id })
					.map((el) => +el.id)
				const lesson = schema.lessons.create({
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
			this.post('/lessons/:id', function (schema, request) {
				const attr = JSON.parse(request.requestBody)
				var lesson = schema.lessons.find(request.params.id)
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
			lessonItem: ApplicationSerializer.extend({
				attr: [
					'id',
					'lesson',
					'student',
					'attendance',
					'homework',
					'description',
				],
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
