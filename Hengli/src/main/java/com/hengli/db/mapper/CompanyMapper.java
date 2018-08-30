package com.hengli.db.mapper;

import java.util.List;
import java.util.Map;

/**
 *
 */
public interface CompanyMapper {
	
	public List<Map<String,Object>> selectCompany(Map<String, Object> params);
}
