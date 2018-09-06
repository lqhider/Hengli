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
import com.hengli.db.mapper.LectureMapper;
import com.hengli.db.mapper.TeacherMapper;
import com.hengli.util.Utils;


@Controller
@RequestMapping("/jyzx")
public class JyzxController {
	
	@Autowired
	public CollegesMapper collegesMapper;
	
	@Autowired
	public LectureMapper lectureMapper;
	
	@Autowired
	public TeacherMapper teacherMapper;
	
	/**
	 * 获取教育在线数据
	 * @param params
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getJyzxData")
	@ResponseBody
	public Map<String, Object> getJyzxData(@RequestParam Map<String, Object> params){
		
		Map map = new HashMap();
		
		params.put("collegesName", params.get("name"));
		List<Map<String, Object>> collegesList = collegesMapper.selectColleges(params);
		
		map.put("collegesList", collegesList);
		
		return Utils.returnResult(map);
	}
	
	/**
	 * 获取讲座和讲师列表
	 * @param params
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("/getLectureTeacher")
	@ResponseBody
	public Map<String, Object> getLectureTeacher(@RequestParam Map<String, Object> params){
		
		Map map = new HashMap();
		
		List<Map<String, Object>> lectureList = lectureMapper.selectLecture(params);
		
		List<Map<String, Object>> teacherList = teacherMapper.selectTeacher(params);
		
		map.put("lectureList", lectureList);
		map.put("teacherList", teacherList);
		
		return Utils.returnResult(map);
	}
	
}
