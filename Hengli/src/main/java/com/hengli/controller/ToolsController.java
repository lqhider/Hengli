package com.hengli.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hengli.db.mapper.CollegesMapper;
import com.hengli.db.mapper.CompanyMapper;
import com.hengli.util.CoordinateUtils;
import com.hengli.util.Utils;


@Controller
@RequestMapping("/tools")
public class ToolsController {
	
	@Autowired
	public CompanyMapper companyMapper;
	
	@Autowired
	public CollegesMapper collegesMapper;
	
	/**
	 * 获取企业,院校,设计公司经纬度
	 * @param params
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping("/getLongitudeLatitude")
	@ResponseBody
	public Map<String, Object> getLongitudeLatitude() throws IOException{
		
		List<Map<String, Object>> companys = companyMapper.selectCompanyNoLongitudeLatitude();
		
		for (Map<String, Object> company : companys) {
			String[] coordinate = CoordinateUtils.getCoordinate((String) company.get("name"));
			
			Map<String,Object> params = new HashMap<String,Object>();
			params.put("id", company.get("id"));
			params.put("longitude", coordinate[0]);
			params.put("latitude", coordinate[1]);
			
			companyMapper.updateCompany(params);
		}
		
		List<Map<String, Object>> colleges = collegesMapper.selectCollegesNoLongitudeLatitude();
		
		for (Map<String, Object> college : colleges) {
			
		}
		
		return Utils.returnResult(null);
	}
	
}
