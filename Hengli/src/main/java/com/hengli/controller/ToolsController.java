package com.hengli.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hengli.db.mapper.CollegesMapper;
import com.hengli.db.mapper.CompanyMapper;
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
	 */
	@RequestMapping("/getLongitudeLatitude")
	@ResponseBody
	public Map<String, Object> getLongitudeLatitude(){
		
		List<Map<String, Object>> companys = companyMapper.selectCompanyNoLongitudeLatitude();
		
		for (Map<String, Object> company : companys) {
			
		}
		
		return Utils.returnResult(null);
	}
	
}
