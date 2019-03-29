package com.hengli.db.mapper;

import java.util.List;
import java.util.Map;

/**
 *
 */
public interface DesignCompanyMapper {
	
	public List<Map<String,Object>> selectDesignCompany(Map<String, Object> params);
	
	public List<Map<String,Object>> selectDesignCompanyNoLongitudeLatitude();
	
	public void insertDesignCompany(Map<String,Object> params);
	
	public int updateDesignCompany(Map<String,Object> params);
}
