package com.hengli.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hengli.util.Utils;


@Controller
@RequestMapping("/gx")
public class GxController {
	
	/**
	 * 获取供需平台数据
	 * @param params
	 * @return
	 */
	@RequestMapping("/getData")
	@ResponseBody
	public Map<String, Object> getData(@RequestParam Map<String, Object> params){
		return Utils.returnResult(null);
	}
	
}
