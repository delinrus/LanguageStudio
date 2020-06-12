CREATE DATABASE IF NOT EXISTS language_school
    COLLATE utf8_general_ci;
CREATE DATABASE IF NOT EXISTS test
    COLLATE utf8_general_ci;

USE language_school;

DROP TABLE IF EXISTS parent_student;
DROP TABLE IF EXISTS parent;
DROP TABLE IF EXISTS lesson_data;
DROP TABLE IF EXISTS lesson;
DROP TABLE IF EXISTS student;
DROP TABLE IF EXISTS learning_group;

CREATE TABLE learning_group (
    group_id   	BIGINT 			NOT NULL AUTO_INCREMENT,
    name 		VARCHAR(70)		NULL,
    PRIMARY KEY (group_id)
) ENGINE=INNODB CHARACTER SET utf8;

CREATE TABLE student (
    student_id 				BIGINT 		 	NOT NULL AUTO_INCREMENT,
    group_id 				BIGINT			NULL,
	surname 				VARCHAR(20) 	NULL,
    name 					VARCHAR(20) 	NULL,
	patronymic 				VARCHAR(20) 	NULL,
	phone 					VARCHAR(20) 	NULL,
    PRIMARY KEY (student_id),
	FOREIGN KEY (group_id)
        REFERENCES learning_group (group_id)
        ON DELETE SET NULL
) ENGINE=INNODB CHARACTER SET utf8;

CREATE TABLE lesson (
    lesson_id 		BIGINT 			NOT NULL AUTO_INCREMENT,
    group_id 		BIGINT			NOT NULL,
    lesson_date 	DATE			NULL,
	theme 			VARCHAR(200)	NULL,
	homework 		VARCHAR(500) 	NULL,
    PRIMARY KEY (lesson_id),
	FOREIGN KEY (group_id)
        REFERENCES learning_group (group_id)
        ON DELETE CASCADE
) ENGINE=INNODB CHARACTER SET utf8;

CREATE TABLE lesson_data (
    id 				BIGINT 			NOT NULL AUTO_INCREMENT,
    lesson_id 		BIGINT			NOT NULL,
    student_id 		BIGINT			NOT NULL,
	attendance 		ENUM('NO_INFO','NOT_EXIST','EXIST','EXIST_LATE') NULL,
	homework 		ENUM('NOT_DONE','PARTIAL','DONE') 				 NULL,
	description 	VARCHAR(500) 	NULL,
    PRIMARY KEY (id),
	FOREIGN KEY (lesson_id)
        REFERENCES lesson (lesson_id)
        ON DELETE CASCADE,
	FOREIGN KEY (student_id)
        REFERENCES student (student_id)
        ON DELETE CASCADE
) ENGINE=INNODB CHARACTER SET utf8;

CREATE TABLE parent (
    parent_id 			BIGINT 			NOT NULL AUTO_INCREMENT,
    surname 			VARCHAR(20)		NULL,
	name 				VARCHAR(20)		NULL,
	patronymic 			VARCHAR(20)		NULL,
	phone 				VARCHAR(20)     NULL,
    PRIMARY KEY (parent_id)
) ENGINE=INNODB CHARACTER SET utf8;

CREATE TABLE parent_student (
    parent  BIGINT 	NOT NULL,
    student BIGINT 	NOT NULL,
    PRIMARY KEY (student, parent),

    CONSTRAINT constr_parent_student_parent_fk
        FOREIGN KEY parent_fk (parent) REFERENCES parent (parent_id)
        ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT constr_parent_student_student_fk
        FOREIGN KEY student_fk (student) REFERENCES student (student_id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=INNODB CHARACTER SET utf8;

insert into learning_group(group_id, name)
values 	(1, 'Группа понедельника'),
		(2, 'Группа вторника');

insert into student(student_id, group_id, surname, name, patronymic, phone)
values 	(1, Null, 'Хренова', 'Гадя', 'Петрович', '8-935-552-46-78'),
		(2, 1, 'Иванов', 'Василий', 'Генадиевич', '8-935-532-83-98'),
		(3, 1, 'Ветрова', 'Валентина', 'Федроровна', '8-935-422-83-98'),
		(4, 2, 'Мурдашева', 'Антонина', 'Артемовна', '8-911-446-11-12');

insert into lesson(lesson_id, group_id, lesson_date, theme, homework)
values (1, 1, '2020-06-04', 'Деепричистия', 'повтор');

insert into lesson_data(lesson_id, student_id, attendance, homework, description)
values 	(1, 2, 'NOT_EXIST', 'NOT_DONE', 'Страница 24, упр. 15'),
		(1, 3, 'EXIST_LATE', 'DONE', 'Страница 24, упр. 15');

insert into parent(parent_id, surname, name, patronymic, phone)
values 	(1, 'Иванов', 'Генадий', 'Васильевич', '8-363-733-12-67'),
		(2, 'Мурдашев', 'Артем', 'Михайлович', '8-246-335-67-53');

insert into parent_student(parent, student)
values 	(1, 2),
		(2, 4);