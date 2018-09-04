package com.hengli.db.mapper;

import java.util.List;
import java.util.Map;

public interface ClassificationMapper {
	
	public List<Map<String,Object>> selectFirstClassification(Map<String, Object> params);
	
	public List<Map<String,Object>> selectSecondClassification(Map<String, Object> params);
}
