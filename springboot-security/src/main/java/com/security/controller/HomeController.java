package com.security.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.PreDestroy;

/**
 * Created by Administrator on 2017/5/10 0010.
 */
@Controller
public class HomeController {
    @RequestMapping(value = {"", "/home"}, method= RequestMethod.GET)
    public String home(){
        return "home";
    }


    @RequestMapping(value = "/helloadmin", method=RequestMethod.GET)
    @PreAuthorize("hasAnyRole('admin')")
    public String helloAdmin(){
        return "helloAdmin";
    }

    @RequestMapping(value = "/hellouser", method=RequestMethod.GET)
    @PreAuthorize("hasAnyRole('admin', 'user')")
    public String helloUser(){
        return "helloUser";
    }

    @RequestMapping(value = "/login", method=RequestMethod.GET)
    public String login(){
        return "login";
    }

    @RequestMapping("/403")
    public String forbidden(){
        return "403";
    }
}
