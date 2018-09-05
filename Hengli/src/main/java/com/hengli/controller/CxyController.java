package com.hengli.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hengli.db.mapper.CollegesMapper;
import com.hengli.db.mapper.CompanyMapper;
import com.hengli.util.Utils;


@Controller
@RequestMapping("/cxy")
public class CxyController {
	
	@Autowired
	public CompanyMapper companyMapper;
	
	@Autowired
	public CollegesMapper collegesMapper;
	
	/**
	 * 获取产学研数据
	 * @param params
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getCxyData")
	@ResponseBody
	public Map<String, Object> getCxyData(@RequestParam Map<String, Object> params){
		
		Map map = new HashMap();
		
		List<Map<String, Object>> companyList = companyMapper.selectCompany(params);
		
		List<Map<String, Object>> collegesList = collegesMapper.selectColleges(params);
		
		map.put("companyList", companyList);
		map.put("collegesList", collegesList);
		
		return Utils.returnResult(map);
	}
	
}
