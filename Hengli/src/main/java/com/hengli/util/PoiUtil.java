package com.hengli.util;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.Serializable;
import java.text.DecimalFormat;
import java.util.HashMap;

import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.stereotype.Component;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import com.mysql.jdbc.MysqlDataTruncation;
import com.mysql.jdbc.exceptions.jdbc4.MySQLIntegrityConstraintViolationException;

//@Service
@Component
public class PoiUtil{// implements IPoiUtil 
	
	@Autowired
	DataSourceTransactionManager transactionManager;
	
	/**
	 * 空字符串
	 */
	private static final String STR_BLANK = "";
	
	private static final int INDEX_WORKSHEET = 0;
	private static final int COL_USERNAME    = 1;
	private static final int COL_REALNAME    = 2;
	private static final int COL_MAIL        = 3;
	private static final int COL_PHONE       = 4;
	private static final int COL_ERR         = 5;
	/**
	 * 处理起始行行号
	 */
	private static final int START_LINE = 1;
	
	/**
	 * 用户名最小长度
	 */
	private static final int MIN_USERNAME_LENGTH = 6;
	/**
	 * 用户名最大长度
	 */
	private static final int MAX_USERNAME_LENGTH = 18;
	/**
	 * 真实姓名最大长度
	 */
	private static final int MAX_REALNAME_LENGTH = 5;
	/**
	 * 邮箱最大长度
	 */
	private static final int MAX_MAIL_LENGTH = 50;
	/**
	 * 移动电话最大长度
	 */
	private static final int MAX_PHONE_LENGTH = 20;
	
