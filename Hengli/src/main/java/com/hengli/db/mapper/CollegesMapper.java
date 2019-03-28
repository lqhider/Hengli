package com.hengli.db.mapper;

import java.util.List;
import java.util.Map;

/**
 *
 */
public interface CollegesMapper {
	
	public List<Map<String,Object>> selectColleges(Map<String, Object> params);
	
	public List<Map<String,Object>> selectCollegesNoLongitudeLatitude();
	
	public void insertColleges(Map<String,Object> params);
	
	public int updateColleges(Map<String,Object> params);
}
