package com.hengli.util;

import java.util.HashMap;
import java.util.Map;

import com.github.pagehelper.Page;

public class Utils {

	/**
	 * 检测字符串是否为空或空字符串
	 * @param str 检测目标字符串
	 * @return true:检测目标有实质内容;false:检测目标为空
	 */
	public static boolean hasText(String str) {
		if (str != null && str.trim().length() > 0) {
			return true;
		} else {
			return false;
		}
	}
	
	/**
	 * 带空判断的字符串类型转换
	 * @param input 转换目标
	 * @return 当转换目标为null时，返回null，否则将其转换为String类型并返回
	 */
	public static String valueOf(Object input){
		return input == null ? null : String.valueOf(input);
	}
	
	/*
	 *  状态  status 成功:true 业务错误：false  发生异常：可以处理异常，但最后要抛出 error
	 *  结果 data
	 *  分页 page {totalCount totalPage pageSize currentPage}
	 *  提示信息 message 
	 */

	/**
	 * 控制器返回值封装用共通方法<br>可自动封装状态、分页信息、消息
	 * @param input 要返回的结果
	 * @param status 要返回的执行结果(true/false)
	 * @param message 要传递的消息
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Map<String,Object> returnResult(Object input,boolean status,String message){
		HashMap<String,Object> result = new HashMap<>();
		if(message != null){
			result.put("message", message);
		}
		if(status){
			result.put("status", "true");
		}else{
			result.put("status", "false");
		}
		
		if(input == null){
			return result;
		}
		
		if(input instanceof Page){
			// 当结果为分页结果时，提取并设置分页信息
			HashMap<String, Object> page =new HashMap<>();
			Page pageInput = (Page)input;
			page.put("totalCount", pageInput.getTotal());
			page.put("totalPage",(pageInput.getPages()==0)?1:pageInput.getPages());
			page.put("pageSize",pageInput.getPageSize());
			page.put("currentPage",(pageInput.getPageNum()==0)?1:pageInput.getPageNum());
			result.put("page", page);
		}
		result.put("data", input);
		return result;
	}
	
	/**
	 * 控制器返回值封装用共通方法<br>可自动封装状态、分页信息、消息
	 * @param input 要返回的结果
	 * @return
	 */
	public static Map<String,Object> returnResult(Object input){
		return returnResult(input,true,null);
	}
	
	/**
	 * 控制器返回值封装用共通方法<br>可自动封装状态、分页信息、消息
	 * @param input 要返回的结果
	 * @param message 要传递的消息
	 * @return
	 */
	public static Map<String,Object> returnResult(Object input,String message){
		return returnResult(input,true,message);
	}
	
	/**
	 * 控制器返回值封装用共通方法<br>可自动封装状态、分页信息、消息
	 * @param input 要返回的结果
	 * @param status 要返回的执行结果(true/false)
	 * @return
	 */
	public static Map<String,Object> returnResult(Object input,boolean status){
		return returnResult(input,status,null);
	}
}
