package com.hengli.db.mapper;

import java.util.List;
import java.util.Map;

/**
 *
 */
public interface CompanyMapper {
	
	public List<Map<String,Object>> selectCompany(Map<String, Object> params);
	
	public List<Map<String,Object>> selectCompanyNoLongitudeLatitude();
	
	public List<Map<String,Object>> selectCompanyDistribution(Map<String, Object> params);
	
	public List<Map<String,Object>> selectInnovateNum(Map<String, Object> params);
	
	public void insertCompany(Map<String,Object> params);
	
	public int updateCompany(Map<String,Object> params);
}
