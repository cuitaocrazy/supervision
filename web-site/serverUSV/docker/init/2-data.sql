-- 插入教育机构
INSERT INTO yadadb.t_b_edu_org (edu_id,edu_logo,edu_name,edu_address,edu_legal_person,edu_legal_phone,edu_contact,edu_contact_phone,edu_is_public,edu_license,edu_status,edu_annual_inspection,edu_annual_inspection_date,edu_annual_inspection_time,edu_supervised_account,edu_normal_account,edu_supervised_mer_no,edu_create_date,edu_create_time,edu_update_date,edu_update_time,edu_rating,edu_login_name,edu_password,supervisor_org_id,edu_province,edu_city,edu_area) VALUES
	 ('edu0001',NULL,'测试机构','测试地址','无','无','无','无',NULL,'无','valid','qualified','20220628','152000',NULL,NULL,NULL,'20220629','150000',NULL,NULL,9.5,'edutest','edutest','supervisor0001',NULL,NULL,NULL);
-- 插入老师
INSERT INTO yadadb.t_b_edu_teacher (teacher_id,teacher_name,teacher_identity_no,teacher_field,teacher_experience,teacher_introduce,teacher_rating,teacher_create_date,teacher_create_time,teacher_update_date,teacher_update_time) VALUES
	 ('teacher00001','马老师','2310000000000','english,math',5,'马老师的介绍内容测试',8.9,'20220630','000000',NULL,NULL);
-- 插入课程
INSERT INTO yadadb.t_b_edu_lesson (lesson_id,lesson_name,lesson_total_quantity,lesson_per_price,lesson_total_price,lesson_type,lesson_introduce,lesson_imgs,lesson_outline,lesson_start_date,lesson_start_time,lesson_end_date,lesson_end_time,lesson_status,lesson_create_date,lesson_create_time,lesson_update_date,lesson_update_time,lesson_update_reason,edu_id,teacher_id) VALUES
	 ('lesson00001','数学课',100,120,12000,'math','课程介绍测试内容',NULL,'课程大纲测试内容','20220630','000000','20230630','235959','pending','20220630','000000',NULL,NULL,NULL,'edu0001','teacher00001'),
	 ('lesson00002','英语入门兴趣班',10,50,500,'english','英语培训班介绍',NULL,'英语兴趣班大纲','20220630','000000','20220830','000000','on','20220630','000000',NULL,NULL,NULL,'edu0001','teacher00001');