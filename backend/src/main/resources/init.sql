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

CREATE TABLE learning_group
(
    id            BIGINT      NOT NULL AUTO_INCREMENT,
    name          VARCHAR(20) NULL,
    is_individual BOOLEAN     NULL,
    teacher_id    INT         NULL,
    PRIMARY KEY (id)
) ENGINE = INNODB
  CHARACTER SET utf8;

CREATE TABLE student
(
    id         BIGINT       NOT NULL AUTO_INCREMENT,
    group_id   BIGINT       NULL,
    surname    VARCHAR(20)  NULL,
    name       VARCHAR(20)  NULL,
    patronymic VARCHAR(20)  NULL,
    phone      VARCHAR(20)  NULL,
    address    VARCHAR(100) NULL,
    login      VARCHAR(25)  NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (group_id)
        REFERENCES learning_group (id)
        ON DELETE SET NULL
) ENGINE = INNODB
  CHARACTER SET utf8;

CREATE TABLE lesson
(
    id          BIGINT       NOT NULL AUTO_INCREMENT,
    group_id    BIGINT       NOT NULL,
    date        DATE         NULL,
    theme       VARCHAR(200) NULL,
    homework    VARCHAR(500) NULL,
    description VARCHAR(500) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (group_id)
        REFERENCES learning_group (id)
        ON DELETE CASCADE
) ENGINE = INNODB
  CHARACTER SET utf8;

CREATE TABLE lesson_data
(
    id          BIGINT                                            NOT NULL AUTO_INCREMENT,
    lesson_id   BIGINT                                            NOT NULL,
    student_id  BIGINT                                            NOT NULL,
    attendance  ENUM ('NO_INFO','NOT_EXIST','EXIST','EXIST_LATE') NULL,
    homework    ENUM ('NOT_DONE','PARTIAL','DONE')                NULL,
    description VARCHAR(500)                                      NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (lesson_id)
        REFERENCES lesson (id)
        ON DELETE CASCADE,
    FOREIGN KEY (student_id)
        REFERENCES student (id)
        ON DELETE CASCADE
) ENGINE = INNODB
  CHARACTER SET utf8;

CREATE TABLE parent
(
    id         BIGINT      NOT NULL AUTO_INCREMENT,
    student_id BIGINT      NOT NULL,
    surname    VARCHAR(20) NULL,
    name       VARCHAR(20) NULL,
    patronymic VARCHAR(20) NULL,
    phone      VARCHAR(20) NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (student_id)
        REFERENCES student (id)
        ON DELETE CASCADE
) ENGINE = INNODB
  CHARACTER SET utf8;

insert into learning_group(id, name, is_individual, teacher_id)
values (1, 'Группа понедельника', true, null),
       (2, 'Группа вторника', false, null);

insert into student(id, group_id, surname, name, patronymic, phone, login)
values (1, Null, 'Назаренко', 'Виктория', 'Сергеевна', '8-935-552-46-78', 'nazarenko.vs'),
       (2, 1, 'Иванов', 'Василий', 'Генадиевич', '8-935-532-83-98', 'ivanov.vg'),
       (3, 1, 'Ветрова', 'Валентина', 'Федоровна', '8-935-422-83-98', 'vetrova.vf'),
       (4, 2, 'Мурдашева', 'Антонина', 'Артемовна', '8-911-446-11-12', 'murdasheva.aa');

insert into lesson(id, group_id, date, theme, homework, description)
values (1, 1, '2020-06-04', 'Деепричастия', 'повтор', 'Вставить пропущенные слова'),
       (2, 2, '2020-06-06', 'Прямая речь', 'диалог', 'Написать диалог, используя прямую речь');

insert into lesson_data(lesson_id, student_id, attendance, homework, description)
values (1, 2, 'NOT_EXIST', 'NOT_DONE', 'Страница 24, упр. 15'),
       (1, 3, 'EXIST_LATE', 'DONE', 'Страница 24, упр. 15'),
       (2, 1, 'EXIST', 'PARTIAL', 'Написать диалог');

insert into parent(id, student_id, surname, name, patronymic, phone)
values (1, 2, 'Иванов', 'Генадий', 'Васильевич', '8-363-733-12-67'),
       (2, 4, 'Мурдашев', 'Артем', 'Михайлович', '8-246-335-67-53');