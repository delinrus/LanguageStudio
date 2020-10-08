import Student from './student_class'

export const AttendanceEnum = Object.freeze({
	NO_INFO: 0,
	NOT_EXIST: 1,
	EXIST: 2,
	EXIST_LATE: 3,
})
export const HomeworkEnum = Object.freeze({
	NO_INFO: 0,
	NOT_DONE: 1,
	PARTIAL: 2,
	DONE: 3,
})

export class Attendance {
	constructor(val) {
		this.val = val
	}
	toString() {
		return Object.keys(AttendanceEnum)[this.val]
	}
	static of() {
		return AttendanceEnum
	}
}
export class Homework {
	constructor(val) {
		this.val = val
	}
	toString() {
		return Object.keys(HomeworkEnum)[this.val]
	}
	static of() {
		return HomeworkEnum
	}
}
export function AttendanceToString(attendance) {
	for (key in attendance) {
		console.log(key)
	}
}
export class LessonItem {
	constructor(obj) {
		if (!obj) {
			this.id = null
			this.lesson_id = null
			this.student_id = null
			this.attendance = new Attendance(Attendance.of().NO_INFO)
			this.homework = new Homework(Homework.of().NOT_DONE)
			this.description = ''
			return
		}
		this.id = obj.id
		this.lesson_id = obj.lesson_id
		this.student_id = obj.student_id
		this.attendance = new Attendance(obj.attendance)
		this.homework = new Homework(obj.homework)
		this.description = obj.description
	}
	clone() {
		return new LessonItem(this)
	}

	isEmpty() {
		return this.id === null
	}
}

export default {
	LessonItem,
	Attendance,
	Homework,
	AttendanceEnum,
	HomeworkEnum,
}
