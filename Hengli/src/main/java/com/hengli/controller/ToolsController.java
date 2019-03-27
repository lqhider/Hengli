package com.hengli.controller;

import java.io.File;
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
import com.hengli.util.CoordinateUtils;
import com.hengli.util.PoiUtil.POIResult;
import com.hengli.util.Utils;


@Controller
@RequestMapping("/tools")
public class ToolsController {
	
	@Autowired
	public CompanyMapper companyMapper;
	
	@Autowired
	public CollegesMapper collegesMapper;
	
	/**
	 * 获取企业,院校,设计公司经纬度
	 * @param params
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping("/getLongitudeLatitude")
	@ResponseBody
	public Map<String, Object> getLongitudeLatitude() throws IOException{
		
		List<Map<String, Object>> companys = companyMapper.selectCompanyNoLongitudeLatitude();
		
		for (Map<String, Object> company : companys) {
			String[] coordinate = CoordinateUtils.getCoordinate((String) company.get("name"));
			
			Map<String,Object> params = new HashMap<String,Object>();
			params.put("id", company.get("id"));
			params.put("longitude", coordinate[0]);
			params.put("latitude", coordinate[1]);
			
			companyMapper.updateCompany(params);
		}
		
		List<Map<String, Object>> colleges = collegesMapper.selectCollegesNoLongitudeLatitude();
		
		for (Map<String, Object> college : colleges) {
			
		}
		
		return Utils.returnResult(null);
	}
	
	/**
	 * 批量创建用户
	 * @param params
	 * @return
	 * @throws Exception 
	 */
	@RequestMapping("/batchCreateUser")
	@ResponseBody
	public Map<String, Object> batchCreateUser(HttpServletRequest request) throws Exception{
		
		long startTime = System.currentTimeMillis();
		
		HashMap<String, String> result = new HashMap<String, String>();
		
		// 将当前上下文初始化给 CommonsMutipartResolver （多部分解析器）
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
						request.getSession().getServletContext());
		multipartResolver.getFileUpload();
		// 检查form中是否有enctype="multipart/form-data"
		if (multipartResolver.isMultipart(request)) {
			// 将request变成多部分request
			MultipartHttpServletRequest multiRequest = multipartResolver.resolveMultipart(request);
			
			if (!Utils.hasText(multiRequest.getParameter("vdcId"))) {
				return Utils.returnResult(null, false, "VDCid不能为空");
			}
			
			// 获取请求中的参数
			HashMap<String, Object> params = new HashMap<String, Object>();
			params.put("vdc_id", multiRequest.getParameter("vdcId"));
			
			// 获取multiRequest 中所有的文件名
			Iterator<String> iter = multiRequest.getFileNames();
			
			while (iter.hasNext()) {
				// 一次遍历所有文件
				MultipartFile file = multiRequest.getFile(iter.next()
						.toString());
				if (file != null) {
					String contextPath = request.getSession().getServletContext().getRealPath("/");
					String realFilePath = contextPath + File.separator + "files" + File.separator;
					String reportFilePath = contextPath + File.separator + "resources" + File.separator;
					if(!(new File(realFilePath).exists())){
						new File(realFilePath).mkdirs();
					}
					String fileName = startTime + ".xlsx";
					String listPath = realFilePath  + fileName;
					String reportPath = reportFilePath  + fileName;
					
					// 上传
					file.transferTo(new File(listPath));
					
					POIResult poiResult = poiUtil.process(listPath, reportPath, params);
					result.put("total", poiResult.getTotal()+"");
					result.put("error", poiResult.getError()+"");
					if(!poiResult.isStatus()){
						result.put("reportPath", "resources" + File.separator + fileName);
						return Utils.returnResult(result, false, "批量导入失败");
					}
				}
			}
		}
		return Utils.returnResult(result);
	}
	
}
