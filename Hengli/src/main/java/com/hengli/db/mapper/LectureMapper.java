package com.hengli.db.mapper;

import java.util.List;
import java.util.Map;

/**
 *
 */
public interface LectureMapper {
	
	public List<Map<String,Object>> selectLecture(Map<String, Object> params);
	
	public void insertLecture(Map<String,Object> params);
	
}
