package com.hengli.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {
	static Logger logger = LoggerFactory.getLogger(PageController.class);
	
	/**
	 * 跳转首页
	 * 
	 * @return 跳转路径
	 *//*
	@RequestMapping("/index")
	public String index() {
		return "frame";	
	}*/
	
	/**
	 * 跳转供需平台首页
	 * 
	 * @return 跳转路径
	 */
	@RequestMapping("/gxIndex")
	public String gxIndex() {
		return "gx/gxlist";	
	}
	
	/**
	 * 跳转供需平台地图页面
	 * 
	 * @return 跳转路径
	 */
	@RequestMapping("/gxmap")
	public String gxmap() {
		return "gx/gxmap";	
	}
	
	/**
	 * 跳转供需平台首页
	 * 
	 * @return 跳转路径
	 */
	@RequestMapping("/")
	public String index() {
		return "gxpt";
	}
	
	/**
	 * 跳转供需平台首页
	 * 
	 * @return 跳转路径
	 */
	@RequestMapping("/gxpt")
	public String gxpt() {
		return "gxpt";
	}
	
	/**
	 * 跳转产学研首页
	 * 
	 * @return 跳转路径
	 */
	@RequestMapping("/cxy")
	public String cxy() {
		return "cxy";
	}
	
	/**
	 * 跳转教育在线首页
	 * 
	 * @return 跳转路径
	 */
	@RequestMapping("/jyzx")
	public String jyzx() {
		return "jyzx";
	}
	
	/**
	 * 跳转设计联盟首页
	 * 
	 * @return 跳转路径
	 */
	@RequestMapping("/sjlm")
	public String sjlm() {
		return "sjlm";
	}
	
	@RequestMapping("/highcharts")
	public String highcharts() {
		return "gx/HighchartsTest";	
	}
}
