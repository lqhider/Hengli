package com.hengli.db.mapper;

import java.util.List;
import java.util.Map;

/**
 *
 */
public interface TeacherMapper {
	
	public List<Map<String,Object>> selectTeacher(Map<String, Object> params);
	
}
