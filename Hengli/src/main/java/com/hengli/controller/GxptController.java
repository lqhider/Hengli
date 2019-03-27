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
@RequestMapping("/gxpt")
public class GxptController {
	
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
	@RequestMapping("/getGxptData")
	@ResponseBody
	public Map<String, Object> getGxptData(@RequestParam Map<String, Object> params){
		
		Map map = new HashMap();
		
		List<Map<String, Object>> companyList = companyMapper.selectCompany(params);
		
		List<Map<String, Object>> innovationCenterList = innovationCenterMapper.selectInnovationCenterMapper(params);
		
		map.put("companyList", companyList);
		map.put("innovationCenterList", innovationCenterList);
		
		return Utils.returnResult(map);
	}
	
	/**
	 * 获取企业分布
	 * @param params
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getCompanyDistribution")
	@ResponseBody
	public Map<String, Object> getCompanyDistribution(@RequestParam Map<String, Object> params){
		
		Map map = new HashMap();
		
		List<Map<String, Object>> companyDistribution = companyMapper.selectCompanyDistribution(params);
		
		map.put("companyDistribution", companyDistribution);
		
		return Utils.returnResult(map);
	}
	
}
