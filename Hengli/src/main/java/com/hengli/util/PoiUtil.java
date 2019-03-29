package com.hengli.util;

import java.io.InputStream;
import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Component;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.hengli.db.mapper.CollegesMapper;
import com.hengli.db.mapper.CompanyMapper;
import com.hengli.db.mapper.DesignCompanyMapper;
import com.hengli.db.mapper.DesignerMapper;
import com.hengli.db.mapper.InnovationCenterMapper;
import com.hengli.db.mapper.LectureMapper;
import com.hengli.db.mapper.TeacherMapper;

//@Service
@Component
public class PoiUtil{// implements IPoiUtil 
	
	@Autowired
	DataSourceTransactionManager transactionManager;
	
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
	
	/**
	 * 空字符串
	 */
	private static final String STR_BLANK = "";
	
	private static final String COMPANY_WORKSHEET = "企业表";
	private static final String INNOVATION_CENTER_WORKSHEET = "创新中心表";
	private static final String COLLEGES_WORKSHEET = "院校表";
	private static final String TEACHER_WORKSHEET = "讲师表";
	private static final String LECTURE_WORKSHEET = "讲座表";
	private static final String DESIGN_COMPANY_WORKSHEET = "设计师公司";
	private static final String DESIGN_WORKSHEET = "设计师";
	
	/**
	 * 处理起始行行号
	 */
	private static final int START_LINE = 1;
	
	/**
	 * 处理批量上传的文档数据<br><br><strong>此方法为线程同步方法</strong>
	 * 
	 * @param xlsPath 处理对象文档名称
	 * @throws Exception 
	 */
	public synchronized POIResult process(final InputStream inp) throws Exception {
		
		POIResult result = new POIResult();
		
		// 总错误条数
		int totalError = 0;
		
		// 启动事务，事务等级为【排他】
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager.getTransaction(def);
		
		Workbook wb = null;
		
		try {
			// 得到Excel工作簿对象
//			POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream(xlsPath)); 
			// 得到Excel工作表对象
//			HSSFWorkbook wb = new HSSFWorkbook(fs);
			wb = WorkbookFactory.create(inp);
			// 导入企业数据
			totalError = importCompanyData(totalError, wb.getSheet(COMPANY_WORKSHEET));
			
			if(totalError != 0) {
				result.setStatus(false);
				transactionManager.rollback(status);
				System.out.println("=====事务控制回滚通知=====");
				result.setError(totalError);
				return result;
			}
			
			// 导入创新中心数据
			totalError = importInnovationCenterData(totalError, wb.getSheet(INNOVATION_CENTER_WORKSHEET));
			
			if(totalError != 0) {
				result.setStatus(false);
				transactionManager.rollback(status);
				System.out.println("=====事务控制回滚通知=====");
				result.setError(totalError);
				return result;
			}
			
			// 导入院校数据
			totalError = importCollegesData(totalError, wb.getSheet(COLLEGES_WORKSHEET));
			
			if(totalError != 0) {
				result.setStatus(false);
				transactionManager.rollback(status);
				System.out.println("=====事务控制回滚通知=====");
				result.setError(totalError);
				return result;
			}
			
			// 导入讲师数据
			totalError = importTeacherData(totalError, wb.getSheet(TEACHER_WORKSHEET));
			
			if(totalError != 0) {
				result.setStatus(false);
				transactionManager.rollback(status);
				System.out.println("=====事务控制回滚通知=====");
				result.setError(totalError);
				return result;
			}
			
			// 导入讲座数据
			totalError = importLectureData(totalError, wb.getSheet(LECTURE_WORKSHEET));
			
			if(totalError != 0) {
				result.setStatus(false);
				transactionManager.rollback(status);
				System.out.println("=====事务控制回滚通知=====");
				result.setError(totalError);
				return result;
			}
			
			// 导入设计公司数据
			totalError = importDesignCompanyData(totalError, wb.getSheet(DESIGN_COMPANY_WORKSHEET));
			
			if(totalError != 0) {
				result.setStatus(false);
				transactionManager.rollback(status);
				System.out.println("=====事务控制回滚通知=====");
				result.setError(totalError);
				return result;
			}
			
			// 导入设计师数据
			totalError = importDesignerData(totalError, wb.getSheet(DESIGN_WORKSHEET));
			
			if(totalError == 0){
				result.setStatus(true);
				transactionManager.commit(status);
				System.out.println("=====事务控制提交通知=====");
			}else{
				result.setStatus(false);
				transactionManager.rollback(status);
				System.out.println("=====事务控制回滚通知=====");
			}
			result.setError(totalError);
			
		} catch (Exception e) {
			transactionManager.rollback(status);
			System.out.println("=====事务控制回滚通知=====");
			result.setStatus(false);
			result.setTotal(0);
			result.setError(0);
			e.printStackTrace();
		}finally {
			wb.close();
		}
		return result;
	}

