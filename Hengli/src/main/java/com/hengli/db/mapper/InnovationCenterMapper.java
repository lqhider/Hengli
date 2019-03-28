package com.hengli.db.mapper;

import java.util.List;
import java.util.Map;

public interface InnovationCenterMapper {
	
	public List<Map<String,Object>> selectInnovationCenterMapper(Map<String, Object> params);
	
	public List<Map<String,Object>> selectInnovationCenterNoLongitudeLatitude();
	
	public void insertInnovationCenter(Map<String,Object> params);
	
	public int updateInnovationCenter(Map<String,Object> params);
	
}
