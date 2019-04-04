package com.hengli.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.hengli.db.mapper.CollegesMapper;
import com.hengli.db.mapper.CompanyMapper;
import com.hengli.db.mapper.DesignCompanyMapper;
import com.hengli.db.mapper.DesignerMapper;
import com.hengli.db.mapper.InnovationCenterMapper;
import com.hengli.db.mapper.LectureMapper;
import com.hengli.db.mapper.TeacherMapper;
import com.hengli.util.CoordinateUtils;
import com.hengli.util.PoiUtil;
import com.hengli.util.PoiUtil.POIResult;
import com.hengli.util.Utils;


@Controller
@RequestMapping("/tools")
public class ToolsController {
	
	@Autowired
	public CompanyMapper companyMapper;
	
	@Autowired
	public CollegesMapper collegesMapper;
	
	@Autowired
	public DesignCompanyMapper designCompanyMapper;
	
	@Autowired
	public InnovationCenterMapper innovationCenterMapper;
	
	@Autowired
	public TeacherMapper teacherMapper;
	
	@Autowired
	public LectureMapper lectureMapper;
	
	@Autowired
	public DesignerMapper designerMapper;
	
	@Autowired
	private PoiUtil poiUtil;
	
	/**
	 * 获取企业经纬度
	 * @param params
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping("/getCompanyLongitudeLatitude")
	@ResponseBody
	public Map<String, Object> getCompanyLongitudeLatitude() throws IOException{
		
		List<Map<String, Object>> companys = companyMapper.selectCompanyNoLongitudeLatitude();
		
		for (Map<String, Object> company : companys) {
			String[] coordinate = CoordinateUtils.getCoordinate((String) company.get("name"));
			
			Map<String,Object> params = new HashMap<String,Object>();
			params.put("id", company.get("id"));
			params.put("longitude", coordinate[0]);
			params.put("latitude", coordinate[1]);
			
			companyMapper.updateCompany(params);
		}
		
		return Utils.returnResult(null);
	}
	
	/**
	 * 获取院校经纬度
	 * @param params
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping("/getCollegesLongitudeLatitude")
	@ResponseBody
	public Map<String, Object> getCollegesLongitudeLatitude() throws IOException{
		
		List<Map<String, Object>> colleges = collegesMapper.selectCollegesNoLongitudeLatitude();
		
		for (Map<String, Object> college : colleges) {
			String[] coordinate = CoordinateUtils.getCoordinate((String) college.get("name"));
			
			Map<String,Object> params = new HashMap<String,Object>();
			params.put("id", college.get("id"));
			params.put("longitude", coordinate[0]);
			params.put("latitude", coordinate[1]);
			
			collegesMapper.updateColleges(params);
		}
		
		return Utils.returnResult(null);
	}
	
	/**
	 * 获取设计公司经纬度
	 * @param params
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping("/getDesignCompanyLongitudeLatitude")
	@ResponseBody
	public Map<String, Object> getDesignCompanyLongitudeLatitude() throws IOException{
		
		List<Map<String, Object>> designCompanys = designCompanyMapper.selectDesignCompanyNoLongitudeLatitude();
		
		for (Map<String, Object> designCompany : designCompanys) {
			String[] coordinate = CoordinateUtils.getCoordinate((String) designCompany.get("name"));
			
			Map<String,Object> params = new HashMap<String,Object>();
			params.put("id", designCompany.get("id"));
			params.put("longitude", coordinate[0]);
			params.put("latitude", coordinate[1]);
			
			designCompanyMapper.updateDesignCompany(params);
		}
		
		return Utils.returnResult(null);
	}
	
	/**
	 * 获取创新中心经纬度
	 * @param params
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping("/getInnovationCenterLongitudeLatitude")
	@ResponseBody
	public Map<String, Object> getInnovationCenterLongitudeLatitude() throws IOException{
		
		List<Map<String, Object>> innovationCenters = innovationCenterMapper.selectInnovationCenterNoLongitudeLatitude();
		
		for (Map<String, Object> innovationCenter : innovationCenters) {
			String address = (String) innovationCenter.get("address");
			if(address == null || "".equals(address)) {
				address = (String) innovationCenter.get("name");
			}
			String[] coordinate = CoordinateUtils.getCoordinate(address);
			
			Map<String,Object> params = new HashMap<String,Object>();
			params.put("id", innovationCenter.get("id"));
			params.put("longitude", coordinate[0]);
			params.put("latitude", coordinate[1]);
			
			innovationCenterMapper.updateInnovationCenter(params);
		}
		
		return Utils.returnResult(null);
	}
	
	/**
	 * 清空数据
	 * @param params
	 * @return
	 */
	@RequestMapping("/clearData")
	@ResponseBody
	public Map<String, Object> clearData() {
		
		companyMapper.deleteCompany();
		
		innovationCenterMapper.deleteInnovationCenter();
		
		collegesMapper.deleteColleges();
		
		teacherMapper.deleteTeacher();
		
		lectureMapper.deleteLecture();
		
		designCompanyMapper.deleteDesignCompany();
		
		designerMapper.deleteDesigner();
		
		return Utils.returnResult(null);
	}
	
	/**
	 * 导入数据
	 * @param params
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("/importData")
	@ResponseBody
	public Map<String, Object> importData(HttpServletRequest request) throws Exception{
		
		HashMap<String, String> result = new HashMap<String, String>();
		
		// 将当前上下文初始化给 CommonsMutipartResolver （多部分解析器）
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
						request.getSession().getServletContext());
		multipartResolver.getFileUpload();
		// 检查form中是否有enctype="multipart/form-data"
		if (multipartResolver.isMultipart(request)) {
			// 将request变成多部分request
			MultipartHttpServletRequest multiRequest = multipartResolver.resolveMultipart(request);
			
			// 获取multiRequest 中所有的文件名
			Iterator<String> iter = multiRequest.getFileNames();
			
			while (iter.hasNext()) {
				// 一次遍历所有文件
				MultipartFile file = multiRequest.getFile(iter.next()
						.toString());
				if (file != null) {
//					String contextPath = request.getSession().getServletContext().getRealPath("/");
//					String realFilePath = contextPath + File.separator + "files" + File.separator;
					
//					if(!(new File(realFilePath).exists())){
//						new File(realFilePath).mkdirs();
//					}
//					String fileName = startTime + ".xlsx";
//					String listPath = realFilePath  + fileName;
					
					// 上传
//					file.transferTo(new File(listPath));
					
					POIResult poiResult = poiUtil.process(file.getInputStream());
					result.put("error", poiResult.getError()+"");
					if(!poiResult.isStatus()){
						return Utils.returnResult(result, false, "导入数据失败");
					}
				}
			}
		}
		return Utils.returnResult(result);
	}
	
}