	private int importCompanyData(int totalError, Sheet sheet) {
		int lastRowNum = sheet.getLastRowNum();

		for (int index = START_LINE; index <= lastRowNum; index++) {

			Row row = sheet.getRow(index);// 得到Excel工作表指定行
			
			if(row == null) {
				continue;
			}

			// 封装处理对象
			HashMap<String, Object> company = new HashMap<String, Object>();
			
			if(row.getCell(0) == null || getCellValue(row.getCell(0)) == null) {
				continue;
			}
			
			company.put("id", getCellValue(row.getCell(0)));
			company.put("name", getCellValue(row.getCell(1)));
			company.put("need_number", getCellValue(row.getCell(2)));
			company.put("product_number", getCellValue(row.getCell(3)));
			company.put("custom_service_number", getCellValue(row.getCell(4)));
			company.put("conundrum_number", getCellValue(row.getCell(5)));
			company.put("cooperate_number", getCellValue(row.getCell(6)));
			company.put("requirement_num", getCellValue(row.getCell(7)));
			company.put("first_classification", getCellValue(row.getCell(8)));
			company.put("second_classification", getCellValue(row.getCell(9)));
			company.put("industrial_area", getCellValue(row.getCell(10)));
			company.put("longitude", getCellValue(row.getCell(11)));
			company.put("latitude", getCellValue(row.getCell(12)));
			company.put("homepage", getCellValue(row.getCell(13)));
			company.put("gxptURL", getCellValue(row.getCell(14)));
			company.put("conundrum_more", getCellValue(row.getCell(15)));
			company.put("demand_hall", getCellValue(row.getCell(16)));
			
			try{
				companyMapper.insertCompany(company);
			}catch(Exception e){
				e.printStackTrace();
				totalError ++;
			}
		}
		return totalError;
	}
	
	private int importInnovationCenterData(int totalError, Sheet sheet) {
		int lastRowNum = sheet.getLastRowNum();

		for (int index = START_LINE; index <= lastRowNum; index++) {

			Row row = sheet.getRow(index);// 得到Excel工作表指定行
			
			if(row == null) {
				continue;
			}
			
			// 封装处理对象
			HashMap<String, Object> innovationCenter = new HashMap<String, Object>();
			
			if(row.getCell(0) == null || getCellValue(row.getCell(0)) == null) {
				continue;
			}
			
			innovationCenter.put("id", getCellValue(row.getCell(0)));
			innovationCenter.put("name", getCellValue(row.getCell(1)));
			innovationCenter.put("introduce", getCellValue(row.getCell(2)));
			innovationCenter.put("address", getCellValue(row.getCell(3)));
			innovationCenter.put("longitude", getCellValue(row.getCell(4)));
			innovationCenter.put("latitude", getCellValue(row.getCell(5)));
			innovationCenter.put("homepage", getCellValue(row.getCell(6)));
			
			try{
				innovationCenterMapper.insertInnovationCenter(innovationCenter);
			}catch(Exception e){
				e.printStackTrace();
				totalError ++;
			}
		}
		return totalError;
	}
	
