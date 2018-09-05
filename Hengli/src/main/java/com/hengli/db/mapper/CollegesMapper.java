package com.hengli.db.mapper;

import java.util.List;
import java.util.Map;

/**
 *
 */
public interface CollegesMapper {
	
	public List<Map<String,Object>> selectColleges(Map<String, Object> params);
}
