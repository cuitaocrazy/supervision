-- 教育机构表
CREATE TABLE yadadb.t_b_edu_org (
	edu_id varchar(32) NOT NULL,
	edu_logo varchar(32) NULL,
	edu_name varchar(64) NULL,
	edu_address varchar(128) NULL,
	edu_legal_person varchar(32) NULL,
	edu_legal_phone varchar(32) NULL,
	edu_contact varchar(32) NULL,
	edu_contact_phone varchar(32) NULL,
	edu_is_public BOOL NULL,
	edu_license varchar(64) NULL,
	edu_status varchar(16) NULL COMMENT 'valid：有效（默认值）；<br />invalid：无效；<br />pending：待审核；<br />reject：拒绝。',
	edu_annual_inspection varchar(16) NULL COMMENT 'qualified：合格；<br />unqualified：不合格。',
	edu_annual_inspection_date CHAR(8) NULL,
	edu_annual_inspection_time CHAR(6) NULL,
	edu_supervised_account varchar(32) NULL,
	edu_normal_account varchar(32) NULL,
	edu_supervised_mer_no varchar(32) NULL,
	edu_create_date char(8) NULL,
	edu_create_time char(6) NULL,
	edu_update_date char(8) NULL,
	edu_update_time char(6) NULL,
	edu_rating decimal(3,1) NULL,
	edu_login_name varchar(32) NULL,
	edu_password varchar(32) NULL,
	supervisor_org_id varchar(32) NULL,
	edu_province varchar(32) NULL,
	edu_city varchar(32) NULL,
	edu_area varchar(32) NULL,
	CONSTRAINT t_b_edu_org_PK PRIMARY KEY (edu_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- 教育机构教师表
CREATE TABLE yadadb.t_b_edu_teacher (
	teacher_id varchar(32) NOT NULL,
	teacher_name varchar(32) NULL,
	teacher_identity_no varchar(32) NULL,
	teacher_field varchar(32) NULL,
	teacher_experience int NULL,
	teacher_introduce varchar(256) NULL,
	teacher_rating decimal(3,1) NULL,
	teacher_create_date char(8) NULL,
	teacher_create_time char(6) NULL,
	teacher_update_date char(8) NULL,
	teacher_update_time char(6) NULL,
	CONSTRAINT t_b_edu_teacher_PK PRIMARY KEY (teacher_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- 教育机构课程表
CREATE TABLE yadadb.t_b_edu_lesson (
	lesson_images varchar(256) NOT NULL,
	lesson_id varchar(32) NOT NULL,
	lesson_name varchar(64) NULL,
	lesson_total_quantity int NULL,
	lesson_per_price decimal(12,0) NULL,
	lesson_total_price decimal(12,0) NULL,
	lesson_type varchar(16) NULL,
	lesson_introduce varchar(128) NULL,
	lesson_imgs varchar(256) NULL,
	lesson_outline varchar(512) NULL,
	lesson_start_date char(8) NULL,
	lesson_start_time char(6) NULL,
	lesson_end_date char(8) NULL,
	lesson_end_time char(6) NULL,
	lesson_status varchar(16) NULL,
	lesson_create_date char(8) NULL,
	lesson_create_time char(6) NULL,
	lesson_update_date char(8) NULL,
	lesson_update_time char(6) NULL,
	lesson_update_reason varchar(64) NULL,
	edu_id varchar(32) NULL,
	teacher_id varchar(32) NULL,
	lesson_accumulation_quantity int NULL,
	CONSTRAINT t_b_edu_lesson_PK PRIMARY KEY (lesson_id),
	KEY `t_b_edu_lesson_FK` (`edu_id`),
	KEY `t_b_edu_lesson_FK_1` (`teacher_id`),
	CONSTRAINT `t_b_edu_lesson_FK` FOREIGN KEY (`edu_id`) REFERENCES `t_b_edu_org` (`edu_id`),
	CONSTRAINT `t_b_edu_lesson_FK_1` FOREIGN KEY (`teacher_id`) REFERENCES `t_b_edu_teacher` (`teacher_id`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- 监管机构表
CREATE TABLE yadadb.t_b_supervisor_org (
	supervisor_org_id varchar(32) NOT NULL,
	supervisor_org_name varchar(64) NULL,
	parent_supervisor_org_id varchar(32) NULL,
	CONSTRAINT t_b_supervisor_org_PK PRIMARY KEY (supervisor_org_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- 监管机构用户表
CREATE TABLE yadadb.t_b_supervisor_user (
	supervisor_login_name varchar(32) NOT NULL,
	supervisor_password varchar(64) NULL,
	supervisor_username varchar(32) NULL,
	supervisor_phone varchar(32) NULL,
	supervisor_org_id varchar(32) NULL,
	CONSTRAINT t_b_supervisor_user_PK PRIMARY KEY (supervisor_login_name)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- 教育机构黑名单
CREATE TABLE yadadb.t_b_supervisor_black_edu (
	edu_id varchar(32) NOT NULL,
	black_edu_create_date char(8) NULL,
	black_edu_create_time char(6) NULL,
	black_edu_create_reason varchar(512) NULL,
	CONSTRAINT t_b_supervisor_black_edu_PK PRIMARY KEY (edu_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- 公告表
CREATE TABLE yadadb.t_b_announcement (
	announcement_id varchar(32) NOT NULL,
	announcement_date char(8) NULL,
	announcement_time char(6) NULL,
	announcement_announcer varchar(32) NULL,
	announcement_title varchar(64) NULL,
	announcement_content varchar(512) NULL,
	announcement_status varchar(16) NULL,
	CONSTRAINT t_b_announcement_PK PRIMARY KEY (announcement_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- 合同表
CREATE TABLE yadadb.t_l_contract (
	contract_id varchar(32) NOT NULL,
	fabric_contract_id varchar(128) NULL,
	contract_date char(8) NULL,
	contract_time char(6) NULL,
	contract_status varchar(16) NULL,
	contract_update_date char(8) NULL,
	contract_update_time char(6) NULL,
	contract_update_reason varchar(64) NULL,
	edu_id varchar(32) NULL,
	edu_name varchar(64) NULL,
	lesson_id varchar(32) NULL,
	lesson_name varchar(64) NULL,
	lesson_type varchar(16) NULL,
	lesson_introduce varchar(128) NULL,
	lesson_outline varchar(512) NULL,
	lesson_start_date char(8) NULL,
	lesson_start_time char(6) NULL,
	lesson_end_date char(8) NULL,
	lesson_end_time char(6) NULL,
	lesson_attendance_type varchar(16) NULL,
	lesson_total_quantity int NULL,
	lesson_total_price decimal(12,0) NULL,
	lesson_per_price decimal(12,0) NULL,
	teacher_id varchar(32) NULL,
	teacher_name varchar(32) NULL,
	consumer_id varchar(32) NULL,
	consumer_name varchar(32) NULL,
	consumer_stu_name varchar(32) NULL,
	order_no varchar(40) NULL,
	lesson_accumulation_quantity int NULL,
	CONSTRAINT t_l_contract_PK PRIMARY KEY (contract_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- 合同协商表
CREATE TABLE yadadb.t_b_contract_nego (
	nego_id varchar(32) NOT NULL,
	contract_id varchar(32) NULL,
	nego_type varchar(16) NULL,
	nego_reason varchar(128) NULL,
	nego_creator varchar(16) NULL,
	nego_status varchar(16) NULL,
	nego_create_date char(8) NULL,
	nego_create_time char(6) NULL,
	nego_update_date char(8) NULL,
	nego_update_time char(6) NULL,
	nego_refund_amt decimal(12,0) NULL,
	nego_compensation_amt decimal(12,0) NULL,
	nego_consumer_agree BOOL NULL,
	nego_consumer_agree_date char(8) NULL,
	nego_consumer_agree_time char(6) NULL,
	nego_edu_agree BOOL NULL,
	nego_edu_agree_date char(8) NULL,
	nego_edu_agree_time char(6) NULL,
	CONSTRAINT t_b_contract_nego_PK PRIMARY KEY (nego_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- 考勤表
CREATE TABLE yadadb.t_l_attendance (
	attendance_id varchar(32) NOT NULL,
	contract_id varchar(32) NULL,
	fabric_contract_id varchar(128) NULL,
	attendance_date char(8) NULL,
	attendance_time char(6) NULL,
	attendance_type varchar(16) NULL,
	attendance_lesson_quantity int NULL,
	edu_id varchar(32) NULL,
	edu_name varchar(64) NULL,
	lesson_id varchar(32) NULL,
	lesson_name varchar(64) NULL,
	consumer_id varchar(32) NULL,
	consumer_name varchar(32) NULL,
	consumer_stu_name varchar(32) NULL,
	attendance_status varchar(16) NULL,
	attendance_update_date char(8) NULL,
	attendance_update_time char(6) NULL,
	attendance_update_reason varchar(64) NULL,
	CONSTRAINT t_l_attendance_PK PRIMARY KEY (attendance_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- 划拨表
CREATE TABLE yadadb.t_l_transfer (
	transfer_id varchar(32) NOT NULL,
	attendance_id varchar(32) NULL,
	contract_id varchar(32) NULL,
	fabric_contract_id varchar(128) NULL,
	attendance_date char(8) NULL,
	attendance_time char(6) NULL,
	attendance_type varchar(16) NULL,
	edu_id varchar(32) NULL,
	edu_name varchar(64) NULL,
	lesson_id varchar(32) NULL,
	lesson_name varchar(64) NULL,
	lesson_type varchar(16) NULL,
	consumer_id varchar(32) NULL,
	consumer_name varchar(32) NULL,
	consumer_stu_name varchar(32) NULL,
	tran_ls_id varchar(40) NULL,
	supversing_account varchar(32) NULL,
	normal_account varchar(32) NULL,
	transfer_amt decimal(12,0) NULL,
	transfer_result varchar(16) NULL,
	reason varchar(16) NULL,
	transfer_update_date char(8) NULL,
	transfer_update_time char(6) NULL,
	CONSTRAINT t_l_transfer_PK PRIMARY KEY (transfer_id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


-- 投诉表
CREATE TABLE yadadb.t_b_complaint (
	consumer_id varchar(32) NOT NULL,
	edu_id varchar(32) NULL,
	complaint_date char(8) NULL,
	complaint_time char(6) NULL,
	complaint_type varchar(32) NULL,
	consumer_name varchar(32) NULL,
	consumer_phone char(11) NULL,
	edu_name varchar(32) NULL,
	edu_contact varchar(32) NULL,
	edu_contact_phone varchar(32) NULL,
	complaint_title varchar(64) NULL,
	complaint_content varchar(512) NULL,
	complaint_status varchar(16) NULL,
	complaint_grade varchar(16) NULL,
	complaint_desc_resu varchar(512) NULL
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- 消费者表
CREATE TABLE yadadb.t_b_consumer (
	consumer_login_name varchar(32) NOT NULL,
	consumer_password varchar(64) NULL,
	consumer_name varchar(32) NULL,
	consumer_phone char(11) NULL,
	consumer_identity_no varchar(32) NULL,
	consumer_birthday char(8) NULL,
	consumer_gender varchar(16) NULL,
	CONSTRAINT t_b_consumer_PK PRIMARY KEY (consumer_login_name)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

-- 消费者学生表
CREATE TABLE yadadb.t_b_consumer_student (
	consumer_login_name varchar(32) NOT NULL,
	consumer_stu_name varchar(32) NULL,
	consumer_stu_birthday char(8) NULL,
	consumer_stu_type varchar(32) NULL,
	consumer_stu_gender varchar(16) NULL,
	CONSTRAINT t_b_consumer_student_PK PRIMARY KEY (consumer_login_name)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
