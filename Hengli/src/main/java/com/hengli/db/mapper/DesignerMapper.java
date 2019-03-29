package com.hengli.db.mapper;

import java.util.List;
import java.util.Map;

/**
 *
 */
public interface DesignerMapper {
	
	public List<Map<String,Object>> selectDesigner(Map<String, Object> params);
	
	public void insertDesigner(Map<String,Object> params);
	
}