	private int importCollegesData(int totalError, Sheet sheet) {
		int lastRowNum = sheet.getLastRowNum();

		for (int index = START_LINE; index <= lastRowNum; index++) {

			Row row = sheet.getRow(index);// 得到Excel工作表指定行
			
			if(row == null) {
				continue;
			}

			// 封装处理对象
			HashMap<String, Object> colleges = new HashMap<String, Object>();
			
			if(row.getCell(0) == null || getCellValue(row.getCell(0)) == null) {
				continue;
			}
			
			colleges.put("id", getCellValue(row.getCell(0)));
			colleges.put("name", getCellValue(row.getCell(1)));
			colleges.put("expert_num", getCellValue(row.getCell(2)));
			colleges.put("achievement_num", getCellValue(row.getCell(3)));
			colleges.put("cooperate_num", getCellValue(row.getCell(4)));
			colleges.put("teachers_num", getCellValue(row.getCell(5)));
			colleges.put("course_num", getCellValue(row.getCell(6)));
			colleges.put("datum_num", getCellValue(row.getCell(7)));
			colleges.put("enroll_num", getCellValue(row.getCell(8)));
			colleges.put("first_classification", getCellValue(row.getCell(9)));
			colleges.put("second_classification", getCellValue(row.getCell(10)));
			colleges.put("longitude", getCellValue(row.getCell(11)));
			colleges.put("latitude", getCellValue(row.getCell(12)));
			colleges.put("homepage", getCellValue(row.getCell(13)));
			colleges.put("more_achievement", getCellValue(row.getCell(14)));
			
			try{
				collegesMapper.insertColleges(colleges);
			}catch(Exception e){
				e.printStackTrace();
				totalError ++;
			}
		}
		return totalError;
	}
	
	private int importTeacherData(int totalError, Sheet sheet) {
		int lastRowNum = sheet.getLastRowNum();

		for (int index = START_LINE; index <= lastRowNum; index++) {

			Row row = sheet.getRow(index);// 得到Excel工作表指定行
			
			if(row == null) {
				continue;
			}

			// 封装处理对象
			HashMap<String, Object> teacher = new HashMap<String, Object>();
			
			if(row.getCell(0) == null || getCellValue(row.getCell(0)) == null) {
				continue;
			}
			
			teacher.put("id", getCellValue(row.getCell(0)));
			teacher.put("name", getCellValue(row.getCell(1)));
			teacher.put("colleges", getCellValue(row.getCell(2)));
			teacher.put("work_year", getCellValue(row.getCell(3)));
			teacher.put("course_num", getCellValue(row.getCell(4)));
			teacher.put("summary", getCellValue(row.getCell(5)));
			
			try{
				teacherMapper.insertTeacher(teacher);
			}catch(Exception e){
				e.printStackTrace();
				totalError ++;
			}
		}
		return totalError;
	}
	
	private int importLectureData(int totalError, Sheet sheet) {
		int lastRowNum = sheet.getLastRowNum();

		for (int index = START_LINE; index <= lastRowNum; index++) {

			Row row = sheet.getRow(index);// 得到Excel工作表指定行
			
			if(row == null) {
				continue;
			}

			// 封装处理对象
			HashMap<String, Object> lecture = new HashMap<String, Object>();
			
			if(row.getCell(0) == null || getCellValue(row.getCell(0)) == null) {
				continue;
			}
			
			lecture.put("id", getCellValue(row.getCell(0)));
			lecture.put("theme", getCellValue(row.getCell(1)));
			lecture.put("time", getCellValue(row.getCell(2)));
			lecture.put("address", getCellValue(row.getCell(3)));
			lecture.put("colleges", getCellValue(row.getCell(4)));
			lecture.put("teacher", getCellValue(row.getCell(5)));
			lecture.put("course_type", getCellValue(row.getCell(6)));
			lecture.put("course_fee", getCellValue(row.getCell(7)));
			lecture.put("details_page", getCellValue(row.getCell(8)));
			
			try{
				lectureMapper.insertLecture(lecture);
			}catch(Exception e){
				e.printStackTrace();
				totalError ++;
			}
		}
		return totalError;
	}
	
	private int importDesignCompanyData(int totalError, Sheet sheet) {
		int lastRowNum = sheet.getLastRowNum();

		for (int index = START_LINE; index <= lastRowNum; index++) {

			Row row = sheet.getRow(index);// 得到Excel工作表指定行
			
			if(row == null) {
				continue;
			}

			// 封装处理对象
			HashMap<String, Object> designCompany = new HashMap<String, Object>();
			
			if(row.getCell(0) == null || getCellValue(row.getCell(0)) == null) {
				continue;
			}
			
			designCompany.put("id", getCellValue(row.getCell(0)));
			designCompany.put("name", getCellValue(row.getCell(1)));
			designCompany.put("designer_num", getCellValue(row.getCell(2)));
			designCompany.put("receipt_num", getCellValue(row.getCell(3)));
			designCompany.put("domain", getCellValue(row.getCell(4)));
			designCompany.put("qualifications", getCellValue(row.getCell(5)));
			designCompany.put("first_classification", getCellValue(row.getCell(6)));
			designCompany.put("second_classification", getCellValue(row.getCell(7)));
			designCompany.put("longitude", getCellValue(row.getCell(8)));
			designCompany.put("latitude", getCellValue(row.getCell(9)));
			designCompany.put("homepage", getCellValue(row.getCell(10)));
			
			try{
				designCompanyMapper.insertDesignCompany(designCompany);
			}catch(Exception e){
				e.printStackTrace();
				totalError ++;
			}
		}
		return totalError;
	}
	
