package com.hengli.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hengli.db.mapper.ClassificationMapper;
import com.hengli.util.Utils;


@Controller
@RequestMapping("/classification")
public class ClassificationController {
	
	@Autowired
	public ClassificationMapper classificationMapper;
	
	/**
	 * 获取一级分类
	 * @param params
	 * @return
	 */
	@RequestMapping("/getFirstClassification")
	@ResponseBody
	public Map<String, Object> getFirstClassification(@RequestParam Map<String, Object> params){
		
		List<Map<String, Object>> result = classificationMapper.selectFirstClassification(params);
		
		return Utils.returnResult(result);
	}
	
	/**
	 * 获取二级分类
	 * @param params
	 * @return
	 */
	@RequestMapping("/getSecondClassification")
	@ResponseBody
	public Map<String, Object> getSecondClassification(@RequestParam Map<String, Object> params){
		
		List<Map<String, Object>> result = classificationMapper.selectSecondClassification(params);
		
		return Utils.returnResult(result);
	}
	
}
