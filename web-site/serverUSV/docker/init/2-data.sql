-- 插入教育机构
INSERT INTO yadadb.t_b_edu_org (edu_id,edu_logo,edu_name,edu_address,edu_legal_person,edu_legal_phone,edu_contact,edu_contact_phone,edu_is_public,edu_license,edu_status,edu_annual_inspection,edu_annual_inspection_date,edu_annual_inspection_time,edu_supervised_account,edu_normal_account,edu_supervised_mer_no,edu_create_date,edu_create_time,edu_update_date,edu_update_time,edu_rating,edu_login_name,edu_password,supervisor_org_id,edu_province,edu_city,edu_area) VALUES
	 ('edu0001',NULL,'测试机构','测试地址','无','无','无','无',NULL,'无','valid','qualified','20220628','152000',NULL,NULL,NULL,'20220629','150000',NULL,NULL,9.5,'edutest','edutest','supervisor0001',NULL,NULL,NULL);
-- 插入老师
INSERT INTO yadadb.t_b_edu_teacher (teacher_id,teacher_name,teacher_identity_no,teacher_field,teacher_experience,teacher_introduce,teacher_rating,teacher_create_date,teacher_create_time,teacher_update_date,teacher_update_time) VALUES
	 ('teacher00001','马老师','2310000000000','english,math',5,'马老师的介绍内容测试',8.9,'20220630','000000',NULL,NULL);
-- 插入课程
INSERT INTO yadadb.t_b_edu_lesson (lesson_id,lesson_name,lesson_total_quantity,lesson_per_price,lesson_total_price,lesson_type,lesson_introduce,lesson_imgs,lesson_outline,lesson_start_date,lesson_start_time,lesson_end_date,lesson_end_time,lesson_status,lesson_create_date,lesson_create_time,lesson_update_date,lesson_update_time,lesson_update_reason,edu_id,teacher_id,lesson_accumulation_quantity) VALUES
	 ('lesson00001','数学课',100,120,12000,'math','课程介绍测试内容',NULL,'课程大纲测试内容','20220630','000000','20230630','235959','pending','20220630','000000',NULL,NULL,NULL,'edu0001','teacher00001',0),
	 ('lesson00002','英语入门兴趣班',10,50,500,'english','英语培训班介绍',NULL,'英语兴趣班大纲','20220630','000000','20220830','000000','on','20220630','000000',NULL,NULL,NULL,'edu0001','teacher00001',4);

-- 插入消费者
INSERT INTO yadadb.t_b_consumer (consumer_login_name,consumer_password,consumer_name,consumer_phone,consumer_identity_no,consumer_birthday,consumer_gender) VALUES
	 ('testuser','testuser','测试用户','00000000000','11111111111111111','20100521','secret');
INSERT INTO yadadb.t_b_consumer_student (consumer_login_name,consumer_stu_name,consumer_stu_birthday,consumer_stu_type,consumer_stu_gender) VALUES
	 ('testuser','测试用户','20100521','self','secret');

-- 监管机构插入
INSERT INTO yadadb.t_b_supervisor_org (supervisor_org_id,supervisor_org_name,parent_supervisor_org_id) VALUES
	 ('supervisor0001','测试用教育部',NULL);
-- 监管用户插入
INSERT INTO yadadb.t_b_supervisor_user (supervisor_login_name,supervisor_password,supervisor_username,supervisor_phone,supervisor_org_id) VALUES
	 ('suptest','suptest','教育部测试用户',NULL,'supervisor0001');

-- 合约插入
INSERT INTO yadadb.t_l_contract (contract_id,fabric_contract_id,contract_date,contract_time,contract_status,contract_update_date,contract_update_time,contract_update_reason,edu_id,edu_name,lesson_id,lesson_name,lesson_type,lesson_introduce,lesson_outline,lesson_start_date,lesson_start_time,lesson_end_date,lesson_end_time,lesson_attendance_type,lesson_total_quantity,lesson_total_price,lesson_per_price,teacher_id,teacher_name,consumer_id,consumer_name,consumer_stu_name,order_no) VALUES
	 ('contract00001','fabric00001','20220630','120000','valid',NULL,NULL,NULL,'edu0001','测试机构','lesson00002','英语入门兴趣班','english','英语培训班介绍','英语兴趣班大纲','20220630','000000','20220830','000000','manual',10,50,500,'teacher00001','马老师','testuser','测试用户','测试用户','orderno00001');