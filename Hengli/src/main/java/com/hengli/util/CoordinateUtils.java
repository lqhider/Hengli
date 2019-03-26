package com.hengli.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;

import net.sf.json.JSONObject;

public class CoordinateUtils {

	public static String[] getCoordinate (String addr) throws IOException{
		
		String lng = null;//经度  
        String lat = null;//纬度  
        String address = null;
		
        try {
        	address = URLEncoder.encode(addr, "UTF-8");
        }catch (UnsupportedEncodingException e1) {
			e1.printStackTrace();
		}
        String url = "http://api.map.baidu.com/geocoder/v2/?output=json&ak=6xnpV6UuLrzn9p6eow4HW3l2Ra1sER6E&address="+address;
        
        URL myURL = null;
        URLConnection httpsConn = null;
        try {  
            myURL = new URL(url);   
        } catch (MalformedURLException e) {   
            e.printStackTrace();   
        }
        
        InputStreamReader insr = null;  
        BufferedReader br = null;
        
        try {   
            httpsConn = (URLConnection) myURL.openConnection();  
            if (httpsConn != null) {   
            	insr = new InputStreamReader( httpsConn.getInputStream(), "UTF-8");
            	br = new BufferedReader(insr);
            	String data = null;
            	while((data= br.readLine())!=null){
            		JSONObject json = JSONObject.fromObject(data);
            		lng = json.getJSONObject("result").getJSONObject("location").getString("lng");
            		lat = json.getJSONObject("result").getJSONObject("location").getString("lat");
            	}
            }
        } catch (IOException e) {   
            e.printStackTrace();
        } finally {  
            if(insr!=null){
            	insr.close();
            }
            if(br!=null){  
                br.close();  
            }
        }
        return new String[]{lng,lat};
	}
}