	private int importDesignerData(int totalError, Sheet sheet) {
		int lastRowNum = sheet.getLastRowNum();

		for (int index = START_LINE; index <= lastRowNum; index++) {

			Row row = sheet.getRow(index);// 得到Excel工作表指定行
			
			if(row == null) {
				continue;
			}

			// 封装处理对象
			HashMap<String, Object> designer = new HashMap<String, Object>();
			
			if(row.getCell(0) == null || getCellValue(row.getCell(0)) == null) {
				continue;
			}
			
			designer.put("id", getCellValue(row.getCell(0)));
			designer.put("name", getCellValue(row.getCell(1)));
			designer.put("design_company", getCellValue(row.getCell(2)));
			designer.put("publication_num", getCellValue(row.getCell(3)));
			designer.put("seniority", getCellValue(row.getCell(4)));
			designer.put("work_experience", getCellValue(row.getCell(5)));
			designer.put("homepage", getCellValue(row.getCell(6)));
			
			try{
				designerMapper.insertDesigner(designer);
			}catch(Exception e){
				e.printStackTrace();
				totalError ++;
			}
		}
		return totalError;
	}
	
	public void setErr(Cell cell){
		CellStyle style = cell.getSheet().getWorkbook().createCellStyle();
		style.setFillForegroundColor(HSSFColor.RED.index);
		style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		cell.setCellStyle(style);
	}
	
	public String getCellValue(Cell cell) {
        String cellValue = "";
        if (cell == null) {
            return cellValue;
        }
        // 判断数据的类型
        switch (cell.getCellType()) {
        case Cell.CELL_TYPE_NUMERIC: // 数字
            //short s = cell.getCellStyle().getDataFormat();
            if (HSSFDateUtil.isCellDateFormatted(cell)) {// 处理日期格式、时间格式
                SimpleDateFormat sdf = null;
                // 验证short值
                if (cell.getCellStyle().getDataFormat() == 14) {
                    sdf = new SimpleDateFormat("yyyy/MM/dd");
                } else if (cell.getCellStyle().getDataFormat() == 21) {
                    sdf = new SimpleDateFormat("HH:mm:ss");
                } else if (cell.getCellStyle().getDataFormat() == 22) {
                    sdf = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
                } else {
                    throw new RuntimeException("日期格式错误!!!");
                }
                Date date = cell.getDateCellValue();
                cellValue = sdf.format(date);
            } else if (cell.getCellStyle().getDataFormat() == 0) {//处理数值格式
                cell.setCellType(Cell.CELL_TYPE_STRING);
                cellValue = String.valueOf(cell.getRichStringCellValue().getString());
            }
            break;
        case Cell.CELL_TYPE_STRING: // 字符串
            cellValue = String.valueOf(cell.getStringCellValue());
            break;
        case Cell.CELL_TYPE_BOOLEAN: // Boolean
            cellValue = String.valueOf(cell.getBooleanCellValue());
            break;
        case Cell.CELL_TYPE_FORMULA: // 公式
            cellValue = String.valueOf(cell.getCellFormula());
            break;
        case Cell.CELL_TYPE_BLANK: // 空值
            cellValue = null;
            break;
        case Cell.CELL_TYPE_ERROR: // 故障
            cellValue = "非法字符";
            break;
        default:
            cellValue = "未知类型";
            break;
        }
        return cellValue;
    }
	
	public class POIResult implements Serializable{

		private static final long serialVersionUID = -1101963752826455486L;
		
		private boolean status = false;
		private int total = 0;
		private int error = 0;
//		private String report = null;
		public boolean isStatus() {
			return status;
		}
		public void setStatus(boolean status) {
			this.status = status;
		}
		public int getTotal() {
			return total;
		}
		public void setTotal(int total) {
			this.total = total;
		}
		public int getError() {
			return error;
		}
		public void setError(int error) {
			this.error = error;
		}
//		public String getReport() {
//			return report;
//		}
//		public void setReport(String report) {
//			this.report = report;
//		}
		
		
	}
}


