package com.cnten.bdlocation.oamdevicearchives.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.cnten.platform.dao.Page;
import com.cnten.bdlocation.oamdevicearchives.service.OamDeviceArchivesService;
import com.cnten.platform.web.SuccessOrFailure;
import com.cnten.po.OamDeviceArchives;

@Controller
@RequestMapping(value = "/oamDeviceArchives")
public class OamDeviceArchivesController {

	@InitBinder
	protected void initBinder(HttpServletRequest request, ServletRequestDataBinder binder) throws Exception {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		CustomDateEditor editor = new CustomDateEditor(df, true);
		binder.registerCustomEditor(Date.class, editor);
	}

	@Autowired
	private OamDeviceArchivesService oamDeviceArchivesService;
	
	@RequestMapping(value = "/showOamDeviceArchivess")
	public void showOamDeviceArchivess() {
	}
	
	@RequestMapping(value = "/showOamDeviceArchives")
	public void showOamDeviceArchives(String oamDeviceArchivesId, Model model) {
		OamDeviceArchives oamDeviceArchives = oamDeviceArchivesService.getOamDeviceArchives(oamDeviceArchivesId);
		model.addAttribute("oamDeviceArchives", oamDeviceArchives);
	}
	
	@RequestMapping(value = "/queryOamDeviceArchivess")
	public void queryOamDeviceArchivess(OamDeviceArchives oamDeviceArchives, Integer pageIndex, Integer pageSize, Model model) {
		Page page = oamDeviceArchivesService.getOamDeviceArchivessPage(oamDeviceArchives, pageIndex, pageSize);
		model.addAttribute(page);
	}
	
	@RequestMapping(value = "/selectOamDeviceArchives")
	public void selectOamDeviceArchives() {
	}
	
	@RequestMapping(value = "/selectOamDeviceArchivess")
	public void selectOamDeviceArchivess(OamDeviceArchives oamDeviceArchives, Integer pageIndex, Integer pageSize, Model model) {
		Page page = oamDeviceArchivesService.getOamDeviceArchivessPage(oamDeviceArchives, pageIndex, pageSize);
		model.addAttribute(page);
	}
	
	@ResponseBody
	@RequestMapping(value = "/saveOamDeviceArchives")
	public SuccessOrFailure saveOamDeviceArchives(OamDeviceArchives oamDeviceArchives){
		try {
			oamDeviceArchivesService.saveOamDeviceArchives(oamDeviceArchives);
			return SuccessOrFailure.SUCCESS(oamDeviceArchives.getOamDeviceArchivesId());
		} catch (Exception e) {
			return SuccessOrFailure.FAILURE(e.getMessage());
		}
	}
	
	@ResponseBody
	@RequestMapping(value = "/deleteOamDeviceArchives")
	public SuccessOrFailure deleteOamDeviceArchives(String oamDeviceArchivesIds){
		try {
			oamDeviceArchivesService.deleteOamDeviceArchives(oamDeviceArchivesIds);
			return SuccessOrFailure.SUCCESS;
		} catch (Exception e) {
			return SuccessOrFailure.FAILURE(e.getMessage());
		}
	}
	
	@RequestMapping(value = "/exportOamDeviceArchivess")
	public void exportOamDeviceArchivess(OamDeviceArchives oamDeviceArchives, HttpServletResponse response) {
		try {
			oamDeviceArchivesService.exportOamDeviceArchivess(oamDeviceArchives, response);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
