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
import com.hengli.db.mapper.DesignCompanyMapper;
import com.hengli.db.mapper.DesignerMapper;
import com.hengli.util.Utils;


@Controller
@RequestMapping("/sjlm")
public class SjlmController {
	
	@Autowired
	public CompanyMapper companyMapper;
	
	@Autowired
	public DesignCompanyMapper designCompanyMapper;
	
	@Autowired
	public DesignerMapper designerMapper;
	
	/**
	 * 获取设计联盟数据
	 * @param params
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getSjlmData")
	@ResponseBody
	public Map<String, Object> getSjlmData(@RequestParam Map<String, Object> params){
		
		Map map = new HashMap();
		
		params.put("companyName", params.get("name"));
		List<Map<String, Object>> companyList = companyMapper.selectCompany(params);
		
		params.put("designCompanyName", params.get("name"));
		List<Map<String, Object>> designCompanyList = designCompanyMapper.selectDesignCompany(params);
		
		map.put("companyList", companyList);
		map.put("designCompanyList", designCompanyList);
		
		return Utils.returnResult(map);
	}
	
	/**
	 * 获取设计师列表
	 * @param params
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getDesigner")
	@ResponseBody
	public Map<String, Object> getDesigner(@RequestParam Map<String, Object> params){
		
		Map map = new HashMap();
		
		List<Map<String, Object>> designerList = designerMapper.selectDesigner(params);
		
		map.put("designerList", designerList);
		
		return Utils.returnResult(map);
	}
	
}
