package com.hengli.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hengli.db.mapper.CompanyMapper;
import com.hengli.db.mapper.InnovationCenterMapper;
import com.hengli.util.Utils;


@Controller
@RequestMapping("/gx")
public class GxController {
	
	@Autowired
	public CompanyMapper companyMapper;
	
	@Autowired
	public InnovationCenterMapper innovationCenterMapper;
	
	/**
	 * 获取供需平台数据
	 * @param params
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getGxData")
	@ResponseBody
	public Map<String, Object> getGxData(@RequestParam Map<String, Object> params){
		
		Map map = new HashMap();
		
		List<Map<String, Object>> companyList = companyMapper.selectCompany(params);
		
		List<Map<String, Object>> innovationCenterList = innovationCenterMapper.selectInnovationCenterMapper(params);
		
		map.put("companyList", companyList);
		map.put("innovationCenterList", innovationCenterList);
		
		return Utils.returnResult(map);
	}
	
}