	/**
	 * 处理批量上传的文档数据<br><br><strong>此方法为线程同步方法</strong>
	 * 
	 * @param xlsPath 处理对象文档名称
	 * @throws Exception 
	 */
	public synchronized POIResult process(final String xlsPath, final String reportPath, HashMap<String, Object> params) throws Exception {
		
		if(!Utils.hasText(Utils.valueOf(params.get("vdc_id")))){
			throw new Exception("VDCid不能为空");
		}
		
		POIResult result = new POIResult();
		// 总数据条数
		int totalCount = 0;
		// 总错误条数
		int totalError = 0;
		// 启动事务，事务等级为【排他】
		DefaultTransactionDefinition def = new DefaultTransactionDefinition();
		def.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
		TransactionStatus status = transactionManager.getTransaction(def);
		
		try {
			// 得到Excel工作簿对象
//			POIFSFileSystem fs = new POIFSFileSystem(new FileInputStream(xlsPath)); 
			// 得到Excel工作表对象
//			HSSFWorkbook wb = new HSSFWorkbook(fs);
			Workbook wb = WorkbookFactory.create(new FileInputStream(xlsPath));
			// 得到Excel指定工作表
			Sheet sheet = wb.getSheetAt(INDEX_WORKSHEET); 
			int lastRowNum = sheet.getLastRowNum();
			
			totalCount = lastRowNum;

			for (int index = START_LINE; index <= lastRowNum; index++) {

				Row row = sheet.getRow(index);// 得到Excel工作表指定行
				row.removeCell(row.createCell(COL_ERR));

				String username, realname, mail = "", phone = "";
				
				DecimalFormat dformat = new DecimalFormat("0");
				if((row.getCell(COL_USERNAME) == null || row.getCell(COL_USERNAME).getStringCellValue().trim().equals(STR_BLANK)) 
						&& (row.getCell(COL_REALNAME) == null || row.getCell(COL_REALNAME).getStringCellValue().trim().equals(STR_BLANK)) 
						&& (row.getCell(COL_MAIL) == null || row.getCell(COL_MAIL).getStringCellValue().trim().equals(STR_BLANK))
						&& (row.getCell(COL_PHONE) == null || dformat.format(row.getCell(COL_PHONE).getNumericCellValue()).trim().equals(STR_BLANK))) {
					totalCount --;
					// 数据全部为空时跳过本条数据
					continue;
				}
				
				// 用户名提取
				Cell cell = row.getCell(COL_USERNAME);
				if (cell == null || cell.getStringCellValue().trim().equals(STR_BLANK)) {
					setErr(row.createCell(COL_USERNAME));
					row.createCell(COL_ERR).setCellValue("用户名不能为空");
					setErr(row.getCell(COL_ERR));
					totalError ++;
					// 为空时跳过本条数据
					continue;
				}else if(cell.getStringCellValue().trim().length()>MAX_USERNAME_LENGTH || cell.getStringCellValue().trim().length()<MIN_USERNAME_LENGTH){
					setErr(row.getCell(COL_USERNAME));
					row.createCell(COL_ERR).setCellValue("用户名长度为"+MIN_USERNAME_LENGTH+"-"+MAX_USERNAME_LENGTH+"字");
					setErr(row.getCell(COL_ERR));
					totalError ++;
					// 超长时跳过本条数据
					continue;
				}else if(cell.getStringCellValue().trim().replaceAll("^[A-Za-z][A-Za-z0-9]*", "").length() > 0){
					setErr(row.getCell(COL_USERNAME));
					row.createCell(COL_ERR).setCellValue("用户名必须包含英文字母,数字,下划线中的任意两种");
					setErr(row.getCell(COL_ERR));
					totalError ++;
					// 格式错误跳过本条数据
					continue;
				}
				username = cell.getStringCellValue().trim();
				
				// 姓名提取
				cell = row.getCell(COL_REALNAME);
				if (cell == null || cell.getStringCellValue().trim().equals(STR_BLANK)) {
					// 为空时忽略当前字段
				}else if(cell.getStringCellValue().trim().length()>MAX_REALNAME_LENGTH){
					setErr(row.getCell(COL_REALNAME));
					row.createCell(COL_ERR).setCellValue("姓名最长"+MAX_REALNAME_LENGTH+"字");
					setErr(row.getCell(COL_ERR));
					totalError ++;
					// 为空时跳过本条数据
					continue;
				}
				realname = cell.getStringCellValue().trim();
				
				// 邮箱提取
				cell = row.getCell(COL_MAIL);
				if (cell == null || cell.getStringCellValue().trim().equals(STR_BLANK)) {
					// 为空时忽略当前字段
				}else if(cell.getStringCellValue().trim().length()>MAX_MAIL_LENGTH){
					setErr(row.getCell(COL_MAIL));
					row.createCell(COL_ERR).setCellValue("邮箱最多"+MAX_MAIL_LENGTH+"个字符");
					setErr(row.getCell(COL_ERR));
					totalError ++;
					// 超长时跳过本条数据
					continue;
				}else if(cell.getStringCellValue().trim().replaceAll("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$", "").length()>0) {
					setErr(row.getCell(COL_MAIL));
					row.createCell(COL_ERR).setCellValue("邮箱错误");
					setErr(row.getCell(COL_ERR));
					totalError ++;
					// 格式错误跳过本条数据
					continue;
				}else{
					mail = cell.getStringCellValue().trim();
				}
				
				// 手机号提取
				cell = row.getCell(COL_PHONE);
				DecimalFormat df = new DecimalFormat("0");
				if (cell == null || df.format(cell.getNumericCellValue()).trim().equals(STR_BLANK)) {
					// 为空时忽略当前字段
				}else if(df.format(cell.getNumericCellValue()).trim().length()>MAX_PHONE_LENGTH){
					setErr(row.getCell(COL_PHONE));
					row.createCell(COL_ERR).setCellValue("手机号最多"+MAX_PHONE_LENGTH+"位数字");
					setErr(row.getCell(COL_ERR));
					totalError ++;
					// 超长时跳过本条数据
					continue;
				}else if(df.format(cell.getNumericCellValue()).trim().replaceAll("^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$", "").length()>0) {
					setErr(row.getCell(COL_PHONE));
					row.createCell(COL_ERR).setCellValue("手机号格式错误");
					setErr(row.getCell(COL_ERR));
					totalError ++;
					// 超长时跳过本条数据
					continue;
				}else{
					phone = df.format(cell.getNumericCellValue()).trim();
				}
				
				// 封装处理对象
				HashMap<String, Object> userInfo = new HashMap<String, Object>();
				userInfo.put("username", username);
				userInfo.put("realname", realname);
				userInfo.put("mail", mail);
				userInfo.put("phone", phone);
				
				// 判断用户名是否存在
				if(userService.checkUserName(userInfo)) {
					setErr(row.createCell(COL_USERNAME));
					row.createCell(COL_ERR).setCellValue("用户名已经存在");
					setErr(row.getCell(COL_ERR));
					totalError ++;
					// 跳过本条数据
					continue;
				}
				
				try{
					doInstert(userInfo);
					// 添加用户和VDC的关系
					params.put("user_id", Utils.valueOf(userInfo.get("id")));
					relationService.insertRelation(params);
				}catch(DuplicateKeyException e){
					totalError ++;
					setErr(row.getCell(COL_USERNAME));
					row.createCell(COL_ERR).setCellValue("用户名已经存在");
					setErr(row.getCell(COL_ERR));
//					e.getMessage()
				}catch(DataIntegrityViolationException e){
					if(e.getCause() instanceof MysqlDataTruncation){
						row.createCell(COL_ERR).setCellValue("非法数据：长度过长");
					}else if(e.getCause() instanceof MySQLIntegrityConstraintViolationException){
						setErr(row.getCell(COL_USERNAME));
						row.createCell(COL_ERR).setCellValue("非法数据：数据不能为空或为系统关键词");
					}
					setErr(row.getCell(COL_ERR));
					totalError ++;
				}catch(Exception e){
					row.createCell(COL_ERR).setCellValue("未知异常");
					setErr(row.getCell(COL_ERR));
					e.printStackTrace();
					totalError ++;
				}
			}
			
			if(totalError == 0){
				result.setStatus(true);
				transactionManager.commit(status);
				System.out.println("=====事务控制提交通知=====");
			}else{
				result.setStatus(false);
				transactionManager.rollback(status);
				System.out.println("=====事务控制回滚通知=====");
			}
			result.setTotal(totalCount);
			result.setError(totalError);
			
			if(!result.isStatus()){
				// 输出结果
				FileOutputStream fileOut = new FileOutputStream(reportPath);
				wb.write(fileOut);
				wb.close();
				fileOut.flush();
				fileOut.close();
//				fs.close();
			}else{
				wb.close();
//				fs.close();
			}
		} catch (Exception e) {
			transactionManager.rollback(status);
			System.out.println("=====事务控制回滚通知=====");
			result.setStatus(false);
			result.setTotal(0);
			result.setError(0);
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 执行用户信息及附加信息的插入
	 * @param userInfo 新用户信息
	 */
//	@OperationTransaction
	public void doInstert(HashMap<String, Object> userInfo) {
		userInfo.put("password", "123456");
		String defaultPassword = "123456";
		if(passworHelper!=null){
			passworHelper.encryptPassword(userInfo);
		}else{
			userInfo.put("password", defaultPassword);
		}
		
		userService.insertUser(userInfo);
		userService.insertUserInfo(userInfo);
	}
	
	
	public void setErr(Cell cell){
		CellStyle style = cell.getSheet().getWorkbook().createCellStyle();
		style.setFillForegroundColor(HSSFColor.RED.index);
		style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		cell.setCellStyle(style);
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


